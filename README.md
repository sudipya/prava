# PRAVA Wallet

![PRAVA logo](assets/prava-logo.svg)

## Screens and working features

## Product video script

> Meet PRAVA — a global money wallet built for simple international payments.
>
> Users can add money using cards, bank transfers, UPI, or supported crypto funding methods, then hold multiple currency balances in one secure custodial wallet.
>
> PRAVA connects to live foreign-exchange data so users can view current rates, historical movements, and conversion values across 20 currencies.
>
> Users can send money by scanning a QR code, entering a phone number, or using a PRAVA UID. They can receive money with a personal QR code, handle, phone number, or shareable payment request.
>
> With transaction history, rate alerts, wallet visibility controls, security settings, and support tools, PRAVA makes international money movement simple.
>
> PRAVA is designed as an India-first platform that can expand globally through licensed payment, custody, FX, KYC, and payout partners.
>
> One wallet. Many currencies. Fast global payments. This is PRAVA — money without borders.

The app is organized around four primary tabs and task screens. Every item below is implemented in the Expo app and is reachable by tapping the matching control or using the global search field.

| Screen | Working features |
| --- | --- |
| Home | Multi-currency wallet cards, total balance, Pay, Receive, Add money, Convert, recent activity |
| Rates | 20 USD currency pairs, server-fetched rates, tap-through detail charts |
| Rate detail | Current quote, historical chart data, range selector, conversion entry point |
| Pay someone | Amount entry, recipient chooser, QR camera scanner, phone and PRAVA UID paths |
| Receive money | Scannable PRAVA QR, handle/UID display, share payment link, invoice/request action, phone/UID sharing |
| Add money | Card, bank transfer, and crypto on-ramp funding paths |
| Activity | Payment, top-up, and conversion history |
| Settings | Profile, payment preferences, security, notifications, support, legal, logout, searchable sub-options |

### Visual references

The supplied design references are preserved in the implementation: light PRAVA palette, rounded cards, bottom tab bar, avatar header, QR flows, rate cards, and settings groups. When documenting a release, place simulator captures in `docs/screenshots/` using these filenames so they render on GitHub:

```text
docs/screenshots/home.png
docs/screenshots/rates.png
docs/screenshots/rate-detail.png
docs/screenshots/pay.png
docs/screenshots/receive.png
docs/screenshots/add-money.png
docs/screenshots/activity.png
docs/screenshots/settings.png
```

Then add them here with standard Markdown image links, for example:

```md
![Home](docs/screenshots/home.png)
```

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
