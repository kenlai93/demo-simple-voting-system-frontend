import { gql } from '@apollo/client'

export const Vote = gql`
  mutation Vote($input: VoteInput!) {
    vote(input: $input) {
      campaignId
      choiceId
      createdAt
    }
  }
`
