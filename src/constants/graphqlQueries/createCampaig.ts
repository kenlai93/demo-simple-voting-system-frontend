import { gql } from '@apollo/client'

export const CreateCampaign = gql`
  mutation CreateCampaign($newCampaign: CreateCampaignInput!) {
    createCampaign(newCampaign: $newCampaign) {
      id
      name
      desc
      startTime
      endTime
      choices {
        id
        name
        count
      }
      totalVote
      createdAt
      updatedAt
    }
  }
`
