"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BellRing,
  ChevronRight,
  Clock3,
  Coins,
  Globe,
  Headphones,
  LockKeyhole,
  Menu,
  Rocket,
  Send,
  ShieldCheck,
  Store,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MINIMUM_LOADER_MS = 1100;
const HERO_READY_TIMEOUT_MS = 5200;

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Why ₱isoCoin?", href: "#why" },
  { label: "Features", href: "#features" },
  { label: "API Docs", href: "https://apidoc.pisocoingateway.com/", external: true },
  { label: "Contact", href: "#contact" },
];

const BENEFITS = [
  {
    icon: WalletCards,
    title: "Mobile Wallet Access",
    copy: "Store, send, and receive ₱isoCoin from a phone-first wallet experience.",
  },
  {
    icon: Banknote,
    title: "Cash-Out Ready",
    copy: "Recipients can convert ₱isoCoin to PHP through banks, pawnshops, or e-wallets like GCash and Maya.",
  },
  {
    icon: Store,
    title: "Merchant Payment Ready",
    copy: "Use ₱isoCoin for shopping, bills, gaming credits, and everyday digital purchases.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    copy: "TRX20-based token rails, end-to-end encryption, and instant ledger updates keep transfers traceable.",
  },
  {
    icon: Coins,
    title: "Multi-Use Token",
    copy: "Built for remittances, gaming microtransactions, merchant payments, and digital purchases.",
  },
  {
    icon: Clock3,
    title: "24/7 Accessibility",
    copy: "Send funds anytime, with no branch visits, cutoff times, or paperwork-heavy steps.",
  },
  {
    icon: LockKeyhole,
    title: "KYC & AML Compliant",
    copy: "Designed with financial regulations in mind for global and local remittance operations.",
  },
  {
    icon: BellRing,
    title: "Real-Time Notifications",
    copy: "Track transfers and get support directly from the platform as funds move.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Login or download the Piso Wallet",
    copy: "Install the wallet to securely store and manage ₱isoCoin.",
    image: "/images/Login-or-Download-the-Piso-Wallet.png",
  },
  {
    step: "02",
    title: "Acquire ₱isoCoin",
    copy: "Buy ₱isoCoin through supported routes or participate in staking to earn rewards.",
    image: "/images/Acquire-PisoCoin.png",
  },
  {
    step: "03",
    title: "Start transacting",
    copy: "Send remittances, make payments, or use ₱isoCoin across supported digital services.",
    image: "/images/Start-Transacting.png",
  },
  {
    step: "04",
    title: "Gaming integration",
    copy: "Use ₱isoCoin for in-game purchases, rewards, and digital asset flows.",
    image: "/images/Gaming-Integration.png",
  },
];

const TOKEN_PILLARS = [
  "Cost efficiency through fewer intermediaries and lower processing overhead",
  "Near-instant cross-border transactions with 24/7 availability",
  "Transparent, immutable ledger tracking with cryptographic safeguards",
  "Financial inclusion for users who only need a smartphone to participate",
  "Stable and reliable value transfers with local-currency conversion paths",
];

const CRYPTO_BASE = [
  "Active trading and remittance communities already understand wallet flows.",
  "Loyalty and incentive programs can be embedded into the payment journey.",
  "App integration makes crypto payments and payouts feel familiar instead of risky.",
];

const GATEWAY_CAPABILITIES = [
  "Local currency acceptance across major Asian payment rails",
  "USDT, Bitcoin, and stablecoin settlement for digital commerce",
  "High-risk merchant onboarding with operational review support",
  "Fraud controls, routing rules, and merchant configuration tools",
  "24/7 support for integrations, payouts, and reconciliation",
];

const HERO_STATS = [
  ["24/7", "Always-on quotes"],
  ["9", "Currencies shown"],
  ["TRX20", "Token rail"],
];

const HERO_ROUTE_POINTS = [
  ["Sender", "Wallet funding"],
  ["Live quote", "FX preview"],
  ["Recipient", "PHP cash-out"],
];

