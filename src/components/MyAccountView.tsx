import React, { useState } from 'react';
import { UserProfile } from '../types';

interface MyAccountViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onNavigateHome?: () => void;
  onNavigateTab?: (tabName: string) => void;
  isMobileFrame?: boolean;
}

export const MyAccountView: React.FC<MyAccountViewProps> = ({
  user,
  onUpdateUser,
  onNavigateHome,
  onNavigateTab,
  isMobileFrame = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({ ...user });
  const [activeBottomNav, setActiveBottomNav] = useState('more');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggle = (key: 'joinLoyalty' | 'receiveEmailNews' | 'receiveSmsNews') => {
    const updated = { ...formData, [key]: !formData[key] };
    setFormData(updated);
    if (!isEditing) {
      onUpdateUser(updated);
      showToast('Preference updated!');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSave = () => {
    onUpdateUser(formData);
    setIsEditing(false);
    showToast('Account details saved!');
  };

  return (
    <div className={`mx-auto bg-white text-[#1A1A1A] flex flex-col min-h-[750px] ${
      isMobileFrame ? 'w-full h-full' : 'max-w-[430px] shadow-2xl border-2 border-black overflow-hidden my-6'
    }`}>
      {/* Toast popup */}
      {toastMessage && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-mono px-4 py-2 border border-white z-50 transition-all animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="px-5 pt-8 pb-3 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-10">
        <button
          onClick={() => {
            if (onNavigateHome) onNavigateHome();
          }}
          className="text-black text-xs font-mono font-bold uppercase flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          <span>‹</span> MORE
        </button>
        <h1 className="text-sm font-headline uppercase tracking-wider font-bold text-black">
          My Account
        </h1>
        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          className="text-black text-xs font-mono font-bold uppercase hover:opacity-70 transition-opacity"
        >
          {isEditing ? 'SAVE' : 'EDIT'}
        </button>
      </div>

      {/* Account Fields Form Body */}
      <div className="flex-1 px-6 pt-4 pb-24 overflow-y-auto space-y-5 text-xs font-mono">
        {/* First Name */}
        <div className="border-b border-gray-200 pb-2">
          <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">
            First Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full text-sm text-black font-mono focus:outline-none border-b border-black pb-1"
            />
          ) : (
            <div className="text-sm text-black font-bold">
              {formData.firstName || "Lil'"}
            </div>
          )}
        </div>

        {/* Last Name */}
        <div className="border-b border-gray-200 pb-2">
          <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">
            Last Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full text-sm text-black font-mono focus:outline-none border-b border-black pb-1"
            />
          ) : (
            <div className="text-sm text-black font-bold">
              {formData.lastName || 'M'}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="border-b border-gray-200 pb-2">
          <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full text-sm text-black font-mono focus:outline-none border-b border-black pb-1"
            />
          ) : (
            <div className="text-sm text-gray-700">
              {formData.email || 'lilM@myemail.com'}
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div className="border-b border-gray-200 pb-2">
          <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full text-sm text-black font-mono focus:outline-none border-b border-black pb-1"
            />
          ) : (
            <div className="text-sm text-gray-700 tracking-wider">
              {formData.phone || '456 123'}
            </div>
          )}
        </div>

        {/* OPTIONAL Header */}
        <div className="pt-2 pb-1">
          <span className="text-[10px] tracking-widest text-gray-400 uppercase font-bold">
            OPTIONAL PREFERENCES
          </span>
        </div>

        {/* Gender (optional) */}
        <div className="border-b border-gray-200 pb-2">
          <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">
            Gender
          </label>
          {isEditing ? (
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full text-xs text-black focus:outline-none bg-transparent py-1 font-mono"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <div className="text-xs text-gray-500 min-h-[20px]">
              {formData.gender || '-'}
            </div>
          )}
        </div>

        {/* Date of Birth (optional) */}
        <div className="border-b border-gray-200 pb-2">
          <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">
            Date of Birth
          </label>
          {isEditing ? (
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full text-xs text-black focus:outline-none bg-transparent py-1 font-mono"
            />
          ) : (
            <div className="text-xs text-gray-500 min-h-[20px]">
              {formData.dateOfBirth || '-'}
            </div>
          )}
        </div>

        {/* Toggles section */}
        <div className="space-y-5 pt-3">
          {/* Loyalty Toggle */}
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] text-gray-600 leading-relaxed font-sans flex-1">
              Join the loyalty programme to earn points based on purchases made at Artisanal Roast Co.
            </p>
            <button
              type="button"
              onClick={() => handleToggle('joinLoyalty')}
              className={`w-12 h-6 border border-black transition-colors relative flex-shrink-0 p-0.5 cursor-pointer ${
                formData.joinLoyalty ? 'bg-black' : 'bg-gray-100'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white border border-black transform transition-transform ${
                  formData.joinLoyalty ? 'translate-x-6 bg-white' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Email News Toggle */}
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] text-gray-600 leading-relaxed font-sans flex-1">
              Receive news, updates and promotions from Artisanal Roast Co. via email.
            </p>
            <button
              type="button"
              onClick={() => handleToggle('receiveEmailNews')}
              className={`w-12 h-6 border border-black transition-colors relative flex-shrink-0 p-0.5 cursor-pointer ${
                formData.receiveEmailNews ? 'bg-black' : 'bg-gray-100'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white border border-black transform transition-transform ${
                  formData.receiveEmailNews ? 'translate-x-6 bg-white' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* SMS News Toggle */}
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] text-gray-600 leading-relaxed font-sans flex-1">
              Receive news, updates and promotions from Artisanal Roast Co. via SMS.
            </p>
            <button
              type="button"
              onClick={() => handleToggle('receiveSmsNews')}
              className={`w-12 h-6 border border-black transition-colors relative flex-shrink-0 p-0.5 cursor-pointer ${
                formData.receiveSmsNews ? 'bg-black' : 'bg-gray-100'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white border border-black transform transition-transform ${
                  formData.receiveSmsNews ? 'translate-x-6 bg-white' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="border-t border-gray-200 bg-white py-2 px-3 flex justify-around items-center sticky bottom-0 z-10">
        <button
          onClick={() => {
            setActiveBottomNav('home');
            if (onNavigateHome) onNavigateHome();
          }}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeBottomNav === 'home' ? 'text-black' : 'text-gray-400'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span className="text-[9px] font-mono uppercase font-bold">Home</span>
        </button>

        <button
          onClick={() => {
            setActiveBottomNav('delivery');
            if (onNavigateTab) onNavigateTab('catalog');
          }}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeBottomNav === 'delivery' ? 'text-black' : 'text-gray-400'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">local_shipping</span>
          <span className="text-[9px] font-mono uppercase font-bold">Delivery</span>
        </button>

        <button
          onClick={() => {
            setActiveBottomNav('deals');
            if (onNavigateTab) onNavigateTab('deals');
          }}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeBottomNav === 'deals' ? 'text-black' : 'text-gray-400'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">sell</span>
          <span className="text-[9px] font-mono uppercase font-bold">Deals</span>
        </button>

        <button
          onClick={() => {
            setActiveBottomNav('order');
            if (onNavigateTab) onNavigateTab('catalog');
          }}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeBottomNav === 'order' ? 'text-black' : 'text-gray-400'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">coffee</span>
          <span className="text-[9px] font-mono uppercase font-bold">Order</span>
        </button>

        <button
          onClick={() => {
            setActiveBottomNav('more');
          }}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeBottomNav === 'more' ? 'text-black' : 'text-gray-400'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">more_horiz</span>
          <span className="text-[9px] font-mono uppercase font-bold">More</span>
        </button>
      </div>
    </div>
  );
};
