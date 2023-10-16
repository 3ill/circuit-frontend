'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

type ContextProviderProps = {
  children: React.ReactNode;
};

type ContextValueProps = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  activeClicked: boolean;
  setIsActiveClicked: React.Dispatch<React.SetStateAction<boolean>>;
  approvedClicked: boolean;
  setIsApprovedClick: React.Dispatch<React.SetStateAction<boolean>>;
  memberClicked: boolean;
  setIsMemberClicked: React.Dispatch<React.SetStateAction<boolean>>;
  transactionClicked: boolean;
  setIsTransactionClicked: React.Dispatch<React.SetStateAction<boolean>>;
  eventClicked: boolean;
  setIsEventClicked: React.Dispatch<React.SetStateAction<boolean>>;
  balance: string | null;
  setBalance: React.Dispatch<React.SetStateAction<string | null>>;
  memberCount: number;
  setMemberCount: React.Dispatch<React.SetStateAction<number>>;
  adminCount: number;
  setAdminCount: React.Dispatch<React.SetStateAction<number>>;
  councilCount: number;
  setCouncilCount: React.Dispatch<React.SetStateAction<number>>;
  proposalCount: number;
  setProposalCount: React.Dispatch<React.SetStateAction<number>>;
  approvedProposalCount: number;
  setApprovedProposalCount: React.Dispatch<React.SetStateAction<number>>;
  rejectedProposalCount: number;
  setRejectedProposalCount: React.Dispatch<React.SetStateAction<number>>;
};

const ActiveSectionContext = createContext<ContextValueProps | null>(null);

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [active, setActive] = useState('');
  const [activeClicked, setIsActiveClicked] = useState(false);
  const [approvedClicked, setIsApprovedClick] = useState(false);

  const [memberClicked, setIsMemberClicked] = useState(false);
  const [transactionClicked, setIsTransactionClicked] = useState(false);

  const [eventClicked, setIsEventClicked] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

  const [memberCount, setMemberCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  const [councilCount, setCouncilCount] = useState(0);
  const [proposalCount, setProposalCount] = useState(0);

  const [approvedProposalCount, setApprovedProposalCount] = useState(0);
  const [rejectedProposalCount, setRejectedProposalCount] = useState(0);
  return (
    <ActiveSectionContext.Provider
      value={{
        active,
        setActive,
        activeClicked,
        setIsActiveClicked,
        approvedClicked,
        setIsApprovedClick,
        memberClicked,
        setIsMemberClicked,
        transactionClicked,
        setIsTransactionClicked,
        eventClicked,
        setIsEventClicked,
        balance,
        setBalance,
        memberCount,
        setMemberCount,
        adminCount,
        setAdminCount,
        councilCount,
        setCouncilCount,
        proposalCount,
        setProposalCount,
        approvedProposalCount,
        setApprovedProposalCount,
        rejectedProposalCount,
        setRejectedProposalCount,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSectionContext = (): ContextValueProps => {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      'useActiveSectionContext must be used within an ActiveSectionContextProvider'
    );
  }

  return context;
};

export default ContextProvider;
