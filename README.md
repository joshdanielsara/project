# Romantic Proposal Website

A soft, premium, interactive proposal experience built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Experience flow

1. **Survey intro** — neutral personal information form
2. **Courting teasers** — short bilingual story beats that build into the ask
3. **Courtship question** — playful NO interactions with a genuine decline path
4. **Our Little Story** — animated milestone timeline
5. **Heartfelt letter** — envelope + typing animation
6. **Shared moments** — appreciation and a gentle lead-in
7. **Final message** — sincere intentions with no pressure to answer

Music is optional and never autoplays — use the floating music button.

## Email notifications (Brevo)

When she taps **YES, I WILL!**, the server sends two romantic emails via Brevo.

1. Copy `.env.example` to `.env.local` and fill in:
   - `BREVO_API_KEY`
   - `EMAIL_FROM` (verified Brevo sender)
   - `YOUR_EMAIL` / `HER_EMAIL` (defaults)
   - `ADMIN_PASSWORD`
2. Open `/admin`, sign in, and set/update the recipient emails.
3. Use **Reset YES flag** in admin if you need to test sending again.
