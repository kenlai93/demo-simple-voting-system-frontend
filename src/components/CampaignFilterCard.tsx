import { SortOrder } from '@app/payloads/graphql'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useCallback } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useFieldArray, useForm } from 'react-hook-form'
import tw from 'twin.macro'
import { z } from 'zod'

const schema = z.object({
  // id: z.string().min(1).optional(),
  name: z.string().optional(),
  choiceName: z.string().optional(),
  sortBys: z
    .array(
      z.object({
        sortBy: z.string(),
        sortOrder: z.nativeEnum(SortOrder),
      })
    )
    .optional(),
})

export type CampaignFilterCardForm = z.infer<typeof schema>

export type CampaignFilterCardProps = {
  onSubmit?: (form: CampaignFilterCardForm) => void
}

const TFormDiv = tw.div`
mb-3
`

const TButton = tw(Button)`
ml-3
`

const TFilterFormButtonDiv = tw.div`
flex
justify-end
`

const CampaignSortByFields = ['id', 'name', 'totalVote', 'startTime', 'endTime']

export const DefaultSortBys: CampaignFilterCardForm['sortBys'] = [
  {
    sortBy: 'endTime',
    sortOrder: SortOrder.Desc,
  },
  {
    sortBy: 'totalVote',
    sortOrder: SortOrder.Desc,
  },
]

const CampaignFilterCard: FC<CampaignFilterCardProps> = ({ onSubmit }) => {
  const { register, handleSubmit, control } = useForm<CampaignFilterCardForm>({
    defaultValues: {
      name: '',
      choiceName: '',
      sortBys: [
        {
          sortBy: 'endTime',
          sortOrder: SortOrder.Desc,
        },
        {
          sortBy: 'totalVote',
          sortOrder: SortOrder.Desc,
        },
      ],
    },
    resolver: zodResolver(schema),
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sortBys',
  })

  const handleSuccessSubmit = useCallback(
    (form: CampaignFilterCardForm) => {
      onSubmit?.(form)
    },
    [onSubmit]
  )

  const debug = (form: any) => {
    console.log('form', form)
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit(handleSuccessSubmit, debug)}>
        <Card.Body>
          <TFormDiv>
            <Form.Label>Name</Form.Label>
            <Form.Control {...register('name')} />
          </TFormDiv>

          <TFormDiv>
            <Form.Label>Choice Name</Form.Label>
            <Form.Control {...register('choiceName')} />
          </TFormDiv>

          <TFormDiv>
            {fields.map(({ id, sortBy, sortOrder }, idx) => {
              return (
                <Row key={id}>
                  <Col>
                    <Form.Label>Sort By</Form.Label>
                    <Form.Select {...register(`sortBys.${idx}.sortBy`)}>
                      {CampaignSortByFields.map((sortOrder) => (
                        <option key={sortOrder} value={sortOrder}>
                          {sortOrder}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label>Sort Order</Form.Label>
                    <Form.Select {...register(`sortBys.${idx}.sortOrder`)}>
                      {Object.values(SortOrder).map((sortOrder) => (
                        <option key={sortOrder} value={sortOrder}>
                          {sortOrder}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              )
            })}
          </TFormDiv>
        </Card.Body>
        <Card.Footer>
          <TFilterFormButtonDiv>
            <TButton type="reset">Reset</TButton>
            <TButton type="submit" variant="primary">
              Submit
            </TButton>
          </TFilterFormButtonDiv>
        </Card.Footer>
      </Form>
    </Card>
  )
}

export default CampaignFilterCard
