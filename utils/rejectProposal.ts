import { ethers } from 'ethers'
import { abi } from './abi'
const contractAddress = process.env.CONTRACT_ADDRESS || 'defaultcontractaddress'

type Props = {
  id: number
}

export const rejectProposal = async ({ id }: Props) => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const circuit = new ethers.Contract(contractAddress, abi, signer)
    try {
      await circuit.rejectProposal(id)
      return 'Proposal Rejected'
    } catch (error) {
      console.error(error)
      return `An error occurred`
    }
  } else {
    throw new Error(
      'Web3 provider not available. Please connect or install wallet like MetaMask.',
    )
  }
}
