import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

export const getAllProposals = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const circuit = new ethers.Contract(contract_address, abi, signer)

    try {
      const allProposals = await circuit.getAllProposals()
      return allProposals
    } catch (error) {
      console.error(error)
    }
  } else {
    throw new Error(
      'Web3 provider not available. Please connect or install wallet like MetaMask.',
    )
  }
}
