import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

interface Props {
  id: number
}

export const approveProposal = async ({ id }: Props) => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const circuit = new ethers.Contract(contract_address, abi, signer)
    try {
      await circuit.approveProposal(id)
      return 'Proposal Approved'
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
