import { gql } from '@apollo/client'

export const SubscribeLiveCampaignData = gql`
  subscription SubscribeLiveCampaignData {
    subscribeLiveCampaignData {
      id
      choices {
        id
        name
        count
      }
      totalVote
    }
  }
`
