# How to Use EduFund

EduFund is a privacy-preserving scholarship and educational grant platform built on the Midnight Network. It ensures donors can fund scholarships with 100% mathematical certainty that funds are spent solely on education, while students can redeem grants without exposing their identities or personal circumstances.

---

## What You Need

Before using EduFund, make sure you have:
1. **A Modern Web Browser**: Google Chrome, Brave, or Microsoft Edge.
2. **Midnight Lace Wallet Extension**: Installed from the official Midnight developer portal or Chrome Web Store, set to the **Midnight Preprod** network.
3. **Preprod Test Tokens (`tNIGHT`)**: Obtain free testnet tokens from the [Midnight Preprod Faucet](https://faucet.preprod.midnight.network) to cover transaction fees.
4. **Grant Voucher Code (For Students)**: Issued by a participating sponsor, educational non-profit, or university department (e.g., `EDUFUND-STEM-GRANT-2026-X89`).

---

## Step-by-Step Guide

### 1. Connecting Your Wallet
1. Open the EduFund application in your browser.
2. Click the **Connect Lace Wallet** button in the top-right corner.
3. Approve the connection request in the Lace pop-up.
4. Verify that the network badge displays **Midnight PREPROD** and your wallet address is shown.

### 2. For Students: Redeeming an Educational Grant
1. Navigate to the **Student Portal (ZK)** tab in the top navigation.
2. In the **Private Scholarship Voucher Code** field, paste or type your voucher code.
3. Enter the amount to redeem (in `tNIGHT`).
4. Select your **Accredited Education Merchant** from the dropdown menu (e.g., National University Tuition Portal, Academic Bookstore, or Lab Hardware Suppliers).
5. Click **Generate ZK Proof & Redeem to Merchant**.
6. Watch the Zero-Knowledge Circuit Pipeline execute:
   - **Step 1**: Your secret witness credentials and voucher are extracted securely inside your browser.
   - **Step 2**: The zero-knowledge SNARK proof is generated locally.
   - **Step 3**: A unique cryptographic nullifier is derived to prevent double claims.
   - **Step 4**: The transaction is verified on the Midnight Preprod ledger, settling funds to the merchant.
7. Upon completion, you will see a green confirmation with your on-chain Transaction Hash and recorded Nullifier.

### 3. For Donors & Government Authorities: Funding the Treasury
1. Select the **Donor Treasury** tab in the navigation.
2. In the **Contribute to Scholarship Pool** section, enter the amount of `tNIGHT` you wish to allocate.
3. Click **Deposit into Scholarship Treasury** and confirm the transaction.
4. View the real-time **Merchant Disbursement Audit** table to see transparently how much capital has been redeemed at each accredited educational institution.

### 4. For Administrators: Accrediting Educational Merchants
1. Select the **Merchant Registry** tab in the navigation.
2. Enter the institution or vendor name (e.g., "City Tech University Bookstore").
3. Select the appropriate category (*University / Tuition*, *Academic Bookstore*, *Lab & Hardware Equipment*, or *Accredited Online Course*).
4. Click **Accredit Merchant**. The institution is cryptographically added to the verified on-chain merchant registry, allowing students to redeem grants with them.
5. You can also temporarily suspend or reactivate existing merchants using the status buttons.

---

## What Gets Proved (and What Stays Private)

EduFund leverages Midnight's dual-state zero-knowledge architecture to cleanly separate public accountability from student privacy:

| Data Element | Visibility | Where It Resides |
| :--- | :--- | :--- |
| **Student Identity & Real Name** | 🔒 **100% PRIVATE** | Never leaves student's local device |
| **Student National ID / Roll No.** | 🔒 **100% PRIVATE** | Never leaves student's local device |
| **Student Personal Wallet Address** | 🔒 **100% PRIVATE** | Never linked to the redeemed grant |
| **Academic Records & Need History** | 🔒 **100% PRIVATE** | Never broadcasted to the network |
| **Voucher Secret Key & Salt** | 🔒 **100% PRIVATE** | Masked inside the ZK witness |
| **Voucher Validity & Unspent Status** | 🌐 **PUBLICLY PROVED** | Mathematically verified by ZK proof |
| **Accredited Merchant Destination** | 🌐 **PUBLICLY VERIFIED** | Validated against on-chain registry |
| **Grant Amount Settled** | 🌐 **PUBLICLY VERIFIED** | Settled directly to merchant on-chain |
| **Voucher Nullifier Hash** | 🌐 **PUBLIC ON-CHAIN** | Logged on ledger to stop double-spends |
| **Donor Pool Balances & Totals** | 🌐 **PUBLIC ON-CHAIN** | Fully auditable in real-time |

---

## Troubleshooting

### Issue 1: "Merchant is not approved" or "Merchant is deactivated"
- **Cause**: The merchant you selected is either not yet registered by the administrator or has been suspended.
- **Solution**: Switch to an active merchant from the dropdown or ask your institution's administrator to accredit the vendor.

### Issue 2: "Grant voucher has already been redeemed"
- **Cause**: Each voucher possesses a unique cryptographic nullifier. Once spent on-chain, any replay attempt will be rejected by the circuit assertion.
- **Solution**: Verify that you are entering a fresh, unspent voucher code.

### Issue 3: "Insufficient scholarship pool balance"
- **Cause**: The requested redemption amount exceeds the remaining unspent balance in the global donor pool.
- **Solution**: Ask the donor/sponsor to deposit additional funds into the treasury via the Donor Treasury tab.

### Issue 4: Lace Wallet Connection Fails
- **Cause**: The Lace wallet extension is locked or connected to a different network.
- **Solution**: Open Lace, ensure your wallet is unlocked, switch the network setting to **Preprod**, and refresh the page.
