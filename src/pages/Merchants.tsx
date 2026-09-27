import React, { useState } from 'react';
import { MOCK_MERCHANTS, Merchant } from '../data/mockData';
import { MerchantCard } from '../components/cards/MerchantCard';
import { PillTabs } from '../components/common/PillTabs';
import { Button } from '../components/common/Button';
import { MerchantApplyModal } from '../components/modals/MerchantApplyModal';
import { PayMerchantModal } from '../components/modals/PayMerchantModal';
import { Search, MapPin, Store, Plus, ShieldCheck } from 'lucide-react';

export const Merchants: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedMerchantForPay, setSelectedMerchantForPay] = useState<Merchant | null>(null);

  const categories = [
    { id: 'All', label: 'All Merchants', count: MOCK_MERCHANTS.length },
    { id: 'Books & Stationery', label: 'Books & Stationery', count: MOCK_MERCHANTS.filter(m => m.category === 'Books & Stationery').length },
    { id: 'Tuition & Coaching', label: 'Tuition & Coaching', count: MOCK_MERCHANTS.filter(m => m.category === 'Tuition & Coaching').length },
    { id: 'Hostels', label: 'Hostels & Stays', count: MOCK_MERCHANTS.filter(m => m.category === 'Hostels').length },
    { id: 'Fee Portals', label: 'Fee Portals', count: MOCK_MERCHANTS.filter(m => m.category === 'Fee Portals').length },
    { id: 'Tech & Labs', label: 'Tech & Labs', count: MOCK_MERCHANTS.filter(m => m.category === 'Tech & Labs').length },
    { id: 'Online Courses', label: 'Online Courses', count: MOCK_MERCHANTS.filter(m => m.category === 'Online Courses').length },
  ];

  const cities = ['All', 'Pune', 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Kolkata'];

  const filtered = MOCK_MERCHANTS.filter((m) => {
    const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
    const matchesCity = selectedCity === 'All' || m.city === selectedCity;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FF] pb-24 transition-colors">
      {/* Mini-Hero */}
      <section className="bg-[#1F2BFF] text-white py-14 border-b-4 border-[#14F5B0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#14F5B0] bg-white/10 px-3.5 py-1 rounded-full backdrop-blur-sm">
            VERIFIED CAMPUS ECOSYSTEM
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide text-white">
            APPROVED EDUCATION MERCHANTS
          </h1>
          <p className="text-xs sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
            Every bookstore, fee gateway, and lab supplier in this directory is accredited on-chain. Students can redeem purpose-locked scholarship tokens seamlessly at their checkouts.
          </p>
          <div className="pt-2">
            <Button
              variant="mint"
              size="md"
              icon={<Plus className="w-4 h-4 text-[#0B1240]" />}
              onClick={() => setIsApplyModalOpen(true)}
            >
              Apply to Become an Approved Merchant
            </Button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Category Pill Tabs */}
        <div className="flex justify-center sm:justify-start mb-6">
          <PillTabs
            tabs={categories}
            activeTab={activeCategory}
            onChange={(id) => setActiveCategory(id)}
          />
        </div>

        {/* Filter Bar: City Pills + Search */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* City Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500 mr-2 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#1F2BFF]" />
              <span>City:</span>
            </div>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#0B1240] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search store name, city, or items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:border-[#1F2BFF]"
            />
          </div>
        </div>

        {/* Merchants Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((merchant) => (
              <MerchantCard
                key={merchant.id}
                merchant={merchant}
                onPay={(m) => setSelectedMerchantForPay(m)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[24px] p-12 text-center border border-slate-200 shadow-soft">
            <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0B1240] mb-1">
              No approved merchants found in this selection
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Try switching your city filter to "All" or exploring another category.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSelectedCity('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#1F2BFF] hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Merchant Application Modal */}
      <MerchantApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      {/* Pay Modal */}
      <PayMerchantModal
        isOpen={Boolean(selectedMerchantForPay)}
        onClose={() => setSelectedMerchantForPay(null)}
      />
    </div>
  );
};
