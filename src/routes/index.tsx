import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Gift,
  CheckCircle,
  Heart,
  Sparkles,
  Menu,
  X,
  GlassWater,
  UtensilsCrossed,
  Music,
  GraduationCap,
  PartyPopper,
} from "lucide-react";

import heroImg from "@/assets/hero-graduation.jpg";
import conviteImg from "@/assets/convite-group.jpg";

import giftsImg from "@/assets/gifts.jpg";
import confirmBg from "@/assets/graduada-2.jpg";
import graduada1 from "@/assets/graduada-1.jpg";
import graduada2 from "@/assets/graduada-2.jpg";
import graduada3 from "@/assets/graduada-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Festa de Formatura — Ana Beatriz Ferreira" },
      {
        name: "description",
        content:
          "Você está convidado para a festa de formatura de Ana Beatriz Ferreira. Celebre essa conquista especial conosco.",
      },
      { property: "og:title", content: "Festa de Formatura — Ana Beatriz Ferreira" },
      {
        property: "og:description",
        content:
          "Você está convidado para a festa de formatura de Ana Beatriz Ferreira. Celebre essa conquista especial conosco.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#contagem", label: "Contagem" },
  { href: "#convite", label: "Convite" },
  { href: "#programa", label: "Programa" },
  { href: "#local", label: "Local" },
  { href: "#presentes", label: "Presentes" },
  { href: "#galeria", label: "Galeria" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-primary/95 shadow-lg backdrop-blur-md"
          : "bg-gradient-to-b from-primary/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#inicio" className="font-serif text-xl text-primary-foreground">
          Ana Beatriz
        </a>
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/85 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#confirmar"
              className="rounded-full bg-accent px-5 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Confirmar
            </a>
          </li>
        </ul>
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground transition-colors hover:bg-primary-foreground/10 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-primary-foreground/10 bg-primary/95 px-6 py-4 backdrop-blur-md lg:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10 hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#confirmar"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-accent px-4 py-3 text-center text-sm font-bold uppercase tracking-wider text-accent-foreground"
              >
                Confirmar presença
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

const EVENT_DATE = new Date("2026-12-12T19:30:00+02:00").getTime();

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? null : Math.max(0, EVENT_DATE - now);
  if (diff === null) return null;
  return {
    dias: Math.floor(diff / 86_400_000),
    horas: Math.floor((diff / 3_600_000) % 24),
    minutos: Math.floor((diff / 60_000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

function Countdown() {
  const t = useCountdown();
  const items = [
    { label: "Dias", value: t?.dias },
    { label: "Horas", value: t?.horas },
    { label: "Minutos", value: t?.minutos },
    { label: "Segundos", value: t?.segundos },
  ];
  return (
    <section id="contagem" className="relative overflow-hidden bg-primary py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-6 text-center text-primary-foreground">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-accent">
          Contagem Regressiva
        </p>
        <h2 className="font-serif text-4xl font-light sm:text-5xl">A grande noite aproxima-se</h2>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-8 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="font-serif text-5xl font-light tabular-nums text-accent sm:text-6xl">
                {item.value === undefined ? "--" : String(item.value).padStart(2, "0")}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/75">
                {item.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-lg text-primary-foreground/80">
          12 de dezembro de 2026 · Salão Esplendor, Maputo
        </p>
      </div>
    </section>
  );
}

const PROGRAMA = [
  {
    hora: "19h30",
    titulo: "Recepção & Welcome Drink",
    descricao: "Boas-vindas aos convidados com espumante e música ambiente.",
    icon: GlassWater,
  },
  {
    hora: "20h30",
    titulo: "Cerimónia de Celebração",
    descricao: "Discursos da graduada, família e mentores, com brinde oficial.",
    icon: GraduationCap,
  },
  {
    hora: "21h30",
    titulo: "Jantar de Gala",
    descricao: "Jantar servido com menu especial preparado para a ocasião.",
    icon: UtensilsCrossed,
  },
  {
    hora: "23h00",
    titulo: "Abertura da Pista",
    descricao: "Primeira dança e abertura oficial da pista de dança.",
    icon: Music,
  },
  {
    hora: "00h00",
    titulo: "Festa até de madrugada",
    descricao: "DJ, pista aberta e muita celebração até altas horas.",
    icon: PartyPopper,
  },
];

function Programa() {
  return (
    <section id="programa" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Programa
          </p>
          <h2 className="font-serif text-4xl font-light sm:text-5xl">O programa da noite</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Cada momento foi pensado para tornar esta celebração inesquecível.
          </p>
        </div>
        <ol className="mt-14 space-y-0">
          {PROGRAMA.map((item, i) => (
            <li key={item.hora} className="relative flex gap-6 pb-12 last:pb-0">
              {i < PROGRAMA.length - 1 && (
                <span className="absolute left-6 top-14 h-full w-px bg-border" aria-hidden />
              )}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-accent shadow-md">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 pt-1">
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  {item.hora}
                </p>
                <p className="mt-1 font-serif text-2xl text-foreground">{item.titulo}</p>
                <p className="mt-1 text-muted-foreground">{item.descricao}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Hero */}
      <section
        id="inicio"
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Ana Beatriz Ferreira em traje de formatura"
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-primary-foreground">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Festa de Formatura
          </p>
          <h1 className="font-serif text-5xl font-light leading-tight sm:text-6xl md:text-7xl">
            Ana Beatriz Ferreira
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-primary-foreground/90 sm:text-xl">
            É com imensa alegria que convido você a celebrar a conclusura do curso de Direito — uma
            conquista construída com dedicação, sonhos e muito esforço.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#convite"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-all hover:bg-accent/90"
            >
              Confirmar presença
            </a>
            <a
              href="#local"
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/20"
            >
              Ver local
            </a>
          </div>
        </div>
      </section>

      {/* Contagem regressiva */}
      <Countdown />

      {/* Convite */}
      <section id="convite" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <img
                src={conviteImg}
                alt="Grupo de formandos celebrando"
                width={1200}
                height={704}
                loading="lazy"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                O Convite
              </p>
              <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
                Uma noite para celebrar
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Depois de anos de estudos, noites em claro e desafios superados, chegou o momento de
                comemorar. Junte-se a mim, à minha família e aos meus amigos para uma noite
                inesquecível de celebração.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Data</p>
                    <p className="text-muted-foreground">Sábado, 12 de dezembro de 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Horário</p>
                    <p className="text-muted-foreground">19h30 — Cerimónia de recepção</p>
                    <p className="text-muted-foreground">20h30 — Início da festa</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Local</p>
                    <p className="text-muted-foreground">Salão Esplendor, Maputo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local */}
      <section id="local" className="bg-secondary/50 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              O Local
            </p>
            <h2 className="font-serif text-4xl font-light sm:text-5xl">Salão Esplendor</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Um espaço sofisticado e acolhedor, preparado especialmente para uma noite de
              celebração e memórias inesquecíveis.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={venueImg}
              alt="Salão de festas decorado para a formatura"
              width={1200}
              height={704}
              loading="lazy"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl bg-card p-6 text-center shadow-sm">
              <p className="font-semibold text-foreground">Endereço</p>
              <p className="mt-2 text-muted-foreground">
                Avenida Julius Nyerere, 1245
                <br />
                Maputo, Moçambique
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 text-center shadow-sm">
              <p className="font-semibold text-foreground">Estacionamento</p>
              <p className="mt-2 text-muted-foreground">
                Estacionamento privativo com segurança disponível para todos os convidados.
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 text-center shadow-sm">
              <p className="font-semibold text-foreground">Dress code</p>
              <p className="mt-2 text-muted-foreground">
                Traje de gala. Sugestão de cores: azul marinho, dourado e champagne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sugestão de presentes */}
      <section id="presentes" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Sugestão de Presentes
              </p>
              <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
                A sua presença é o melhor presente
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Se desejar oferecer algo além da sua companhia, deixo algumas sugestões que serão
                muito especiais nesta nova etapa da minha vida.
              </p>

              <ul className="mt-10 space-y-4">
                {[
                  "Livros de Direito e desenvolvimento pessoal",
                  "Canetas e artigos de escritório de qualidade",
                  "Vouchers para experiências especiais",
                  "Contribuição para viagem de sonho",
                  "Flores e plantas para o novo escritório",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-xl border border-dashed border-border bg-muted/50 p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  <Gift className="mb-1 mr-2 inline h-4 w-4 text-accent" />
                  Conta para depósito disponível na confirmação de presença.
                </p>
              </div>
            </div>

            <div>
              <img
                src={giftsImg}
                alt="Sugestões de presentes de formatura"
                width={1200}
                height={704}
                loading="lazy"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Galeria da Graduada */}
      <section id="galeria" className="bg-secondary/30 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Momentos Especiais
            </p>
            <h2 className="font-serif text-4xl font-light sm:text-5xl">A Graduada</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Alguns dos momentos mais marcantes desta jornada inesquecível.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { src: graduada1, alt: "Ana Beatriz em traje de formatura com diploma" },
              { src: graduada2, alt: "Ana Beatriz celebrando ao ar livre" },
              { src: graduada3, alt: "Ana Beatriz com buquê de flores brancas" },
            ].map((photo, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Sparkles className="h-10 w-10 text-accent drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confirmação */}
      <section className="relative overflow-hidden py-24 text-primary-foreground sm:py-32">
        <div className="absolute inset-0">
          <img
            src={confirmBg}
            alt="Ana Beatriz Ferreira em fotografia de formatura"
            width={1920}
            height={1080}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Heart className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-6 font-serif text-4xl font-light sm:text-5xl">Confirme a sua presença</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            A sua presença tornará este momento ainda mais especial. Confirme até 1 de dezembro de
            2026 pelo contacto abaixo.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/258000000000?text=Olá! Confirmo a minha presença na festa de formatura da Ana Beatriz."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-all hover:bg-accent/90"
            >
              Confirmar por WhatsApp
            </a>
            <a
              href="tel:+258000000000"
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/20"
            >
              Ligar para confirmar
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <p className="font-serif text-xl font-light text-foreground">Ana Beatriz Ferreira</p>
              <p className="mt-1 text-sm text-muted-foreground">Formanda em Direito · 2026</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                Com carinho, Ana Beatriz e família.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                contacto@anabeatrizferreira.co.mz
              </p>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-muted-foreground">
            © 2026 Festa de Formatura Ana Beatriz Ferreira. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}
