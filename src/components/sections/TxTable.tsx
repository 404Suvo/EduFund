import React, { useState, useEffect } from 'react';
import { Transaction } from '../../data/mockData';
import { formatINR, formatDate, truncateHash, copyToClipboard } from '../../utils/format';
import { Badge } from '../common/Badge';
import { TxDrawer } from './TxDrawer';
import { Copy, Check, Eye, Search, X } from 'lucide-react';

interface TxTableProps {
  transactions: Transaction[];
  maxRows?: number;
  showSearch?: boolean;
  initialSearch?: string;
  initialSelectedTxId?: string;
}

export const TxTable: React.FC<TxTableProps> = ({
  transactions,
  maxRows,
  showSearch = false,
  initialSearch = '',
  initialSelectedTxId,
}) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  useEffect(() => {
    if (initialSelectedTxId) {
      const match = transactions.find(
        (t) =>
          t.id.toLowerCase() === initialSelectedTxId.toLowerCase() ||
          t.hash.toLowerCase() === initialSelectedTxId.toLowerCase()
      );
      if (match) {
        setSelectedTx(match);
      }
    }
  }, [initialSelectedTxId, transactions]);

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    copyToClipboard(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filtered = transactions.filter((t) => {
    if (!searchTerm.trim()) return true;
    const rawTerm = searchTerm.trim().toLowerCase();

    // Formatted date string (e.g., "24 Sep 2026, 01:15 am")
    const formattedDate = formatDate(t.timestamp).toLowerCase();
    const compactDate = formattedDate.replace(/[\s,:]/g, '');

    // ID variations (e.g. "tx-01", "tx01", "tx-1", "tx1", "1")
    const idDigits = t.id.replace(/\D/g, '');
    const numericId = idDigits ? parseInt(idDigits, 10).toString() : '';
    const cleanId = t.id.toLowerCase().replace(/[-_]/g, '');

    // Build unified searchable text pool for this transaction
    const pool = [
      t.id,
      `#${t.id}`,
      cleanId,
      numericId ? `tx${numericId}` : '',
      numericId ? `tx-${numericId}` : '',
      idDigits,
      numericId,
      t.hash,
      t.fromName,
      t.fromAddress,
      t.toName,
      t.toAddress,
      t.category,
      t.status,
      t.purpose || '',
      t.blockNumber ? t.blockNumber.toString() : '',
      t.amount ? t.amount.toString() : '',
      t.timestamp,
      formattedDate,
      compactDate,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // 1. Truncated Hash match (e.g., user pasted "0x7f83...ba01")
    if (rawTerm.includes('...')) {
      const [start, end] = rawTerm.split('...');
      if (
        start &&
        end &&
        t.hash.toLowerCase().startsWith(start) &&
        t.hash.toLowerCase().endsWith(end)
      ) {
        return true;
      }
    }

    // 2. Direct match anywhere in the pool
    if (pool.includes(rawTerm)) return true;

    // 3. Punctuation/space stripped match (e.g. "1am" matches "01:00 am" or "1:15 am")
    const cleanTerm = rawTerm.replace(/[\s,:]/g, '');
    if (cleanTerm && pool.replace(/[\s,:]/g, '').includes(cleanTerm)) return true;

    // 4. Multi-token match (all words must be present)
    const tokens = rawTerm.split(/\s+/).filter(Boolean);
    if (tokens.length > 1) {
      return tokens.every((token) => pool.includes(token));
    }

    return false;
  });

  const displayed = maxRows ? filtered.slice(0, maxRows) : filtered;

  return (
    <>
      <div className="space-y-4">
        {showSearch && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by Tx ID (tx-01), Hash (0x...), Student, or Merchant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 rounded-full border border-slate-200 text-sm focus:border-[#1F2BFF] focus:outline-none shadow-sm bg-white"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="text-xs font-semibold text-slate-500 self-center">
              Showing {displayed.length} of {filtered.length} transactions
            </div>
          </div>
        )}

        <div className="bg-white rounded-[24px] border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Tx ID &amp; Hash</th>
                  <th className="py-3.5 px-4 sm:px-6">From (Beneficiary)</th>
                  <th className="py-3.5 px-4 sm:px-6">To (Merchant/Vault)</th>
                  <th className="py-3.5 px-4 sm:px-6">Category</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Amount (₹)</th>
                  <th className="py-3.5 px-4 sm:px-6">Status</th>
                  <th className="py-3.5 px-4 sm:px-6">Timestamp</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Journey</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {displayed.length > 0 ? (
                  displayed.map((tx) => {
                    const isBlocked = tx.status === 'Blocked Non-Education Tx';
                    return (
                      <tr
                        key={tx.id}
                        onClick={() => setSelectedTx(tx)}
                        className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                      >
                        {/* ID & Hash */}
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-medium text-slate-800 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                                #{tx.id.toUpperCase()}
                              </span>
                              <button
                                onClick={(e) => handleCopy(e, tx.id)}
                                className="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                title="Copy Tx ID"
                              >
                                {copiedHash === tx.id ? (
                                  <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[#1F2BFF] text-xs group-hover:underline">
                                {truncateHash(tx.hash, 6, 4)}
                              </span>
                              <button
                                onClick={(e) => handleCopy(e, tx.hash)}
                                className="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                title="Copy full hash"
                              >
                                {copiedHash === tx.hash ? (
                                  <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* From */}
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900 whitespace-nowrap">
                          {tx.fromName}
                        </td>

                        {/* To */}
                        <td className="py-3.5 px-4 sm:px-6 font-medium whitespace-nowrap">
                          <span className={isBlocked ? 'text-red-600 font-semibold' : 'text-slate-800'}>
                            {tx.toName}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">
                            {tx.category}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="py-3.5 px-4 sm:px-6 text-right font-bold whitespace-nowrap">
                          <span className={isBlocked ? 'text-slate-400 line-through' : 'text-[#0B1240]'}>
                            {formatINR(tx.amount)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                          <Badge
                            variant={
                              isBlocked
                                ? 'red'
                                : tx.status === 'Verified On-Chain'
                                ? 'mint'
                                : 'blue'
                            }
                          >
                            {tx.status}
                          </Badge>
                        </td>

                        {/* Timestamp */}
                        <td className="py-3.5 px-4 sm:px-6 text-slate-500 whitespace-nowrap text-xs">
                          {formatDate(tx.timestamp)}
                        </td>

                        {/* Journey Button */}
                        <td className="py-3.5 px-4 sm:px-6 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTx(tx);
                            }}
                            className="p-1.5 rounded-full bg-slate-100 hover:bg-[#1F2BFF] hover:text-white text-slate-600 transition-colors inline-flex items-center justify-center cursor-pointer shadow-sm"
                            title="Inspect money journey"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500 space-y-2">
                      <div className="font-semibold text-slate-700">
                        No matching transactions found for &ldquo;{searchTerm}&rdquo;
                      </div>
                      <div className="text-xs text-slate-400 max-w-sm mx-auto">
                        Try searching by Transaction ID (e.g. <strong>tx-01</strong>), Hash (e.g. <strong>0x7f83...</strong>), Student ID (<strong>STU-</strong>), or Merchant.
                      </div>
                      {searchTerm && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setSearchTerm('')}
                            className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                          >
                            Clear Search Filter
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TxDrawer
        tx={selectedTx}
        isOpen={Boolean(selectedTx)}
        onClose={() => setSelectedTx(null)}
      />
    </>
  );
};
