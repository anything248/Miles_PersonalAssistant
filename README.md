# Miles_PersonalAssistant

Personal Singapore credit-card miles and rewards **Payment Advisor** — SG Miles Companion V0.2 proof of concept.

> **Status: Demo / prototype, not live financial advice.** The S$480 optical-store comparison uses entirely fictional cards, rates and discounts. The Kris+ and Atome alerts are separate rule-based examples, not a live bank feed. Always validate eligibility, MCC and current bank terms before payment.

## Quick start

1. Download `index.html` and open it with Chrome, Edge, or Safari (no server or sign-in required).
2. Try the optical-store demo: **S$480**, **in-store POS**, **MCC unknown**.
3. Test the **Kris+ Guard** and **Atome Guard** using payment method/card selectors.
4. Export the audit JSON to review the exact input and source rule IDs; avoid committing exported audit files with personal data.
5. Run tests using `node tests/test_engine.js` (Node.js 18+); no npm dependencies.

## Project structure

```
index.html                         Offline single-page Payment Advisor V0.2
README.md                          This introduction
.gitignore                         Exclude personal audit files / secrets
.github/workflows/tests.yml        CI tests (optional GitHub Actions)
docs/PRODUCT_AND_RULES.md          Product notes, limitations and rule sources
tests/test_engine.js               Node.js test runner for built-in 21 rule checks
tests/TEST_REPORT_2026-11-15.txt   Recorded test evidence from the MVP
```

## What is implemented

- Offline optical retail payment scenario, with known/unknown MCC, simulated caps, and mutually exclusive discounts.
- Kris+ in-app wallet warning for Citi Rewards Mastercard.
- Atome guard including UOB Preferred Platinum Visa / Preferred Visa, UOB Visa Signature, HSBC Revolution and Citi Rewards Mastercard scenarios.
- Evidence/reason codes and exportable audit JSON.

## Not yet implemented

- Real personal-wallet calculation across HSBC Revolution, Citi and UOB/DBS cards; the current main ranking uses demo cards.
- Auto-discovery of a merchant's MCC, live promotions, or bank reward posting.
- Notifications when opening a different app, background alerts or location-based detection.
- Authenticating to banks or loyalty apps (not required, not recommended for this MVP).

## Privacy

Recommended repository visibility: **Private**. This source code contains demo data and generic card categories, not card numbers or banking credentials. Do not commit your personal spend history, card numbers, logins, API keys or real transaction audit JSON. Local files remain on your device.

## References

See [`docs/PRODUCT_AND_RULES.md`](docs/PRODUCT_AND_RULES.md) for The MileLion and bank links. Product logic is not guaranteed up-to-date; check the merchant and issuer's actual transaction coding before relying on a multiplier.
