import { contract_address } from './keys'
import { ethers } from 'ethers'
import { abi } from './abi'

export const isMember = async ({
  memberAddress,
}: {
  memberAddress: string
}) => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    if (contract_address) {
      const circuit = new ethers.Contract(contract_address, abi, signer)
      try {
        const validation = await circuit.addressToHasMember(memberAddress)
        console.log(validation)

        if (validation === true) {
          return 'Already a member'
        }
      } catch (error) {
        console.error(error)
      }
    }
  } else {
    throw new Error(
      'Web3 provider not available. Please connect or install wallet like MetaMask.',
    )
  }
}
