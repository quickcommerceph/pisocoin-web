"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  ChevronRight,
  Clock3,
  Coins,
  Globe,
  Headphones,
  LockKeyhole,
  Menu,
  QrCode,
  Rocket,
  Send,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Why PisoCoin?", href: "#why" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

const BENEFITS = [
  {
    icon: WalletCards,
    title: "Mobile Wallet Access",
    copy: "Wallet-first onboarding for users who live on GCash, Maya, and other local rails.",
  },
  {
    icon: Banknote,
    title: "Cash-Out Ready",
    copy: "Turn digital balances into practical cash-out paths for merchants and receivers.",
  },
  {
    icon: ShieldCheck,
    title: "KYC & AML Ready",
    copy: "Compliance-minded flows for remittance, settlement, and customer verification.",
  },
  {
    icon: Clock3,
    title: "Fast Transactions",
    copy: "Built for quick approval, quick funding, and quick movement between rails.",
  },
  {
    icon: TrendingUp,
    title: "Lower Friction",
    copy: "Reduce fees and handoffs with a single product that handles multiple payment paths.",
  },
  {
    icon: Headphones,
    title: "Real Support",
    copy: "24/7 support for onboarding, ops, and integration questions.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Login to the dashboard",
    copy: "Create your account and review your remittance workspace.",
  },
  {
    step: "02",
    title: "Apply PisoCoin",
    copy: "Submit your business details and complete the onboarding checklist.",
  },
  {
    step: "03",
    title: "Start transacting",
    copy: "Activate rails for wallet transfers, crypto, and local payment flows.",
  },
  {
    step: "04",
    title: "Grow integrations",
    copy: "Use the API, merchant tools, and partner support to expand faster.",
  },
];

const TOKEN_PILLARS = [
  "Cost efficiency for remittance",
  "Cash-out readiness for recipients",
  "Transparency and security",
  "Financial inclusion at scale",
];

const CRYPTO_BASE = [
  "Active trading and remittance communities already understand wallet flows.",
  "Loyalty and incentive programs can be embedded into the payment journey.",
  "App integration makes crypto payments and payouts feel familiar instead of risky.",
];

const FEATURE_LIST = [
  "Local currency or crypto payments",
  "Fast merchant onboarding",
  "Low-fee settlement and payout rails",
  "Developer-friendly API access",
  "24/7 support and guidance",
  "Sandbox-ready integration tools",
];

const PAYMENT_RAILS = [
  "GCash",
  "Maya",
  "QR PH",
  "InstaPay",
  "PESONet",
  "Bank Transfer",
  "USDT",
  "BTC",
  "ETH",
  "Stablecoin",
];

