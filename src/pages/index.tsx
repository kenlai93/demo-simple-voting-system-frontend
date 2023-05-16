import { useQuery, useSubscription } from '@apollo/client'
import CampaignCard from '@app/components/CampaignCard'
import { QueryCampaign } from '@app/constants/graphqlQueries/queryCampaign'
import { SubscribeLiveCampaignData } from '@app/constants/graphqlQueries/subscribeLiveCampaignData'
import {
  GqlCampaign,
  GqlQueryCampaignQuery,
  GqlQueryCampaignQueryVariables,
  GqlSubscribeLiveCampaignDataSubscription,
  GqlSubscribeLiveCampaignDataSubscriptionVariables,
} from '@app/payloads/graphql'
import { NextPageWithLayout } from '@app/types/appProps'
import { useCallback, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import tw from 'twin.macro'
import MainLayout from './mainLayout'
import CampaignFilterCard, { CampaignFilterCardForm } from '@app/components/CampaignFilterCard'
import cleanDeep from 'clean-deep'

// grid grid-cols-2 gap-4
const TFlexContainer = tw.div`
flex
flex-wrap
gap-6
justify-evenly
`

const TContainer = tw.div`
m-3
`

const Home: NextPageWithLayout = () => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | undefined>(undefined)
  const [variables, setVariables] = useState<GqlQueryCampaignQueryVariables>({
    filter: {},
  })

  const { loading, data, error } = useQuery<GqlQueryCampaignQuery, GqlQueryCampaignQueryVariables>(
    QueryCampaign,
    {
      variables,
    }
  )

  const { data: liveData } = useSubscription<
    GqlSubscribeLiveCampaignDataSubscription,
    GqlSubscribeLiveCampaignDataSubscriptionVariables
  >(SubscribeLiveCampaignData)

  const handleSelectedCampaignChange = useCallback(({ id }: GqlCampaign) => {
    setSelectedCampaignId(id)
  }, [])

  const handleFilterChange = useCallback((form: CampaignFilterCardForm) => {
    const { sortBys, choiceName, name } = cleanDeep(form)
    setVariables((val) => ({
      pageInfo: {
        ...val.pageInfo,
        ...(sortBys && { sortBys }),
      },
      filter: { choiceName, name },
    }))
  }, [])

  return (
    <TContainer>
      <TContainer>
        <CampaignFilterCard onSubmit={handleFilterChange} />
      </TContainer>
      <TFlexContainer>
        {loading && <Spinner />}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {data?.queryCampaign.data.map((campaign) => (
          <CampaignCard
            campaign={campaign}
            liveData={liveData?.subscribeLiveCampaignData}
            key={campaign.id}
            selectedCampaignId={selectedCampaignId}
            onSelectedCampaignChange={handleSelectedCampaignChange}
          />
        ))}
      </TFlexContainer>
    </TContainer>
  )
}

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}

export default Home
