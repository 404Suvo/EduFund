import React, { useState } from 'react';
import { Donor } from '../../data/mockData';
import { formatINR, formatNumberIN } from '../../utils/format';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  CartesianGrid 
} from 'recharts';

interface DonorChartProps {
  donor: Donor;
}

export const DonorChart: React.FC<DonorChartProps> = ({ donor }) => {
  const [activeTab, setActiveTab] = useState<'college' | 'category' | 'monthly'>('college');

  const COLORS = ['#1F2BFF', '#14F5B0', '#FFB300', '#6ECFE0', '#F0552B', '#00A651'];
  const gridStroke = '#E2E8F0';
  const axisTickColor = '#475569';

  return (
    <div className="bg-white rounded-[24px] border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-sans text-[#0B1240]">
            CSR Fund Distribution Analytics
          </h3>
          <p className="text-xs text-slate-500">
            Real-time on-chain verifiable allocation charts for {donor.name}
          </p>
        </div>

        {/* Chart View Toggle */}
        <div className="inline-flex p-1 bg-slate-100 rounded-full border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('college')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'college' ? 'bg-[#1F2BFF] text-white shadow-sm' : 'text-slate-600 hover:text-[#0B1240]'
            }`}
          >
            By College
          </button>
          <button
            onClick={() => setActiveTab('category')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'category' ? 'bg-[#1F2BFF] text-white shadow-sm' : 'text-slate-600 hover:text-[#0B1240]'
            }`}
          >
            By Spend Category
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'monthly' ? 'bg-[#1F2BFF] text-white shadow-sm' : 'text-slate-600 hover:text-[#0B1240]'
            }`}
          >
            Disbursement Trend
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-72 w-full pt-2">
        {activeTab === 'college' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={donor.byCollege} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="college" tick={{ fill: axisTickColor, fontSize: 11 }} />
              <YAxis
                tickFormatter={(v) => `₹${v / 100000}L`}
                tick={{ fill: axisTickColor, fontSize: 11 }}
              />
              <Tooltip
                formatter={(val: any) => [formatINR(Number(val)), 'Funds Allocated']}
                contentStyle={{ backgroundColor: '#0B1240', borderRadius: '12px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <Bar dataKey="amount" fill="#1F2BFF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'category' && (
          <div className="h-full flex flex-col md:flex-row items-center justify-center gap-6">
            <ResponsiveContainer width="100%" height="100%" className="max-w-[260px]">
              <PieChart>
                <Pie
                  data={donor.byCategory}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {donor.byCategory.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [formatINR(Number(val)), 'Total Spent']}
                  contentStyle={{ backgroundColor: '#0B1240', borderRadius: '12px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 text-xs w-full max-w-sm">
              {donor.byCategory.map((entry, index) => (
                <div key={entry.category} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <span className="font-semibold text-slate-700 block">{entry.category}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{formatINR(entry.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'monthly' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={donor.monthlyDisbursements} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14F5B0" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#1F2BFF" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="month" tick={{ fill: axisTickColor, fontSize: 11 }} />
              <YAxis
                tickFormatter={(v) => `₹${v / 100000}L`}
                tick={{ fill: axisTickColor, fontSize: 11 }}
              />
              <Tooltip
                formatter={(val: any) => [formatINR(Number(val)), 'Disbursed']}
                contentStyle={{ backgroundColor: '#0B1240', borderRadius: '12px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#1F2BFF"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorAmt)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
