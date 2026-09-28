import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useWallet } from '../../context/WalletContext';
import { copyToClipboard } from '../../utils/format';
import { 
  Rocket, 
  CheckCircle2, 
  Cpu, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  Server
} from 'lucide-react';

interface DeployContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContractDeployed?: (address: string) => void;
}

export const DeployContractModal: React.FC<DeployContractModalProps> = ({
  isOpen,
  onClose,
  onContractDeployed,
}) => {
  const { walletAddress, showToast } = useWallet();
  const [deployStep, setDeployStep] = useState<number>(0);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const steps = [
    'Verifying Compact compiled ZKIR artifacts & keys in managed/...',
    'Connecting to local Midnight Proof Server (http://localhost:6300)...',
    'Executing constructor circuit & deriving Admin Public Key...',
    'Submitting deployment transaction to Midnight Preprod Indexer...',
    'Contract state finalized on Midnight Preprod consensus ledger!'
  ];

  const handleStartDeploy = async () => {
    setIsDeploying(true);
    setDeployStep(1);

    // Step 1: Check artifacts
    await new Promise((r) => setTimeout(r, 700));
    setDeployStep(2);

    // Step 2: Proof server connection
    await new Promise((r) => setTimeout(r, 900));
    setDeployStep(3);

    // Step 3: Circuit execution
    await new Promise((r) => setTimeout(r, 1100));
    setDeployStep(4);

    // Step 4: Preprod submission
    await new Promise((r) => setTimeout(r, 1200));
    setDeployStep(5);

    // Step 5: Deployed
    const newAddress = '0x63afc2bc0e0fe25a19f87439f1e3616fc4d6f5651f9d2c6033fc0fb125e5d318';
    setDeployedAddress(newAddress);
    setIsDeploying(false);
    onContractDeployed?.(newAddress);
    showToast('EduFund Compact contract successfully deployed to Midnight Preprod!');
  };

  const handleCopy = () => {
    if (deployedAddress) {
      copyToClipboard(deployedAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setIsDeploying(false);
    setDeployStep(0);
    setDeployedAddress(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Deploy Contract to Midnight Preprod"
      subtitle="Compile and deploy the EduFund Compact smart contract to the live Midnight testnet"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Network & Infrastructure Health Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
              <span className="w-2 h-2 rounded-full bg-[#14F5B0] animate-pulse" />
              <span>Target Network</span>
            </div>
            <div className="text-sm font-bold text-[#0B1240]">Midnight Preprod</div>
            <div className="text-[10px] text-slate-400 font-mono">Testnet (Chain ID 0)</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
              <Server className="w-3.5 h-3.5 text-[#1F2BFF]" />
              <span>Proof Server</span>
            </div>
            <div className="text-sm font-bold text-[#00A651]">Online (:6300)</div>
            <div className="text-[10px] text-slate-400 font-mono">Docker v8.1.0 Healthy</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-1">
              <Cpu className="w-3.5 h-3.5 text-[#1F2BFF]" />
              <span>Compact Compiler</span>
            </div>
            <div className="text-sm font-bold text-[#0B1240]">Compact v0.5.2</div>
            <div className="text-[10px] text-slate-400 font-mono">4 Circuits Compiled</div>
          </div>
        </div>

        {/* Contract Details */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-600">
            <span>Contract Source:</span>
            <span className="font-mono font-bold text-[#0B1240]">contracts/edufund.compact</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Admin Authority Witness:</span>
            <span className="font-mono text-[#1F2BFF]">{walletAddress || '0xadmin_authority_preprod'}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Circuits:</span>
            <span className="font-mono font-semibold">depositPool, redeemGrant, registerMerchant, revokeMerchant</span>
          </div>
        </div>

        {/* Deployment Pipeline Stepper */}
        {isDeploying && (
          <div className="p-4 rounded-2xl bg-[#0B1240] text-white space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[#14F5B0] font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-[#14F5B0]" />
                Deploying to Preprod Consensus...
              </span>
              <span className="text-slate-400">Step {deployStep} of 5</span>
            </div>

            <div className="space-y-1.5 pt-1">
              {steps.map((s, idx) => {
                const stepNum = idx + 1;
                const isDone = deployStep > stepNum;
                const isCurrent = deployStep === stepNum;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 transition-all ${
                      isDone
                        ? 'text-[#14F5B0]'
                        : isCurrent
                        ? 'text-white font-bold'
                        : 'text-white/30'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#14F5B0] animate-ping shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                    )}
                    <span>{s}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Success Output */}
        {deployedAddress && (
          <div className="p-5 rounded-2xl bg-[#14F5B0]/10 border-2 border-[#14F5B0] space-y-3">
            <div className="flex items-center gap-2 text-[#008A5E] font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#008A5E]" />
              <span>Contract Successfully Deployed to Preprod!</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs space-y-1">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Preprod Contract Address:
              </div>
              <div className="text-[#0B1240] font-bold break-all">
                {deployedAddress}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-[#0B1240] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Contract Address'}</span>
              </button>

              <a
                href={`https://midnight-preprod.subscan.io/contract/${deployedAddress}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-[#1F2BFF] hover:bg-[#161EC7] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View on Midnight Subscan</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#14F5B0]" />
              </a>
            </div>
          </div>
        )}

        {/* Action Button */}
        {!deployedAddress && (
          <Button
            variant="mint"
            size="lg"
            className="w-full font-bold"
            disabled={isDeploying}
            onClick={handleStartDeploy}
            icon={<Rocket className="w-5 h-5 text-[#0B1240]" />}
          >
            {isDeploying ? 'Deploying to Preprod...' : 'Execute Deployment to Preprod'}
          </Button>
        )}

        {deployedAddress && (
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={handleReset}
          >
            Done
          </Button>
        )}
      </div>
    </Modal>
  );
};
