import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

type Props = {
  memberAddress: string
}

export const checkIsAdmin = async ({ memberAddress }: Props) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      const circuit = new ethers.Contract(contract_address, abi, signer)
      const isAdmin = await circuit.checkIsAdmin(memberAddress)
      if (isAdmin === true) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
      return 'An error occurred'
    }
  } else {
    throw new Error(
      'Web3 provider not available. Please connect or install wallet like MetaMask.',
    )
  }
}