const MERCHANT_LOGIN_URL = "https://backoffice.pisocoingateway.com/sessions/signinmerchant";
const DEFAULT_SOURCE_CURRENCY = "PHP";
const DEFAULT_TARGET_CURRENCY = "USDT";
const API_BASE_CURRENCY = "USD";
const USD_TO_VND = 26309;
const FRANKFURTER_SYMBOLS = ["PHP", "INR", "IDR", "THB", "MYR", "MXN", "KRW"] as const;

const CONVERTER_CURRENCIES = [
  { code: "PHP", label: "Philippine Peso", decimals: 2 },
  { code: "INR", label: "Indian Rupee", decimals: 2 },
  { code: "IDR", label: "Indonesian Rupiah", decimals: 0 },
  { code: "VND", label: "Vietnamese Dong", decimals: 0 },
  { code: "THB", label: "Thai Baht", decimals: 2 },
  { code: "MYR", label: "Malaysian Ringgit", decimals: 2 },
  { code: "MXN", label: "Mexican Peso", decimals: 2 },
  { code: "KRW", label: "South Korean Won", decimals: 0 },
  { code: "USDT", label: "Tether USD", decimals: 2 },
] as const;

type FrankfurterSymbol = (typeof FRANKFURTER_SYMBOLS)[number];
type ConverterCurrency = (typeof CONVERTER_CURRENCIES)[number]["code"];
type FrankfurterRates = Partial<Record<FrankfurterSymbol, number>>;

