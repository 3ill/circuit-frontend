import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

type proposalProps = {
  title: string
  description: string
}

export const createProposal = async ({ title, description }: proposalProps) => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const circuit = new ethers.Contract(contract_address, abi, signer)

    try {
      const tx = await circuit.createProposal(title, description)
      await tx.wait()
      return 'Proposal Successfully Created'
    } catch (error) {
      console.log(error)
      return 'Proposal Failed'
    }
  } else {
    throw new Error(
      'Web3 provider not available. Please connect or install wallet like MetaMask.',
    )
  }
}
