import { useEffect } from 'react'
import { useActiveSectionContext } from '@/context/active-section-context'
import { contract_address } from '@/utils/keys'
import { getBalance } from '@/utils/getBalance'
import { getMemberCount } from '@/utils/memberCount'
import { getAdminCount } from '@/utils/adminMemberCounter'
import { getCouncilCount } from '@/utils/councilMemberCounter'
import { getProposalCount } from '@/utils/proposalsCounter'
import { getApprovedProposalCount } from '@/utils/approvedProposalCount'
import { getRejectedProposalCount } from '@/utils/rejectedProposalCount'
import { getAllProposals } from '@/utils'

export const useInContractAPI = () => {
  const {
    setBalance,
    setMemberCount,
    setAdminCount,
    setCouncilCount,
    setProposalCount,
    setApprovedProposalCount,
    setRejectedProposalCount,
  } = useActiveSectionContext()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (contract_address) {
          const contractBalance = await getBalance(contract_address)
          console.log(contractBalance)
          setBalance(contractBalance ?? null)
        }
      } catch (error) {
        console.error(error)
      }
    }

    const fetchCount = async () => {
      try {
        const count = await getMemberCount()
        if (count) {
          console.log(count)
          setMemberCount((count as number) ?? null)
        }
      } catch (error) {
        console.error(error)
      }
    }

    const fetchAdminCount = async () => {
      try {
        const admin = await getAdminCount()
        if (admin) {
          setAdminCount(admin as number)
        }
      } catch (error) {
        console.error(error)
      }
    }

    const fetchCouncilCount = async () => {
      try {
        const count = await getCouncilCount()
        if (count) {
          setCouncilCount(count as number)
        }
      } catch (error) {
        console.error(error)
      }
    }

    const fetchProposalCount = async () => {
      try {
        const count = await getProposalCount()
        if (count) {
          setProposalCount(count as number)
        }
      } catch (error) {
        console.error(error)
      }
    }

    const fetchApprovedProposalCount = async () => {
      try {
        const count = await getApprovedProposalCount()
        if (count) {
          setApprovedProposalCount(count as number)
        }
      } catch (error) {
        console.error(error)
      }
    }

    const fetchRejectedProposalCount = async () => {
      try {
        const count = await getRejectedProposalCount()
        if (count) {
          setRejectedProposalCount(count as number)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchBalance()
    fetchCount()
    fetchAdminCount()
    fetchCouncilCount()
    fetchProposalCount()
    fetchApprovedProposalCount()
    fetchRejectedProposalCount()
  }, [
    setBalance,
    setAdminCount,
    setMemberCount,
    setCouncilCount,
    setProposalCount,
    setApprovedProposalCount,
    setRejectedProposalCount,
  ])
}