function parseAmount(value: string) {
  const parsed = Number.parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatNumber(value: number, decimals: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function getUsdRate(currency: ConverterCurrency, rates: FrankfurterRates | null) {
  if (currency === "USDT") {
    return 1;
  }

  if (currency === "VND") {
    return USD_TO_VND;
  }

  return rates?.[currency] ?? null;
}

function getConversionRate(
  sourceCurrency: ConverterCurrency,
  targetCurrency: ConverterCurrency,
  rates: FrankfurterRates | null,
) {
  if (sourceCurrency === targetCurrency) {
    return 1;
  }

  if (!rates) {
    return null;
  }

  const sourceUsdRate = getUsdRate(sourceCurrency, rates);
  const targetUsdRate = getUsdRate(targetCurrency, rates);

  return sourceUsdRate && targetUsdRate ? targetUsdRate / sourceUsdRate : null;
}

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
      <div className="reveal mx-auto inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-pisocoin-amber">
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

function AssetPanel({
  src,
  alt,
  className = "",
  imageClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div data-gsap-parallax className={`reveal relative mx-auto w-full max-w-lg ${className}`}>
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-pisocoin-ember/18 via-pisocoin-amber/10 to-pisocoin-cyan/10 blur-2xl" />
      <div className="glass relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={900}
          sizes="(min-width: 1024px) 42vw, 90vw"
          className={`h-auto w-full object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.35)] ${imageClassName}`}
        />
      </div>
    </div>
  );
}

function InitialPageLoader({ exiting }: { exiting: boolean }) {
  return (
    <div
      className={`page-loader ${exiting ? "page-loader--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Preparing ₱isoCoin homepage"
    >
      <div className="page-loader__mesh" />
      <div className="page-loader__coin" aria-hidden="true">
        <span>₱</span>
      </div>
      <div className="page-loader__panel">
        <p className="text-[11px] uppercase tracking-[0.38em] text-pisocoin-amber">Loading remittance desk</p>
        <div className="font-display mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
          ₱isoCoin
        </div>
        <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10">
          <span className="page-loader__bar block h-full rounded-full bg-gradient-to-r from-pisocoin-ember via-pisocoin-amber to-pisocoin-cyan" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span>Wallet</span>
          <span className="text-center">Quote</span>
          <span className="text-right">Cash-out</span>
        </div>
      </div>
    </div>
  );
}

function HeroMockup({ onRatesSettled }: { onRatesSettled?: () => void }) {
  const [amount, setAmount] = useState("1000");
  const [sourceCurrency, setSourceCurrency] = useState<ConverterCurrency>(DEFAULT_SOURCE_CURRENCY);
  const [targetCurrency, setTargetCurrency] = useState<ConverterCurrency>(DEFAULT_TARGET_CURRENCY);
  const [rates, setRates] = useState<FrankfurterRates | null>(null);
  const [rateDate, setRateDate] = useState("");
  const [rateError, setRateError] = useState(false);
  const [loadingRates, setLoadingRates] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRates() {
      try {
        setLoadingRates(true);
        setRateError(false);

        const response = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${API_BASE_CURRENCY}&symbols=${FRANKFURTER_SYMBOLS.join(",")}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Unable to fetch exchange rates");
        }

        const data = (await response.json()) as {
          date?: string;
          rates?: FrankfurterRates;
        };

        setRates(data.rates ?? null);
        setRateDate(data.date ?? "");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setRateError(true);
        setRates(null);
        setRateDate("");
      } finally {
        if (!controller.signal.aborted) {
          setLoadingRates(false);
          onRatesSettled?.();
        }
      }
    }

    fetchRates();

    return () => {
      controller.abort();
    };
  }, [onRatesSettled]);

  const selectedSourceCurrency =
    CONVERTER_CURRENCIES.find((currency) => currency.code === sourceCurrency) ?? CONVERTER_CURRENCIES[0];
  const selectedTargetCurrency =
    CONVERTER_CURRENCIES.find((currency) => currency.code === targetCurrency) ?? CONVERTER_CURRENCIES[0];
  const numericAmount = parseAmount(amount);
  const conversionRate = useMemo(
    () => getConversionRate(sourceCurrency, targetCurrency, rates),
    [sourceCurrency, targetCurrency, rates],
  );
  const convertedAmount = conversionRate ? numericAmount * conversionRate : null;
  const rateStatus = loadingRates ? "Loading rates" : rateError || !conversionRate ? "Rate unavailable" : rateDate ? `Rates from ${rateDate}` : "Live market rate";
  const swapCurrencies = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  };

  return (
    <div data-gsap-hero-card className="relative mx-auto w-full max-w-[500px] reveal reveal-delay-2 lg:ml-auto">
      <div className="absolute -inset-8 rounded-[2.75rem] bg-[radial-gradient(circle_at_20%_20%,rgba(255,91,87,0.36),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(240,194,75,0.28),transparent_28%),radial-gradient(circle_at_70%_95%,rgba(102,215,255,0.18),transparent_36%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05)_34%,rgba(8,13,49,0.92)_100%)] p-4 shadow-[0_34px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-5">
        <div className="quote-card-grid absolute inset-0 opacity-60" />
        <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-pisocoin-amber/25 blur-2xl" />
        <div className="absolute bottom-14 left-8 h-28 w-28 rounded-full bg-pisocoin-cyan/10 blur-2xl" />

        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.28em] text-white/58">
            <span>Conversion desk</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
              <span className={`h-2 w-2 rounded-full ${rateError ? "bg-pisocoin-ember" : "bg-pisocoin-amber"}`} />
              Live quote
            </span>
          </div>

          <div className="mt-5 rounded-[2rem] bg-[#fbf7ec] p-4 text-pisocoin-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_26px_70px_rgba(0,0,0,0.24)] sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-pisocoin-royal/55">Quote ticket</p>
                <p className="mt-1 text-sm text-pisocoin-ink/55">{selectedSourceCurrency.label} to {selectedTargetCurrency.label}</p>
              </div>
              <div className="rounded-full bg-pisocoin-ink px-3 py-1.5 text-xs font-semibold text-white">
                {sourceCurrency} → {targetCurrency}
              </div>
            </div>

            <label className="mt-5 grid gap-2">
              <span className="text-[11px] uppercase tracking-[0.24em] text-pisocoin-royal">Amount to send</span>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="w-full rounded-[1.35rem] border border-pisocoin-royal/10 bg-white px-4 py-3 font-display text-4xl font-semibold text-pisocoin-ink shadow-[0_10px_26px_rgba(9,19,107,0.07)] outline-none transition-colors placeholder:text-pisocoin-ink/25 focus:border-pisocoin-royal/35 sm:text-5xl"
                placeholder="0"
                aria-label={`Amount to send in ${sourceCurrency}`}
              />
            </label>

            <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-end">
              <label className="grid gap-2 text-sm">
                <span className="text-pisocoin-ink/55">From</span>
                <select
                  value={sourceCurrency}
                  onChange={(event) => setSourceCurrency(event.target.value as ConverterCurrency)}
                  className="w-full rounded-2xl border border-pisocoin-royal/10 bg-pisocoin-ink px-4 py-3 font-semibold text-white outline-none transition-colors focus:border-pisocoin-royal/35"
                  aria-label="Source currency"
                >
                  {CONVERTER_CURRENCIES.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={swapCurrencies}
                className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-pisocoin-royal/10 bg-white text-pisocoin-royal shadow-[0_12px_22px_rgba(9,19,107,0.12)] transition-transform duration-300 hover:-translate-y-0.5 sm:mb-1"
                aria-label="Swap source and recipient currencies"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>

              <label className="grid gap-2 text-sm">
                <span className="text-pisocoin-ink/55">Recipient gets</span>
                <select
                  value={targetCurrency}
                  onChange={(event) => setTargetCurrency(event.target.value as ConverterCurrency)}
                  className="w-full rounded-2xl border border-pisocoin-royal/10 bg-white px-4 py-3 font-semibold text-pisocoin-ink outline-none transition-colors focus:border-pisocoin-royal/35"
                  aria-label="Recipient currency"
                >
                  {CONVERTER_CURRENCIES.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 overflow-hidden rounded-[1.6rem] bg-pisocoin-ink text-white">
              <div className="bg-[radial-gradient(circle_at_top_right,rgba(240,194,75,0.22),transparent_38%),linear-gradient(135deg,rgba(22,38,184,0.3),transparent_55%)] p-4">
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-white/48">
                  <span>Recipient receives</span>
                  <span>{targetCurrency}</span>
                </div>
                <div className="mt-3 font-display text-3xl font-semibold leading-none sm:text-4xl" aria-live="polite">
                  {convertedAmount === null
                    ? "..."
                    : formatNumber(convertedAmount, selectedTargetCurrency.decimals)}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4 border-t border-white/10 pt-4 text-sm">
                  <span className="text-white/55">Rate</span>
                  <span className="max-w-[220px] text-right font-semibold text-white">
                    {conversionRate === null
                      ? "Unavailable"
                      : `1 ${sourceCurrency} = ${formatNumber(
                          conversionRate,
                          selectedTargetCurrency.decimals === 0 ? 4 : 6,
                        )} ${targetCurrency}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-pisocoin-royal/10 bg-white/70 px-4 py-3 text-sm text-pisocoin-ink/70">
              <BadgeCheck className="h-4 w-4 shrink-0 text-pisocoin-ember" />
              {rateStatus}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-white sm:gap-3">
            {HERO_STATS.map(([value, label]) => (
              <div key={value} className="rounded-2xl border border-white/10 bg-white/7 px-3 py-3 text-center backdrop-blur-xl">
                <div className="font-display text-xl font-semibold">{value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/48">{label}</div>
              </div>
            ))}
          </div>

          <a
            href={MERCHANT_LOGIN_URL}
            target="_blank"
            rel="noreferrer"
            className="shine mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-gradient-to-r from-pisocoin-ember via-[#ff7d4d] to-pisocoin-amber px-5 py-4 text-sm font-semibold text-pisocoin-ink shadow-[0_18px_50px_rgba(255,91,87,0.25)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Send Money
            <Send className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PisoCoinLanding() {
  const landingRef = useRef<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clientReady, setClientReady] = useState(false);
  const [heroLogoReady, setHeroLogoReady] = useState(false);
  const [heroRatesReady, setHeroRatesReady] = useState(false);
  const [minimumLoaderElapsed, setMinimumLoaderElapsed] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);

  const markHeroLogoReady = useCallback(() => {
    setHeroLogoReady(true);
  }, []);

  const markHeroRatesReady = useCallback(() => {
    setHeroRatesReady(true);
  }, []);

  useEffect(() => {
    setClientReady(true);

    const minimumTimer = window.setTimeout(() => {
      setMinimumLoaderElapsed(true);
    }, MINIMUM_LOADER_MS);

    const fallbackTimer = window.setTimeout(() => {
      setHeroLogoReady(true);
      setHeroRatesReady(true);
    }, HERO_READY_TIMEOUT_MS);

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (pageReady || !clientReady || !heroLogoReady || !heroRatesReady || !minimumLoaderElapsed) {
      return;
    }

    setPageReady(true);
  }, [clientReady, heroLogoReady, heroRatesReady, minimumLoaderElapsed, pageReady]);

  useEffect(() => {
    document.body.classList.toggle("page-loader-locked", loaderVisible);

    return () => {
      document.body.classList.remove("page-loader-locked");
    };
  }, [loaderVisible]);

  useEffect(() => {
    if (!pageReady) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setLoaderVisible(false);
    }, 720);

    return () => {
      window.clearTimeout(timer);
    };
  }, [pageReady]);

  useGSAP(
    () => {
      const root = landingRef.current;

      if (!root || !pageReady) {
        return undefined;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        root.classList.remove("gsap-enabled");
        gsap.set(gsap.utils.toArray<HTMLElement>(".reveal", root), {
          autoAlpha: 1,
          clearProps: "transform,filter",
        });
        return undefined;
      }

      root.classList.add("gsap-enabled");

      const topLevel = (elements: HTMLElement[]) =>
        elements.filter((element) => !elements.some((candidate) => candidate !== element && candidate.contains(element)));

      const revealFromVars = {
        autoAlpha: 0,
        y: 34,
        filter: "blur(10px)",
      };

      const revealToVars = {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.82,
        ease: "power3.out",
      };

      const header = root.querySelector<HTMLElement>("header");
      const hero = root.querySelector<HTMLElement>(".hero-section");
      const heroItems = topLevel(gsap.utils.toArray<HTMLElement>(".hero-section .reveal", root));

      if (header) {
        gsap.from(header, {
          autoAlpha: 0,
          y: -20,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (heroItems.length) {
        gsap.set(heroItems, {
          autoAlpha: 0,
          y: 42,
          filter: "blur(12px)",
        });

        gsap.timeline({ defaults: { ease: "power3.out" } }).to(heroItems, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.08,
          delay: 0.08,
        });
      }

      if (hero) {
        const heroMesh = hero.querySelector<HTMLElement>(".hero-mesh");
        const heroCard = hero.querySelector<HTMLElement>("[data-gsap-hero-card]");
        const routeLine = hero.querySelector<HTMLElement>(".hero-route-line");

        if (heroMesh) {
          gsap.to(heroMesh, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (heroCard) {
          gsap.to(heroCard, {
            yPercent: 8,
            rotate: -1.5,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (routeLine) {
          gsap.fromTo(
            routeLine,
            { xPercent: -120 },
            {
              xPercent: 250,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      }

      gsap.utils.toArray<HTMLElement>(".section-shell:not(.hero-section)", root).forEach((section) => {
        const revealItems = topLevel(gsap.utils.toArray<HTMLElement>(".reveal", section));
        const cards = topLevel(
          gsap.utils
            .toArray<HTMLElement>("article, .glass, .glass-soft, form label, form button", section)
            .filter((item) => !revealItems.includes(item)),
        );

        if (!revealItems.length && !cards.length) {
          return;
        }

        gsap.set(revealItems, revealFromVars);
        gsap.set(cards, {
          autoAlpha: 0,
          y: 30,
          scale: 0.96,
          transformOrigin: "50% 80%",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            once: true,
          },
        });

        if (revealItems.length) {
          timeline.to(revealItems, {
            ...revealToVars,
            stagger: 0.08,
          });
        }

        if (cards.length) {
          timeline.to(
            cards,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.72,
              ease: "power3.out",
              stagger: 0.045,
            },
            revealItems.length ? "-=0.42" : 0,
          );
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap-parallax]", root).forEach((item, index) => {
        const travel = index % 2 === 0 ? -8 : -5;

        gsap.to(item, {
          yPercent: travel,
          rotate: index % 2 === 0 ? -0.8 : 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();

      return () => {
        root.classList.remove("gsap-enabled");
      };
    },
    { dependencies: [pageReady], revertOnUpdate: true, scope: landingRef },
  );

  return (
    <main ref={landingRef} id="top" className="relative overflow-hidden" aria-busy={!pageReady}>
      {loaderVisible ? <InitialPageLoader exiting={pageReady} /> : null}

      <div
        className={`page-content ${pageReady ? "page-content--ready" : "page-content--preparing"}`}
        aria-hidden={!pageReady}
      >
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#05081f]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="#top" className="group inline-flex items-center gap-3">
            <Image
              src="/images/pisocoin-logo.png"
              alt="₱isoCoin logo"
              width={56}
              height={56}
              priority
              onLoad={markHeroLogoReady}
              onError={markHeroLogoReady}
              className="h-14 w-14 object-contain"
            />
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-white">₱isoCoin</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={MERCHANT_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
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
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
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

      <section className="hero-section section-shell px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="noise" />
        <div className="hero-mesh absolute inset-x-0 top-0 h-full" />
        <div className="absolute left-1/2 top-28 h-56 w-56 -translate-x-1/2 rounded-full border border-pisocoin-amber/15 sm:h-80 sm:w-80" />
        <div className="absolute right-[8%] top-36 hidden h-36 w-36 rounded-full border border-white/10 lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative z-10">
            <h1 className="reveal reveal-delay-1 font-display mt-7 max-w-4xl text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              Borderless Remittance for Filipinos.
            </h1>

            <p className="reveal reveal-delay-2 mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Send Smarter. Pay Faster. Live Freer.
            </p>

            <p className="reveal reveal-delay-3 mt-5 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              ₱isoCoin Remit gives Filipino users a faster path to move value across borders,
              with wallet-first access and payment flows built for real transactions, not just demos.
            </p>

            <div className="reveal reveal-delay-4 mt-9 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pisocoin-amber via-[#ff9f4a] to-pisocoin-ember px-6 py-3.5 text-sm font-semibold text-pisocoin-ink shadow-[0_18px_45px_rgba(240,194,75,0.2)]"
              >
                Start a Transfer
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white/85 backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-white"
              >
                Explore the Flow
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="reveal reveal-delay-4 mt-10 max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/45">
                <Globe className="h-4 w-4 text-pisocoin-amber" />
                Remittance path
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {HERO_ROUTE_POINTS.map(([label, detail], index) => (
                  <div key={label} className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-pisocoin-ink/45 p-4">
                    <div className="absolute right-3 top-3 font-display text-4xl font-semibold text-white/[0.04]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-xs uppercase tracking-[0.22em] text-pisocoin-amber">{label}</p>
                    <p className="mt-3 text-sm font-medium text-white">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="hero-route-line h-full rounded-full bg-gradient-to-r from-pisocoin-ember via-pisocoin-amber to-pisocoin-cyan" />
              </div>
            </div>
          </div>

          <HeroMockup onRatesSettled={markHeroRatesReady} />
        </div>
      </section>

      <section id="services" className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal order-2 lg:order-1">
            <AssetPanel
              src="/images/What-is-PisoCoin-1.png"
              alt="₱isoCoin token illustration"
              imageClassName="max-h-[560px]"
            />
          </div>

          <div className="order-1 text-center lg:order-2 lg:text-left">
            <SectionLabel
              eyebrow="What is ₱isoCoin?"
              title="Blockchain-powered remittance built for Filipino families."
              subtitle="₱isoCoin Remit uses the TRX20-based 1PISO token to support real-time cross-border transfers, lower fees, mobile convenience, and flexible cash-out options."
            />
            <div className="reveal reveal-delay-2 mt-8 grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-[1.75rem] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-pisocoin-amber">Canada to PH</p>
                <p className="mt-3 text-lg leading-7 text-white/78">
                  Send money from Canada to the Philippines through a wallet-led flow built
                  for speed and accessibility.
                </p>
              </div>
              <div className="glass rounded-[1.75rem] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-pisocoin-amber">Cash-out ready</p>
                <p className="mt-3 text-lg leading-7 text-white/78">
                  Recipients can receive funds in digital wallets or withdraw cash through
                  payout partners across the Philippines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <SectionLabel
              eyebrow="Remote Payment Solution"
              title="Send money anytime, anywhere."
              subtitle="No bank visits and no paperwork. ₱isoCoin Remit supports real-time crypto transfers through secure mobile and web access."
            />
            <div className="reveal reveal-delay-2 mt-8 flex flex-wrap gap-3">
              {[
                "Remote transfers",
                "Digital wallet receipt",
                "Cash withdrawal paths",
                "Partner payout network",
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
            <AssetPanel
              src="/images/remote-payment-solution.png"
              alt="Secure remote payment on a mobile phone"
              imageClassName="max-h-[620px]"
            />
          </div>
        </div>
      </section>

      <section id="why" className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel
            eyebrow="Why ₱isoCoin?"
            title="Made for remittance, cash-out, and everyday digital value."
            subtitle="The product is positioned around the realities of Filipino payments: mobile access, cash-out, trusted support, and fast movement across borders."
          />

          <div className="reveal reveal-delay-2 mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
            title="Four steps from wallet login to live transacting."
          />

          <div className="reveal reveal-delay-2 mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {STEPS.map((item) => (
              <article key={item.step} className="glass overflow-hidden rounded-[1.75rem] p-5">
                <div className="relative mb-5 aspect-square overflow-hidden rounded-[1.35rem] bg-white/5">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 90vw"
                    className="object-contain p-2"
                  />
                </div>
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
          <div>
            <SectionLabel
              eyebrow="Importance of Tokens"
              title="Tokens make remittance faster, clearer, and more accessible."
              subtitle="Token-based transfers can reduce intermediary costs, keep records transparent, and expand access for unbanked recipients who rely on smartphones."
            />
            <div className="reveal reveal-delay-2 mt-8 space-y-3">
              {TOKEN_PILLARS.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                  <BadgeCheck className="h-4 w-4 text-pisocoin-amber" />
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Image
              src="/images/crypto-savvy-customer-base.png"
              alt="₱isoCoin secure value storage illustration"
              width={760}
              height={760}
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="h-auto w-full rounded-[1.5rem] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionLabel
              eyebrow="Gaming + Rewards"
              title="A multi-use token for play, payments, and loyalty."
              subtitle="₱isoCoin can support in-game purchases, digital assets, merchant rewards, and customer incentives without forcing users out of familiar wallet flows."
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
            <AssetPanel
              src="/images/Gaming-Integration.png"
              alt="₱isoCoin gaming integration illustration"
              imageClassName="max-h-[580px]"
            />
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
                  Be Part of the ₱isoCoin Revolution
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
                <Image
                  src="/images/pisocoin-revolution.png"
                  alt="Stack of ₱isoCoin tokens"
                  width={768}
                  height={768}
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="mx-auto h-auto max-h-[420px] w-full object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.35)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section-shell px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel
            eyebrow="Global Payment Gateway"
            title="Accept local and crypto payments across Asia and beyond."
            subtitle="From local payment methods to USDT and Bitcoin settlement, ₱isoCoin Gateway is built for merchants that need fast, secure, scalable coverage."
          />

          <div className="reveal reveal-delay-2 mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-pisocoin-amber">Gateway platform</p>
              <div className="mt-5 space-y-4 text-white/78">
                <p>
                  ₱isoCoin Gateway connects businesses to trusted local payment methods
                  in China, Malaysia, Thailand, Vietnam, Indonesia, and the Philippines.
                </p>
                <p>
                  It also supports USDT, Bitcoin, and other major digital assets for
                  e-commerce, gaming, digital services, and high-risk merchant use cases.
                </p>
              </div>
              <div className="mt-8 space-y-3">
                {GATEWAY_CAPABILITIES.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-pisocoin-amber" />
                    <span className="text-sm leading-6 text-white/78">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="rounded-full bg-pisocoin-ember px-5 py-3 text-sm font-semibold text-white">
                  Contact Sales
                </a>
                <a
                  href="https://apidoc.pisocoingateway.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85"
                >
                  API
                </a>
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

              <div className="mt-6 overflow-hidden rounded-[1.5rem] bg-white p-4">
                <Image
                  src="/images/features.png"
                  alt="Supported local payment methods across Asia"
                  width={835}
                  height={1620}
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="mx-auto h-auto max-h-[760px] w-full object-contain"
                />
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
                Build the next remittance flow with ₱isoCoin.
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
          <p>© {new Date().getFullYear()} ₱isoCoin. All rights reserved.</p>
          <p className="uppercase tracking-[0.22em]">Borderless remittance and gateway design</p>
        </div>
      </footer>
      </div>
    </main>
  );
}
