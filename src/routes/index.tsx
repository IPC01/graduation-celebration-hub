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
import mpesaImg from "@/assets/mpesa.png";
import emolaImg from "@/assets/emola.jpg";
import bimImg from "@/assets/bim.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          ? "bg-background/95 shadow-lg backdrop-blur-md"
          : "bg-gradient-to-b from-primary/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#inicio"
          className={`font-serif text-xl ${scrolled || open ? "text-foreground" : "text-primary-foreground"}`}
        >
          Ivânia Perce Chirindza
        </a>
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                  scrolled || open
                    ? "text-foreground/80 hover:text-primary"
                    : "text-primary-foreground/85 hover:text-accent"
                }`}
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
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
            scrolled || open
              ? "text-foreground hover:bg-secondary"
              : "text-primary-foreground hover:bg-primary-foreground/10"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wider text-foreground/90 transition-colors hover:bg-secondary hover:text-primary"
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
    <section id="contagem" className="border-y border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/75">Faltam</p>
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4 sm:gap-x-12">
          {items.map((item) => (
            <div key={item.label}>
              <p className="font-serif text-5xl font-medium tabular-nums text-foreground sm:text-6xl">
                {item.value === undefined ? "--" : String(item.value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-primary/75">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROGRAMA = [ { hora: "Entrada da Graduada", titulo: "A Grande Chegada", descricao: "Recebemos a graduada com alegria e emoção, dando início a uma noite memorável.", icon: GlassWater, }, { hora: "Mensagens e Felicitações", titulo: "Palavras que Marcam", descricao: "Um momento especial dedicado a mensagens, homenagens e felicitações de familiares e amigos.", icon: GraduationCap, }, { hora: "Momento de Celebração", titulo: "Brinde à Conquista", descricao: "Levantamos os nossos copos para celebrar esta grande conquista e todos os sonhos que estão por vir.", icon: GlassWater, }, { hora: "Entrega de Presentes", titulo: "Carinho em Cada Presente", descricao: "Um momento de carinho e surpresa, marcado pela entrega de presentes e lembranças especiais.", icon: PartyPopper, }, { hora: "Dança e Celebração", titulo: "Vamos Celebrar!", descricao: "Música, dança, alegria e muita diversão para encerrar esta noite inesquecível em grande estilo.", icon: Music,

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

export default function App() {
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
            alt="Ivânia Perce Chirindza em traje de formatura"
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-primary/55" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-primary-foreground">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Festa de Graduação
          </p>
          <h1 className="font-serif text-5xl font-light leading-tight sm:text-6xl md:text-7xl">
            Ivânia Perce Chirindza
          </h1>
          {/* <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-primary-foreground/90 sm:text-xl">
            É com imensa alegria que convido você a celebrar a conclusao do curso de Direito — uma
            conquista construída com dedicação, sonhos e muito esforço.
          </p> */}
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
      ```tsx
<section id="convite" className="py-24 sm:py-32">
  <div className="mx-auto max-w-6xl px-6">
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

      <div className="order-2 lg:order-1">
        <img
          src={conviteImg}
          alt="Celebração da formatura"
          width={1200}
          height={704}
          loading="lazy"
          className="rounded-2xl shadow-2xl"
        />
      </div>

      <div className="order-1 lg:order-2">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Uma conquista
        </p>

        <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
          Um sonho que se tornou realidade
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Depois de anos de dedicação, noites de estudo, desafios e muitos
          momentos de aprendizagem, chegou o momento de celebrar uma das
          maiores conquistas da minha vida.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Com muito orgulho, celebro a conclusão da minha
          <strong> Licenciatura em Informática pela Universidade Eduardo Mondlane (UEM)</strong>.
          Esta caminhada foi feita de esforço, determinação e perseverança,
          e cada etapa contribuiu para a profissional e pessoa que me tornei.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Quero partilhar esta conquista com a minha família, amigos, colegas,
         e com todas as pessoas que fizeram parte desta jornada.
          A presença de cada um tornará este momento ainda mais especial.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          <strong>Venha celebrar comigo este novo capítulo!</strong>
        </p>
      </div>

    </div>
  </div>
</section>

      {/* Programa */}
      <Programa />

      {/* Local */}
      <section id="local" className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/75">
                Como Chegar
              </p>
              <h2 className="mt-8 font-serif text-4xl font-light leading-tight sm:text-5xl">
                Local da cerimónia
              </h2>
              <address className="mt-12 not-italic text-base leading-relaxed text-muted-foreground">
                Salão Esplendor
                <br />
                Avenida Julius Nyerere, 1245
                <br />
                Maputo, Moçambique
              </address>
              <a
                href="https://www.openstreetmap.org/?mlat=-25.9653&mlon=32.5832#map=15/-25.9653/32.5832"
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-2 border border-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <MapPin className="h-4 w-4" />
                Ver no mapa
              </a>
            </div>
            <div className="overflow-hidden border border-border">
              <iframe
                title="Mapa do Salão Esplendor, Avenida Julius Nyerere, Maputo"
                src="https://www.openstreetmap.org/export/embed.html?bbox=32.5450%2C-25.9950%2C32.6150%2C-25.9350&layer=mapnik&marker=-25.9653%2C32.5832"
                className="h-[340px] w-full border-0 sm:h-[400px]"
                loading="lazy"
              />
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

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="mt-10 inline-flex items-center gap-3 border border-border bg-muted/50 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <Gift className="h-5 w-5 shrink-0 text-accent" />
                    Ver contas para contribuição
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-xl p-7 sm:rounded-none">
                  <DialogHeader className="text-left">
                    <DialogTitle className="font-serif text-3xl font-normal">Contas para contribuição<strong>Ivânia Perce Chirindza</strong></DialogTitle>
                    <DialogDescription className="mt-2 text-base leading-relaxed">
                      A sua presença é o melhor presente. Para quem desejar contribuir, seguem as
                      opções disponíveis.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-3 grid gap-3">
                    {[
                      { name: "M-Pesa", number: "842 01 9475", image: mpesaImg },
                      { name: "e-Mola", number: "868 032 230", image: emolaImg },
                      { name: "Banco BIM", number: "0001 0000 0072 4806 7965 7 ", image: bimImg },
                    ].map((account) => (
                      <div
                        key={account.name}
                        className="flex items-center gap-4 border border-border px-4 py-3"
                      >
                        <img
                          src={account.image}
                          alt={`Logótipo ${account.name}`}
                          className="h-11 w-16 object-contain"
                        />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{account.name}</p>
                          <p className="mt-1 font-serif text-xl tabular-nums text-foreground">
                            {account.number}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
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
      <section
        id="confirmar"
        className="relative overflow-hidden py-24 text-primary-foreground sm:py-32"
      >
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
              href="https://wa.me/258000000000?text=Olá! Confirmo a minha presença na festa de formatura da Ivânia Perce Chirindza."
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
      <footer className="border-t border-border bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <GraduationCap className="mx-auto h-6 w-6 stroke-[1.25] text-foreground" />
          <p className="mt-10 text-sm tracking-wide text-muted-foreground">
            Com gratidão, obrigada por fazerem parte desta conquista.
          </p>
          <p className="mt-4 font-serif text-lg text-foreground">Ivânia Perce Chirindza</p>
        </div>
      </footer>
    </main>
  );
}
