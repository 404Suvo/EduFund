import React, { useState } from 'react';
import { MOCK_PROGRAMS, ScholarshipProgram } from '../data/mockData';
import { ProgramCard } from '../components/cards/ProgramCard';
import { PillTabs } from '../components/common/PillTabs';
import { ApplyProgramModal } from '../components/modals/ApplyProgramModal';
import { Search, SlidersHorizontal } from 'lucide-react';

export const Programs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'largest' | 'closing'>('largest');
  const [selectedProgramForApply, setSelectedProgramForApply] = useState<ScholarshipProgram | null>(null);

  const tabs = [
    { id: 'All', label: 'All Programs', count: MOCK_PROGRAMS.length },
    { id: 'Government', label: 'Government', count: MOCK_PROGRAMS.filter(p => p.sponsorType === 'Government').length },
    { id: 'Corporate CSR', label: 'Corporate CSR', count: MOCK_PROGRAMS.filter(p => p.sponsorType === 'Corporate CSR').length },
    { id: 'NGO', label: 'NGO', count: MOCK_PROGRAMS.filter(p => p.sponsorType === 'NGO').length },
    { id: 'Merit', label: 'Merit', count: MOCK_PROGRAMS.filter(p => p.sponsorType === 'Merit').length },
    { id: 'Need-Based', label: 'Need-Based', count: MOCK_PROGRAMS.filter(p => p.sponsorType === 'Need-Based').length },
    { id: 'Women in STEM', label: 'Women in STEM', count: MOCK_PROGRAMS.filter(p => p.sponsorType === 'Women in STEM').length },
  ];

  // Filtering
  const filtered = MOCK_PROGRAMS.filter((p) => {
    const matchesTab = activeTab === 'All' || p.sponsorType === activeTab;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sponsor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'largest') {
      return b.totalPool - a.totalPool;
    }
    if (sortBy === 'closing') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    // newest / default
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="min-h-screen bg-[#F5F7FF] pb-20 transition-colors">
      {/* Mini-Banner in Blue with Mint Headline */}
      <section className="bg-[#1F2BFF] text-white py-14 sm:py-16 border-b-4 border-[#14F5B0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-white/80 bg-white/10 px-3.5 py-1 rounded-full backdrop-blur-sm">
            VERIFIED DIRECT BENEFIT GRANTS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide text-[#14F5B0]">
            THE SCHOLARSHIP ECOSYSTEM
          </h1>
          <p className="text-xs sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
            Discover verified scholarships funded by premier corporate CSR programs, government directorates, and philanthropic trusts. Every rupee is locked to education.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Controls Bar: Pill Tabs + Search & Sort */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-center sm:justify-start">
            <PillTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={(id) => setActiveTab(id)}
            />
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search programs by name, sponsor, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:border-[#1F2BFF] focus:outline-none"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-600">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-[#0B1240] focus:border-[#1F2BFF] bg-slate-50 cursor-pointer"
              >
                <option value="largest">Largest Pool Size</option>
                <option value="closing">Closing Soon</option>
                <option value="newest">Newest Listed</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3-Column Grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((prog) => (
              <ProgramCard
                key={prog.id}
                program={prog}
                onApply={(p) => setSelectedProgramForApply(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[24px] p-12 text-center border border-slate-200 shadow-soft">
            <h3 className="text-lg font-bold text-[#0B1240] mb-1">
              No scholarship programs match your search
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your filter category or searching for broader terms.
            </p>
            <button
              onClick={() => {
                setActiveTab('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#1F2BFF] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <ApplyProgramModal
        program={selectedProgramForApply}
        isOpen={Boolean(selectedProgramForApply)}
        onClose={() => setSelectedProgramForApply(null)}
      />
    </div>
  );
};
