export type ProposalProps = {
  id: number
  proposer: string
  title: string
  description: string
  voteCount: number
  voters: []
  proposalState: number
  decision: number
  time: number
}
