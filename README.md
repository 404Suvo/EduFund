# EduFund

![CI](https://github.com/jitsuing/EduFund/actions/workflows/ci.yml/badge.svg)

> Transparent Scholarship & Student Grant Distribution powered by Midnight zero-knowledge smart contracts.

## Live Demo
[Preprod demo URL — I will paste after deploying frontend]

## Contract Address
| Network  | Address                                                    |
|----------|------------------------------------------------------------|
| Preprod  | `addr_preprod165647566756e645f7363686f6c6172736869705f636f6e74` |

## What This Product Does
Scholarships and educational aid programs globally are hindered by lengthy bureaucratic processing, lack of transparency, and high administrative friction. When corporations or governments donate millions toward student grants, funds pass through multiple institutional tiers with almost zero real-time visibility into whether aid actually reaches needy students or if it is spent on legitimate educational requirements. Conversely, on conventional public blockchains, publishing grant distribution leaks sensitive student identities, financial distress, and personal data to the entire world.

EduFund solves this dilemma by turning traditional unrestricted cash disbursements into programmable, purpose-specific zero-knowledge digital assets on the Midnight Network. Donors contribute capital directly to an on-chain smart contract treasury with verifiable global accounting. Eligible students receive private scholarship vouchers off-chain, which they can spend exclusively at accredited educational institutions (universities, academic bookstores, certified research laboratories, and online learning platforms).

By harnessing Midnight's dual-state architecture, EduFund guarantees 100% mathematical certainty that donated capital is never diverted to non-educational uses, while completely safeguarding students from financial profiling, social stigma, and identity exposure.

## Privacy Model
- **What is PUBLIC (on-chain, anyone can see):**
  - Authority / Admin public key managing educational merchant accreditations.
  - Total scholarship treasury pool balance deposited by donors.
  - Cumulative disbursed grant amount across the platform.
  - List of accredited educational merchant public keys and their active/suspended status.
  - Recorded voucher nullifiers preventing double-spending and replay attacks.
  - Aggregated redemption totals settled to each accredited merchant for transparent donor audits.

- **What is PRIVATE (private witness, never on-chain):**
  - Student real-world identity, full name, national ID, and institutional roll number.
  - Student personal wallet address and historical balance.
  - Raw scholarship voucher secret key and salt.
  - Student academic transcript, GPA, and economic need assessment.
  - Admin and merchant private authentication signing keys.

- **What the user PROVES without revealing:**
  - The student proves knowledge of a valid, unspent scholarship grant voucher for amount $A$.
  - The student proves that the destination merchant is an accredited, active educational institution on-chain.
  - The student proves that the one-way nullifier hash has never appeared on the public ledger before.
  - The student executes payment and updates merchant balances without ever revealing *who* they are.

## Tech Stack
- **Smart Contract DSL**: Compact (Midnight Network)
- **Zero-Knowledge Circuits**: Compact compiler (`compactc`) producing ZKIR and SNARK proving keys
- **Contract Runtime & SDK**: `@midnight-ntwrk/compact-runtime`, `@midnight-ntwrk/midnight-js-contracts`
- **Frontend Framework**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS, Lucide Icons
- **Testing**: Vitest
- **CI/CD**: GitHub Actions

## Prerequisites
- **Midnight Lace Wallet Extension** (configured to the **Preprod** network)
- **Node.js**: v22.x or later (`node -v`)
- **Docker Desktop**: For running the local Midnight Proof Server (`midnightntwrk/proof-server`)
- **Compact CLI**: Installed via `curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh`

## Setup & Run Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/jitsuing/EduFund.git
   cd EduFund
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Compile the Compact smart contract:**
   ```bash
   npm run compile
   ```
   *(Or using the native Compact CLI: `compact compile contracts/edufund.compact managed`)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the web application:**
   Navigate to `http://localhost:5173` in your browser and connect your Midnight Lace Wallet.

## Run Tests
Execute the unit test suite covering contract initialization, donor pool deposits, merchant accreditations, zero-knowledge grant redemptions, and double-spending protection:
```bash
npm test
```

## CI/CD
Continuous Integration is configured via GitHub Actions in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). On every push or pull request to `main`, the workflow:
1. Provisions an Ubuntu environment with Node.js v22.
2. Installs the official Midnight Compact compiler CLI.
3. Compiles the Compact contract to generate ZK circuits and TypeScript bindings.
4. Runs the automated Vitest test suite.
5. Verifies the production build (`npm run build`).

## Usage Guide
See [docs/USAGE.md](docs/USAGE.md) for a comprehensive, non-technical, step-by-step user guide for students, donors, and educational institutions.

## Product X Profile
[PLACEHOLDER — I will add after creating the account]
