'use client';
import { cn } from '@/lib/utils';
import { useActiveSectionContext } from '@/context/active-section-context';
import { useInContractAPI } from '@/lib/hooks';
import Image from 'next/image';
import { activeProposals, secondaryNav } from '@/constants';
import { proposals } from '@/constants';
import { member } from '@/constants';
import { approvedProposals } from '@/constants';
import { contractEvents } from '@/constants';
import ProposalCard from '@/components/ProposalCard';
import NotificationCard from '@/components/NotificationCard';
import MemberCard from '@/components/MemberCard';
import ApprovedCard from '@/components/ApprovedCard';
import ActiveCard from '@/components/ActiveCard';
import EventsCard from '@/components/EventsCard';

const Page = () => {
  const {
    balance,
    active,
    eventClicked,
    transactionClicked,
    activeClicked,
    approvedClicked,
    memberClicked,
    councilCount,
    adminCount,
    memberCount,
    proposalCount,
    setActive,
    setIsActiveClicked,
    setIsApprovedClick,
    setIsMemberClicked,
    setIsTransactionClicked,
    setIsEventClicked,
    approvedProposalCount,
    rejectedProposalCount,
  } = useActiveSectionContext();

  const handleFilter = (link: string) => {
    setActive(link);
    console.log(link);

    if (link === 'Active') {
      setIsActiveClicked((prevIsActiveClicked) => !prevIsActiveClicked);
      setIsApprovedClick(false);
      setIsMemberClicked(false);
      setIsTransactionClicked(false);
    } else if (link === 'Approved') {
      setIsApprovedClick((prevIsApprovedClicked) => !prevIsApprovedClicked);
      setIsActiveClicked(false);
      setIsMemberClicked(false);
      setIsTransactionClicked(false);
    } else if (link === 'Members') {
      setIsMemberClicked((prevIsMemberClicked) => !prevIsMemberClicked);
      setIsActiveClicked(false);
      setIsApprovedClick(false);
      setIsTransactionClicked(false);
    } else if (link === 'Transactions') {
      setIsTransactionClicked(
        (prevIsTransactionClicked) => !prevIsTransactionClicked
      );
      setIsActiveClicked(false);
      setIsApprovedClick(false);
      setIsMemberClicked(false);
    }
  };

  const HandleEventClicked = () => {
    setIsEventClicked((prevIsEventClicked) => !prevIsEventClicked);
  };

  useInContractAPI();

  return (
    <main className="flex-center paddings mx-auto w-full flex-col max-w-screen-2xl">
      <section className="nav-padding">
        <div className="flex absolute right-6 top-[110px] justify-end items-center">
          <div className="flex flex-col gap-1 items-center group hover:scale-110 transition">
            <h3 className="font-lexend group-hover:translate-y-1 font-normal text-white text-[15px]">
              Dao Balance
            </h3>
            <div className="flex flex-row gap-3 items-center p-2 bg-black-200 no-focus rounded-[12px]">
              <Image src="/Wallet.png" alt="wallet" width={30} height={30} />
              <p className="font-Azeret text-white text-[15px] font-semibold">
                {balance}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row  flex-center gap-3 mt-5 max-xs:mt-[55px]">
          {secondaryNav.map((nav: any) => (
            <div
              key={nav.name}
              onClick={() => {
                handleFilter(nav.name);
              }}
              className={cn(
                active === nav.name
                  ? 'frame bg-grey-200 shadow-sm'
                  : 'bg-grey-100',
                'rounded-[15px] items-center p-2 flex flex-row lg:w-[150px] gap-1 group hover:scale-110 outline-none  active:scale-105 transition'
              )}
            >
              <Image
                src={nav.icon}
                alt="icon"
                width={30}
                height={30}
                quality={95}
              />
              <p
                className={cn(
                  active === nav.name
                    ? 'text-gradient_purple-blue'
                    : 'text-black-300 ',
                  'font-Azeret font-semibold text-[11px] max-xs:hidden group-hover:translate-x-1 transition'
                )}
              >
                {nav.name}
              </p>
            </div>
          ))}

          <button
            className={cn(
              eventClicked ? 'frame bg-grey-200 shadow-sm' : ' bg-grey-100 ',
              'rounded-[15px] items-center p-2 flex flex-row gap-1 lg:hidden md:hidden'
            )}
            onClick={HandleEventClicked}
          >
            <Image
              src="/multiple-choice.png"
              alt="event"
              width={30}
              height={30}
            />
          </button>
        </div>

        {transactionClicked && (
          <div className="flex-center flex-col mt-5">
            {contractEvents.map((events: any) => (
              <div key={events.title}>
                <EventsCard
                  title={events.title}
                  address={events.address}
                  description={events.description}
                />
              </div>
            ))}
          </div>
        )}

        {activeClicked && (
          <div className="flex-center flex-col mt-5">
            {activeProposals.map((proposal: any) => (
              <div key={proposal.id}>
                <ActiveCard
                  id={proposal.id}
                  title={proposal.title}
                  proposer={proposal.proposer}
                  description={proposal.description}
                  userTier={proposal.userTier}
                  amount={proposal.amount}
                  voteCount={proposal.voteCount}
                  time={proposal.time}
                />
              </div>
            ))}
          </div>
        )}

        {approvedClicked && (
          <div className="flex-center flex-col mt-5">
            {approvedProposals.map((proposal: any) => (
              <div key={proposal.id}>
                <ApprovedCard
                  id={proposal.id}
                  title={proposal.title}
                  proposer={proposal.proposer}
                  description={proposal.description}
                  userTier={proposal.userTier}
                  amount={proposal.amount}
                  voteCount={proposal.voteCount}
                  time={proposal.time}
                />
              </div>
            ))}
          </div>
        )}

        {memberClicked && (
          <div className="flex-center flex-col mt-5">
            {member.map((user: any) => (
              <div key={user.id}>
                <MemberCard
                  id={user.id}
                  username={user.username}
                  profilePicture={user.profilePicture}
                  memberAddress={user.address}
                  balance={user.balance}
                  userTier={user.tier}
                  proposals={user.proposals}
                  votes={user.votes}
                  isAdmin={user.isAdmin}
                  isCouncilMember={user.isCouncilMember}
                />
              </div>
            ))}
          </div>
        )}

        {eventClicked && (
          <div className=" flex-center flex-col mt-5  ">
            <NotificationCard
              memberCount={councilCount}
              adminCount={adminCount}
              totalCount={memberCount}
              totalProposal={proposalCount}
              approvedProposal={approvedProposalCount}
              rejectedProposal={rejectedProposalCount}
            />
          </div>
        )}

        <div className={cn('flex flex-row max-xs:flex-col mt-5')}>
          {!activeClicked &&
            !approvedClicked &&
            !eventClicked &&
            !memberClicked &&
            !transactionClicked && (
              <div className="no-scrollbar">
                {proposals.map((proposal: any) => (
                  <div key={proposal.id}>
                    <ProposalCard
                      id={proposal.id}
                      title={proposal.title}
                      proposer={proposal.proposer}
                      description={proposal.description}
                      userTier={proposal.userTier}
                      amount={proposal.amount}
                      voteCount={proposal.voteCount}
                      time={proposal.time}
                      state={proposal.state}
                    />
                  </div>
                ))}
              </div>
            )}
          {!activeClicked &&
            !approvedClicked &&
            !eventClicked &&
            !memberClicked &&
            !transactionClicked && (
              <div className="absolute flex flex-col right-6 max-xs:hidden">
                <NotificationCard
                  memberCount={councilCount}
                  adminCount={adminCount}
                  totalCount={memberCount}
                  totalProposal={proposalCount}
                  approvedProposal={approvedProposalCount}
                  rejectedProposal={rejectedProposalCount}
                />
              </div>
            )}
        </div>
      </section>
    </main>
  );
};

export default Page;
