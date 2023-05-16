import { gql } from '@apollo/client'

export const QueryCampaign = gql`
  query QueryCampaign($filter: QueryCampaignFilter!, $pageInfo: PageInfoInput) {
    queryCampaign(filter: $filter, pageInfo: $pageInfo) {
      data {
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
      pageInfo {
        page
        pageSize
        sortBys {
          sortBy
          sortOrder
        }
        total
      }
    }
  }
`
