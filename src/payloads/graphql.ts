export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export type GqlCampaign = {
  __typename?: 'Campaign'
  choices: Array<GqlVotingChoice>
  createdAt: Scalars['DateTime']
  desc?: Maybe<Scalars['String']>
  endTime: Scalars['DateTime']
  id: Scalars['ID']
  name: Scalars['String']
  startTime: Scalars['DateTime']
  totalVote: Scalars['Int']
  updatedAt: Scalars['DateTime']
}

export type GqlCreateCampaignChoiceInput = {
  name: Scalars['String']
}

export type GqlCreateCampaignInput = {
  choices: Array<GqlCreateCampaignChoiceInput>
  desc?: InputMaybe<Scalars['String']>
  endTime: Scalars['DateTime']
  name: Scalars['String']
  startTime: Scalars['DateTime']
}

export type GqlLiveCampaignData = {
  __typename?: 'LiveCampaignData'
  choices: Array<GqlVotingChoice>
  id: Scalars['ID']
  totalVote: Scalars['Int']
}

export type GqlMutation = {
  __typename?: 'Mutation'
  createCampaign: GqlCampaign
  vote: GqlVote
}

export type GqlMutationCreateCampaignArgs = {
  newCampaign: GqlCreateCampaignInput
}

export type GqlMutationVoteArgs = {
  input: GqlVoteInput
}

export type GqlPageInfo = {
  __typename?: 'PageInfo'
  page: Scalars['Int']
  pageSize: Scalars['Int']
  sortBys?: Maybe<Array<GqlSortBy>>
  total: Scalars['Int']
}

export type GqlPageInfoInput = {
  page?: InputMaybe<Scalars['Int']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBys?: InputMaybe<Array<GqlSortByInput>>
}

export type GqlQuery = {
  __typename?: 'Query'
  getCampaign: GqlCampaign
  queryCampaign: GqlQueryCampaignResult
}

export type GqlQueryGetCampaignArgs = {
  campaignId: Scalars['String']
}

export type GqlQueryQueryCampaignArgs = {
  filter: GqlQueryCampaignFilter
  pageInfo?: InputMaybe<GqlPageInfoInput>
}

export type GqlQueryCampaignFilter = {
  choiceName?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
}

export type GqlQueryCampaignResult = {
  __typename?: 'QueryCampaignResult'
  data: Array<GqlCampaign>
  pageInfo: GqlPageInfo
}

export type GqlSortBy = {
  __typename?: 'SortBy'
  sortBy: Scalars['String']
  sortOrder: SortOrder
}

export type GqlSortByInput = {
  sortBy: Scalars['String']
  sortOrder?: InputMaybe<SortOrder>
}

export enum SortOrder {
  Asc = 'Asc',
  Desc = 'Desc',
}

export type GqlSubscription = {
  __typename?: 'Subscription'
  subscribeLiveCampaignData: GqlLiveCampaignData
}

export type GqlVote = {
  __typename?: 'Vote'
  campaignId: Scalars['String']
  choiceId: Scalars['String']
  createdAt: Scalars['DateTime']
}

export type GqlVoteInput = {
  campaignId: Scalars['String']
  choiceId: Scalars['String']
  hkid: Scalars['String']
}

export type GqlVotingChoice = {
  __typename?: 'VotingChoice'
  count: Scalars['Int']
  id: Scalars['ID']
  name: Scalars['String']
}

export type GqlCreateCampaignMutationVariables = Exact<{
  newCampaign: GqlCreateCampaignInput
}>

export type GqlCreateCampaignMutation = {
  __typename?: 'Mutation'
  createCampaign: {
    __typename?: 'Campaign'
    id: string
    name: string
    desc?: string | null
    startTime: any
    endTime: any
    totalVote: number
    createdAt: any
    updatedAt: any
    choices: Array<{ __typename?: 'VotingChoice'; id: string; name: string; count: number }>
  }
}

export type GqlQueryCampaignQueryVariables = Exact<{
  filter: GqlQueryCampaignFilter
  pageInfo?: InputMaybe<GqlPageInfoInput>
}>

export type GqlQueryCampaignQuery = {
  __typename?: 'Query'
  queryCampaign: {
    __typename?: 'QueryCampaignResult'
    data: Array<{
      __typename?: 'Campaign'
      id: string
      name: string
      desc?: string | null
      startTime: any
      endTime: any
      totalVote: number
      createdAt: any
      updatedAt: any
      choices: Array<{ __typename?: 'VotingChoice'; id: string; name: string; count: number }>
    }>
    pageInfo: {
      __typename?: 'PageInfo'
      page: number
      pageSize: number
      total: number
      sortBys?: Array<{ __typename?: 'SortBy'; sortBy: string; sortOrder: SortOrder }> | null
    }
  }
}

export type GqlSubscribeLiveCampaignDataSubscriptionVariables = Exact<{ [key: string]: never }>

export type GqlSubscribeLiveCampaignDataSubscription = {
  __typename?: 'Subscription'
  subscribeLiveCampaignData: {
    __typename?: 'LiveCampaignData'
    id: string
    totalVote: number
    choices: Array<{ __typename?: 'VotingChoice'; id: string; name: string; count: number }>
  }
}

export type GqlVoteMutationVariables = Exact<{
  input: GqlVoteInput
}>

export type GqlVoteMutation = {
  __typename?: 'Mutation'
  vote: { __typename?: 'Vote'; campaignId: string; choiceId: string; createdAt: any }
}
