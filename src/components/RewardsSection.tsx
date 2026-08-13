import React, { useState } from 'react';
import { UserProfile, RewardItem } from '../types';
import { REWARD_ITEMS } from '../data/mockData';

interface RewardsSectionProps {
  user: UserProfile;
  onRedeemReward: (reward: RewardItem) => void;
}

export const RewardsSection: React.FC<RewardsSectionProps> = ({
  user,
  onRedeemReward,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleClaim = (reward: RewardItem) => {
    if (user.pointsBalance < reward.pointsCost) {
      setNotification(`Insufficient points. You need ${reward.pointsCost - user.pointsBalance} more points.`);
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    onRedeemReward(reward);
    setNotification(`Redeemed "${reward.title}"! Voucher code added to your account.`);
    setSelectedReward(null);
    setShowModal(false);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <section className="relative border border-gray-200 flex flex-col md:flex-row bg-[#1A1A1A] text-white my-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 shadow-2xl z-50 flex items-center gap-3 border border-white animate-bounce">
          <span className="material-symbols-outlined text-white">card_giftcard</span>
          <span className="text-xs font-mono font-bold uppercase">{notification}</span>
        </div>
      )}

      {/* Left Banner Info */}
      <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center text-white relative z-10 border-b md:border-b-0 md:border-r border-gray-800">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mb-2">
          03 / LOYALTY ENGINE
        </span>
        <h3 className="font-headline text-3xl md:text-4xl mb-4 font-light uppercase tracking-wider">
          Artisanal Rewards
        </h3>
        <p className="font-sans text-sm text-gray-300 mb-6 leading-relaxed">
          Earn points on every wholesale order. Redeem for exclusive micro-lots, barista training, or wholesale credit.
        </p>

        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-3 bg-black p-3.5 border border-gray-800">
            <span className="material-symbols-outlined text-white">monetization_on</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                1 Point per $1 Spent
              </div>
              <div className="text-xs text-gray-400">Accrue value automatically on all bulk orders.</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-black text-xs font-bold uppercase tracking-widest px-7 py-3.5 hover:bg-gray-200 transition-all cursor-pointer w-max"
        >
          View & Redeem Rewards ({user.pointsBalance} pts)
        </button>
      </div>

      {/* Right Balance Card Simulation */}
      <div className="w-full md:w-1/2 relative min-h-[360px] bg-black p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
            ACCOUNT POINTS PROFILE
          </span>
          <span className="material-symbols-outlined text-white">star</span>
        </div>

        <div className="my-auto bg-[#1A1A1A] p-6 border border-gray-800">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">
            Current Point Balance
          </div>
          <div className="font-headline text-4xl text-white font-light">
            {user.pointsBalance.toLocaleString()} PTS
          </div>
          <div className="w-full bg-gray-800 h-2 mt-4">
            <div
              className="bg-white h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (user.pointsBalance / 2500) * 100)}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-gray-400 mt-2 text-right uppercase">
            50 PTS TO NEXT VIP TIER
          </div>
        </div>

        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex justify-between">
          <span>TIER: VIP COMMERCIAL</span>
          <span>STATUS: ACTIVE</span>
        </div>
      </div>

      {/* Redeem Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 shadow-2xl border border-black space-y-6 text-[#1A1A1A]">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-black">military_tech</span>
                <h3 className="font-headline text-xl font-light uppercase tracking-wider">
                  Redeem Artisanal Points
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-black p-1 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 uppercase font-mono">
              Available Balance: <span className="font-bold text-black">{user.pointsBalance} PTS</span>
            </p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {REWARD_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 p-4 border border-gray-200 flex justify-between items-center gap-4 hover:border-black transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-black text-2xl mt-1">
                      {item.icon}
                    </span>
                    <div>
                      <h5 className="font-bold text-xs uppercase tracking-wider text-black">{item.title}</h5>
                      <p className="text-xs text-gray-500">{item.description}</p>
                      <span className="text-xs font-mono font-bold text-black block mt-1">
                        {item.pointsCost} PTS
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClaim(item)}
                    disabled={user.pointsBalance < item.pointsCost}
                    className={`text-xs uppercase font-bold px-3 py-2 border transition-all cursor-pointer flex-shrink-0 ${
                      user.pointsBalance >= item.pointsCost
                        ? 'bg-black text-white border-black hover:bg-gray-800'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    Redeem
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
