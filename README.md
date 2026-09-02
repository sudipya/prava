# PRAVA Wallet

PRAVA is a React Native + Expo mobile wallet prototype for an India-first international payments product. The current build is intentionally provider-neutral: screens and interaction flows are working with sandbox/demo data, while real custody, KYC, FX, UPI, card, bank-transfer, QR, and crypto rails should be connected through licensed providers before launch.

## Run

```bash
pnpm install
pnpm start
pnpm ios
pnpm android
```

Use Expo Go or a development build to preview on both iOS and Android. `pnpm run typecheck` validates the TypeScript source.

## Product decisions encoded in this build

- Custodial UX with a multi-currency fiat ledger presentation.
- Crypto is represented as a funding/conversion rail (USDC, USDT, BTC, ETH), not as an unqualified promise of local-currency tokens.
- Initial currency/country set: INR, USD, GBP, EUR, CAD, AED, SGD, AUD, JPY, KRW, SAR, CHF, HKD, NZD, MYR, THB, IDR, PHP, BRL, and MXN.
- Pay and receive support both peer-to-peer transfers and merchant-style QR flows.
- Settings follows the supplied reference structure: profile, payment preferences, security/privacy, notifications/support, legal, logout, and account controls.

## Production integration boundary

Keep providers behind explicit adapters: `KycProvider`, `FiatFundingProvider`, `FxProvider`, `CustodyProvider`, and `PayoutProvider`. Every money movement endpoint must be idempotent, ledger-backed, auditable, and server-authoritative. Do not place provider secrets or signing keys in the mobile app. Add environment-specific feature flags to keep sandbox and live rails separate.

The current `App.tsx` is a self-contained UI foundation so it can be split into navigators, feature modules, API clients, and a backend without changing the visual system.
