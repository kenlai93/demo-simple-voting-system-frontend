import { useMutation } from '@apollo/client'
import { Vote } from '@app/constants/graphqlQueries/vote'
import {
  GqlCampaign,
  GqlLiveCampaignData,
  GqlVoteMutation,
  GqlVoteMutationVariables,
  GqlVotingChoice,
} from '@app/payloads/graphql'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-hk'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import tw from 'twin.macro'
import { z } from 'zod'
const validid = require('validid').default

const schema = z.object({
  choiceId: z.string(),
  hkid: z.string().refine((val) => validid.hkid(val), {
    message: 'Invalid HKID number.',
  }),
})

export type CampaignCardForm = z.infer<typeof schema>

export type CampaignCardProps = {
  campaign: GqlCampaign
  liveData?: GqlLiveCampaignData
  selectedCampaignId?: string
  onSelectedCampaignChange?: (campaign: GqlCampaign) => void
}

const TChoiceBox = tw.div`
p-3
`

const TChoiceRadio = tw(Form.Check)`
mb-2
`

const TCampaignDescDiv = tw(Row)`
mb-6
`

const TCampaignInfoDiv = tw(Row)`
mb-3
`

const TCard = tw(Card)`
w-96
`

const getChoiceCount = (choice: GqlVotingChoice, liveData?: GqlLiveCampaignData) => {
  const liveDataChoice = liveData?.choices.find(({ id }) => id === choice.id)
  return liveDataChoice ? liveDataChoice.count : choice.count
}

const CampaignCard: FC<CampaignCardProps> = ({
  campaign,
  selectedCampaignId,
  onSelectedCampaignChange,
  liveData,
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    reset: resetForm,
    formState: { errors },
  } = useForm<CampaignCardForm>({
    defaultValues: {
      choiceId: '',
      hkid: '',
    },
    resolver: zodResolver(schema),
  })

  const now = dayjs()
  const disabled = dayjs(now).isBefore(campaign.startTime) || dayjs(now).isAfter(campaign.endTime)

  const [vote, { data, error, loading, reset: resetMutation }] = useMutation<
    GqlVoteMutation,
    GqlVoteMutationVariables
  >(Vote)

  const alreadyVoted = useMemo(
    () => error?.graphQLErrors[0].extensions.code === 'ConflictException',
    [error]
  )

  const handleSubmitSuccess: SubmitHandler<CampaignCardForm> = useCallback(
    ({ choiceId, hkid }) => {
      vote({
        variables: {
          input: {
            campaignId: campaign.id,
            choiceId,
            hkid,
          },
        },
      }).catch(() => {
        /** swallow error */
      })
    },
    [campaign.id, vote]
  )

  useEffect(() => {
    if (selectedCampaignId !== campaign.id) {
      resetForm()
      resetMutation()
    }
  }, [campaign.id, selectedCampaignId, resetForm, resetMutation])

  const handleChoiceChange = useCallback(() => {
    if (selectedCampaignId !== campaign.id) {
      onSelectedCampaignChange?.(campaign)
    }
  }, [campaign, selectedCampaignId, onSelectedCampaignChange])

  return (
    <TCard>
      <Card.Header>
        <Card.Title>{campaign.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <TCampaignDescDiv>
          <Row>
            <Col>{campaign.desc}</Col>
          </Row>
        </TCampaignDescDiv>
        <TCampaignInfoDiv>
          <Col xs={'4'}>Total Vote:</Col>
          <Col>{liveData?.id === campaign.id ? liveData.totalVote : campaign.totalVote}</Col>
        </TCampaignInfoDiv>
        <TCampaignInfoDiv>
          <Col xs={'4'}>Start Time</Col>
          <Col>{dayjs(campaign.startTime).locale('zh-hk').format('LLL')}</Col>
        </TCampaignInfoDiv>
        <TCampaignInfoDiv>
          <Col xs={'4'}>End Time</Col>
          <Col>{dayjs(campaign.endTime).locale('zh-hk').format('LLL')}</Col>
        </TCampaignInfoDiv>
        <Form>
          <TChoiceBox>
            <Form.Label>Choices</Form.Label>
            <TChoiceBox>
              {campaign.choices.map((choice) => (
                <TChoiceRadio
                  disabled={disabled}
                  label={
                    <Row>
                      <Col xs={'8'}>{choice.name}</Col>
                      <Col>
                        (Votes: {getChoiceCount(choice, liveData)}
                        {data?.vote.choiceId === choice.id ? ', You Voted' : ''})
                      </Col>
                    </Row>
                  }
                  type={'radio'}
                  key={choice.id}
                  value={choice.id}
                  {...register('choiceId', {
                    onChange: handleChoiceChange,
                  })}
                />
              ))}
            </TChoiceBox>

            {selectedCampaignId === campaign.id && (
              <>
                <Form.Label>Please enter your HKID for voting.</Form.Label>
                <Form.Control
                  disabled={loading}
                  {...register('hkid', {
                    onChange: () => resetMutation(),
                  })}
                />
                <Form.Text>e.g. A123456(7)</Form.Text>
                {errors.hkid && <Alert variant="danger">{errors.hkid.message}</Alert>}
                {alreadyVoted && (
                  <Alert variant="danger">You have already voted in this campaign.</Alert>
                )}
                {data && <Alert variant="success">Successfully voted this campaign</Alert>}
              </>
            )}
          </TChoiceBox>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Button
          type="submit"
          variant="primary"
          disabled={disabled || !getValues('choiceId')}
          onClick={handleSubmit(handleSubmitSuccess)}
        >
          {loading && <Spinner className="mx-1" size="sm" />}
          Submit
        </Button>
      </Card.Footer>
    </TCard>
  )
}

export default CampaignCard