function SectionLabel({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="reveal inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-pisocoin-amber">
        <span className="h-px w-7 bg-gradient-to-r from-transparent via-pisocoin-amber to-transparent" />
        {eyebrow}
        <span className="h-px w-7 bg-gradient-to-r from-transparent via-pisocoin-amber to-transparent" />
      </div>
      <h2 className="reveal reveal-delay-1 section-heading font-display mt-6 text-4xl font-semibold leading-[0.96] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="reveal reveal-delay-2 mt-5 text-base leading-7 text-white/68 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] reveal reveal-delay-2">
      <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-pisocoin-ember/20 via-pisocoin-amber/10 to-transparent blur-2xl" />
      <div className="glass relative overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <div className="absolute right-5 top-5 h-24 w-24 rounded-full bg-pisocoin-amber/20 blur-2xl" />
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/50">
          <span>Send wallet</span>
          <span>Live quote</span>
        </div>
        <div className="mt-5 grid gap-4 rounded-[1.5rem] bg-[#f8f8ff] p-4 text-pisocoin-ink shadow-inner">
          <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(9,19,107,0.08)]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-pisocoin-royal">Amount to send</p>
              <p className="mt-2 font-display text-4xl font-semibold text-pisocoin-ink">1000</p>
            </div>
            <div className="rounded-2xl bg-pisocoin-ink px-3 py-2 text-right text-white">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">PisoCoin</p>
              <p className="font-semibold text-lg">Remit</p>
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-pisocoin-royal/10 bg-gradient-to-b from-white to-pisocoin-paper p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-pisocoin-ink/55">Recipient receives</span>
              <span className="font-semibold text-pisocoin-ink">4071.20</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-pisocoin-ink/55">Rate</span>
              <span className="font-semibold text-pisocoin-ink">1 USD = 56.80 PHP</span>
            </div>
            <div className="h-px bg-pisocoin-royal/10" />
            <div className="flex items-center gap-2 text-sm text-pisocoin-ink/70">
              <BadgeCheck className="h-4 w-4 text-pisocoin-ember" />
              Instant quote locked for the next 30 seconds
            </div>
          </div>

          <button className="shine inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pisocoin-ember to-pisocoin-royal px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,91,87,0.25)] transition-transform duration-300 hover:-translate-y-0.5">
            Send Money
            <Send className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 text-white">
          {[
            ["24/7", "Support"],
            ["Cash-out", "Ready"],
            ["Fast", "Settlement"],
          ].map(([value, label]) => (
            <div key={value} className="glass-soft rounded-2xl p-3 text-center">
              <div className="font-display text-xl font-semibold">{value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/55">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PisoCoinLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main id="top" className="relative overflow-hidden">
      <div className="noise" />

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#05081f]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="#top" className="group inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pisocoin-amber via-pisocoin-ember to-pisocoin-royal shadow-[0_18px_40px_rgba(255,91,87,0.25)]">
              <Coins className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-white">PisoCoin</p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Remit & Gateway</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#contact"
              className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
            >
              Login
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pisocoin-ember to-pisocoin-royal px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(255,91,87,0.2)]"
            >
              Sign Up
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className={`overflow-hidden border-t border-white/8 lg:hidden ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-medium text-white/80"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="rounded-2xl bg-pisocoin-ember px-4 py-3 text-center text-sm font-semibold text-white">
              Start the App
            </a>
          </div>
        </div>
      </header>

      <section className="section-shell px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-pisocoin-amber/30 bg-pisocoin-amber/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-pisocoin-amber">
              <span className="h-2 w-2 rounded-full bg-pisocoin-amber pulse-ring" />
              Borderless wallet for the Philippines
            </div>

            <h1 className="reveal reveal-delay-1 font-display mt-6 text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
              PisoCoin Remit?
            </h1>

            <p className="reveal reveal-delay-2 mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              The cheapest borderless wallet for Filipinos. Send Peso, Crypto, and
              stable value across borders. Send the app. Fast, free from friction.
            </p>

            <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pisocoin-ember to-pisocoin-royal px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(255,91,87,0.22)]"
              >
                Start the App
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                Explore the Flow
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="reveal reveal-delay-4 mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Cash-in/out", "Ready in minutes"],
                ["Token rails", "Remittance built in"],
                ["24/7", "Human support"],
              ].map(([label, detail]) => (
                <div key={label} className="glass-soft rounded-3xl px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
                  <p className="mt-2 text-sm font-medium text-white">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroMockup />
        </div>
      </section>

      <section id="services" className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal order-2 lg:order-1">
            <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
              <div className="absolute -left-6 top-8 h-20 w-20 rounded-full bg-pisocoin-cyan/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-[#15206a] to-[#091043] p-5">
                <div className="flex items-center justify-between text-white/60">
                  <span className="text-[11px] uppercase tracking-[0.28em]">What is PisoCoin?</span>
                  <QrCode className="h-5 w-5 text-pisocoin-amber" />
                </div>
                <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-white/55">Digital remittance</p>
                      <p className="mt-1 text-3xl font-display font-semibold text-white">PisoCoin</p>
                    </div>
                    <div className="rounded-2xl bg-pisocoin-amber px-3 py-2 text-xs font-semibold text-pisocoin-ink">LIVE</div>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-white/75">
                    <div className="flex items-center gap-3 rounded-2xl bg-black/15 px-4 py-3">
                      <Globe className="h-4 w-4 text-pisocoin-cyan" />
                      Global payment gateway with local payout rails
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-black/15 px-4 py-3">
                      <LockKeyhole className="h-4 w-4 text-pisocoin-amber" />
                      Safe and compliant flows for merchants and senders
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-pisocoin-ember/25 blur-3xl" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionLabel
              eyebrow="What is PisoCoin?"
              title="A remote payment solution for modern remittance."
              subtitle="PisoCoin brings crypto-aware payments, local wallet support, and merchant-friendly tools into one borderless flow."
            />
            <div className="reveal reveal-delay-2 mt-8 grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-[1.75rem] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-pisocoin-amber">Digital rails</p>
                <p className="mt-3 text-lg leading-7 text-white/78">
                  A digital remittance platform built to move value through wallets, bank
                  transfers, and token-enabled routes.
                </p>
              </div>
              <div className="glass rounded-[1.75rem] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-pisocoin-amber">Merchant ready</p>
                <p className="mt-3 text-lg leading-7 text-white/78">
                  Designed for fast onboarding, simple settlement, and easy integration into
                  business workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionLabel
              eyebrow="Remote Payment Solution"
              title="Send, receive, and settle without the usual friction."
              subtitle="PisoCoin supports remote payment flows that feel fast on the surface and dependable underneath."
            />
            <div className="reveal reveal-delay-2 mt-8 flex flex-wrap gap-3">
              {[
                "Crypto to cash-out",
                "Wallet transfers",
                "Merchant payouts",
                "Borderless settlement",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75"
                >
                  {item}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="reveal reveal-delay-3 mt-8 inline-flex items-center gap-2 rounded-full border border-pisocoin-amber/35 bg-pisocoin-amber/10 px-5 py-3 text-sm font-semibold text-pisocoin-amber transition-colors hover:bg-pisocoin-amber/20"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="reveal">
            <div className="glass relative mx-auto max-w-lg overflow-hidden rounded-[2rem] p-6">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-pisocoin-cyan/10 blur-2xl" />
              <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-[#121a68] to-[#08103b] p-4">
                  <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/45">
                    <span>Wallet app</span>
                    <Smartphone className="h-4 w-4 text-pisocoin-amber" />
                  </div>
                  <div className="mx-auto flex h-[280px] w-full max-w-[180px] items-center justify-center rounded-[2rem] border border-white/10 bg-[#f3f0ff] shadow-[0_22px_45px_rgba(0,0,0,0.25)]">
                    <div className="w-[82%] rounded-[1.4rem] bg-white p-4 text-pisocoin-ink shadow-[0_18px_30px_rgba(0,0,0,0.08)]">
                      <div className="h-2 w-10 rounded-full bg-pisocoin-royal/20" />
                      <div className="mt-4 rounded-2xl bg-pisocoin-ink px-3 py-3 text-white">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Fast transfer</p>
                        <p className="mt-2 text-2xl font-semibold">Send now</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-pisocoin-amber">Ready to send</p>
                  <h3 className="font-display mt-3 text-3xl font-semibold text-white">Easy mobile payment flow</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    Perfect for users who want a simple, modern way to move value through
                    local and international payment rails.
                  </p>
                  <div className="mt-6 space-y-3">
                    {["Choose destination", "Pick payout rail", "Confirm transfer"].map((line, index) => (
                      <div key={line} className="flex items-center gap-3 rounded-2xl bg-black/15 px-4 py-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-pisocoin-ember to-pisocoin-amber text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <span className="text-sm text-white/80">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel
            eyebrow="Why PisoCoin?"
            title="Made for remittance behavior, not generic fintech theater."
            subtitle="The product is positioned around the realities of Filipino payments: cash-out, trust, support, and speed."
          />

          <div className="reveal reveal-delay-2 mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {BENEFITS.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="glass rounded-[1.75rem] p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pisocoin-ember to-pisocoin-royal shadow-[0_16px_30px_rgba(255,91,87,0.18)]">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{item.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel
            eyebrow="How to Get Started"
            title="Four steps from interest to live transacting."
          />

          <div className="reveal reveal-delay-2 mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {STEPS.map((item) => (
              <article key={item.step} className="glass rounded-[1.75rem] p-6">
                <div className="flex items-center justify-between">
                  <div className="font-display text-3xl font-semibold text-pisocoin-amber">{item.step}</div>
                  <Rocket className="h-5 w-5 text-white/35" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal">
            <div className="glass relative overflow-hidden rounded-[2rem] p-7">
              <div className="absolute -right-14 top-10 h-40 w-40 rounded-full bg-pisocoin-amber/12 blur-3xl" />
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pisocoin-ember to-pisocoin-royal">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-pisocoin-amber">Tokens in remittance</p>
                  <h3 className="font-display mt-2 text-3xl font-semibold text-white">Why token rails matter</h3>
                </div>
              </div>
              <div className="mt-8 space-y-3">
                {TOKEN_PILLARS.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                    <BadgeCheck className="h-4 w-4 text-pisocoin-amber" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <SectionLabel
              eyebrow="Importance of Tokens"
              title="Tokens make remittance feel faster, clearer, and more accessible."
              subtitle="Use token-based flows to reduce operational friction while keeping the experience transparent for end users."
            />
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionLabel
              eyebrow="Crypto-Savvy Customer Base"
              title="Built for users who already think in wallets, rates, and transfers."
              subtitle="PisoCoin can speak to a customer base that is open to digital value movement, incentives, and app-based integrations."
            />
            <div className="reveal reveal-delay-2 mt-8 space-y-4">
              {CRYPTO_BASE.map((item) => (
                <div key={item} className="glass rounded-[1.5rem] px-5 py-4">
                  <p className="text-sm leading-7 text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5">
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-pisocoin-cyan/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#15308a] via-[#0b165e] to-[#070d34] p-5">
                <div className="flex items-center justify-between text-white/55">
                  <span className="text-[11px] uppercase tracking-[0.24em]">Customer base</span>
                  <Coins className="h-5 w-5 text-pisocoin-amber" />
                </div>
                <div className="mt-6 grid gap-4 rounded-[1.4rem] bg-white/6 p-5">
                  {[
                    ["Fast onboarding", "A familiar wallet-style experience"],
                    ["Loyalty hooks", "Rewards and incentives in the flow"],
                    ["App integration", "Ready for a product ecosystem"],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-2xl bg-black/15 px-4 py-3">
                      <p className="font-medium text-white">{title}</p>
                      <p className="mt-1 text-sm text-white/60">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="glass relative overflow-hidden rounded-[2.25rem] px-6 py-10 sm:px-8 lg:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,91,87,0.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(240,194,75,0.2),transparent_24%),linear-gradient(135deg,rgba(9,19,107,0.55),rgba(5,8,31,0.95))]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="reveal text-xs uppercase tracking-[0.3em] text-pisocoin-amber">Be part of the revolution</p>
                <h3 className="reveal reveal-delay-1 font-display mt-4 text-4xl font-semibold leading-[0.98] text-white sm:text-5xl">
                  Be Part of the PisoCoin Revolution
                </h3>
                <p className="reveal reveal-delay-2 mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                  Keep pace with a remittance movement that blends digital wallets, crypto
                  familiarity, and merchant-grade payouts into one coherent platform.
                </p>
                <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-4">
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-pisocoin-amber px-5 py-3 text-sm font-semibold text-pisocoin-ink">
                    Contact Sales
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#features" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                    View Features
                  </a>
                </div>
              </div>

              <div className="reveal">
                <div className="relative mx-auto flex max-w-md items-center justify-center">
                  <div className="absolute h-64 w-64 rounded-full bg-pisocoin-amber/10 blur-3xl" />
                  <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10 bg-white/6 shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-6 rounded-full border border-pisocoin-amber/30" />
                    <div className="absolute inset-10 rounded-full bg-gradient-to-br from-pisocoin-ember via-pisocoin-amber to-pisocoin-royal opacity-90" />
                    <div className="relative rounded-full bg-[#081043] px-5 py-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                      <div className="text-xs uppercase tracking-[0.3em] text-pisocoin-amber">PisoCoin</div>
                      <div className="mt-2 font-display text-4xl font-semibold text-white">1</div>
                      <div className="mt-1 text-sm text-white/65">Coin Revolution</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel
            eyebrow="Global Payment Gateway"
            title="Local wallets, crypto payments, and merchant tooling in one path."
            subtitle="A payment gateway that can serve Asia-facing flows without losing the simplicity merchants expect."
          />

          <div className="reveal reveal-delay-2 mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="glass rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-pisocoin-amber">Gateway logic</p>
              <div className="mt-5 space-y-4 text-white/78">
                <p>
                  PisoCoin is a payment gateway designed for users and merchants who need
                  both local and cross-border movement without a clunky experience.
                </p>
                <p>
                  The architecture can support wallets, bank rails, tokens, and merchant
                  settlement paths with a clear dashboard and strong support layer.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="rounded-full bg-pisocoin-ember px-5 py-3 text-sm font-semibold text-white">
                  Contact Us
                </a>
                <a href="#top" className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85">
                  API
                </a>
              </div>
            </div>

            <div className="glass rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-pisocoin-amber">Feature matrix</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PAYMENT_RAILS.map((rail) => (
                  <div
                    key={rail}
                    className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/6 px-3 py-4 text-center text-sm font-medium text-white/80"
                  >
                    {rail}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel
            eyebrow="Features"
            title="Everything the landing page promises should feel concrete."
          />

          <div className="reveal reveal-delay-2 mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass rounded-[2rem] p-7">
              <div className="space-y-4">
                {FEATURE_LIST.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 rounded-2xl bg-white/5 px-4 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-pisocoin-ember to-pisocoin-amber text-xs font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm leading-7 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-[2rem] p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-pisocoin-amber">Supported rails</p>
                  <h3 className="font-display mt-3 text-3xl font-semibold text-white">Local and global payment methods</h3>
                </div>
                <TrendingUp className="h-6 w-6 text-pisocoin-amber" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  "GCash",
                  "Maya",
                  "Bank transfer",
                  "QR PH",
                  "InstaPay",
                  "PESONet",
                  "PayPal",
                  "USDT",
                  "Bitcoin",
                  "Ethereum",
                  "Stablecoin",
                  "Fiat settlement",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-4 text-center text-sm font-medium text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal">
            <div className="glass rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-pisocoin-amber">Contact us</p>
              <h3 className="font-display mt-4 text-4xl font-semibold leading-[1] text-white">
                Build the next remittance flow with PisoCoin.
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/70">
                Reach out for merchant onboarding, integration help, or platform demos.
              </p>

              <div className="mt-8 space-y-4 text-sm text-white/75">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-pisocoin-amber" />
                  Merchant onboarding support
                </div>
                <div className="flex items-center gap-3">
                  <Headphones className="h-4 w-4 text-pisocoin-amber" />
                  24/7 support and walkthroughs
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-pisocoin-amber" />
                  Global payment gateway guidance
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2 glass rounded-[2rem] p-7 sm:p-8">
          <form
            className="grid gap-5"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-white/75">
                  Name
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-pisocoin-amber/50"
                  />
                </label>
                <label className="grid gap-2 text-sm text-white/75">
                  Email
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-pisocoin-amber/50"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm text-white/75">
                Company
                <input
                  type="text"
                  placeholder="Business or project name"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-pisocoin-amber/50"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/75">
                Message
                <textarea
                  rows={6}
                  placeholder="Tell us what you want to launch."
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-pisocoin-amber/50"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pisocoin-ember to-pisocoin-royal px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,91,87,0.22)]"
              >
                Send Inquiry
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} PisoCoin. All rights reserved.</p>
          <p className="uppercase tracking-[0.22em]">Borderless remittance and gateway design</p>
        </div>
      </footer>
    </main>
  );
}
