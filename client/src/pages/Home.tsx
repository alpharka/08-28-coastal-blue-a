// Coastal Editorial: layout jurnal perjalanan pesisir, deep tide blue, shell cream, dried coral, dan motion lembut.
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Copy, Heart, Instagram, MapPin, Music2, Pause, Play, Quote, Send, Sparkles, X, ZoomIn } from "lucide-react";
import { toast } from "sonner";

const CONFIG = {
  couple: "Alya & Raka",
  shortNames: "Alya dan Raka",
  parents: "Putri pertama dari Bapak Arif & Ibu Mira · Putra kedua dari Bapak Dimas & Ibu Ratih",
  eventDate: "2027-06-12T10:00:00+07:00",
  displayDate: "Sabtu, 12 Juni 2027",
  akadTime: "10.00 — 11.00 WIB",
  receptionTime: "18.30 — 21.00 WIB",
  akadVenue: "Sanggar Ombak, Sanur",
  receptionVenue: "Taman Laut Senja, Denpasar",
  address: "Jl. Pantai Karang 18, Sanur, Denpasar, Bali",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Taman+Laut+Senja+Denpasar",
  bank: "Bank Samudra",
  account: "1234 5678 9012",
  ewalletProvider: "DANA",
  ewallet: "0812 3456 7890",
  recipient: "Alya Prameswari",
  paymentLink: "https://link.dana.id/minta/alyaraka",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b9c4a67.mp3?filename=romantic-piano-ambient-121837.mp3",
};

const images = [
  { src: "/manus-storage/coastal-hero-reference_bd7927b1.jpg", alt: "Alya dan Raka berjalan bersama di tepi pantai saat matahari sore", caption: "The beginning of a longer horizon" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85", alt: "Dua tangan pasangan dengan cincin di atas kain linen", caption: "Small things, held close" },
  { src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85", alt: "Pasangan berdiri menghadap cakrawala laut", caption: "Where the tide turns quiet" },
  { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85", alt: "Potret pengantin dengan busana ivory dan cahaya lembut", caption: "Light on linen" },
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85", alt: "Cincin pernikahan dan bunga kering di atas kertas", caption: "A note to keep" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85", alt: "Pasangan pengantin saling menatap dengan latar cahaya hangat", caption: "A room full of yes" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85", alt: "Detail dekorasi bunga putih dan dedaunan hijau", caption: "The details we remember" },
];

function guestName() {
  const value = new URLSearchParams(window.location.search).get("to")?.replace(/\s+/g, " ").trim();
  return value ? value.slice(0, 60) : "Tamu undangan";
}

function calendarUrl() {
  const start = "20270612T030000Z";
  const end = "20270612T140000Z";
  const details = encodeURIComponent(`Undangan pernikahan ${CONFIG.couple}. Mohon hadir dan berbagi doa bersama kami.`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Pernikahan ${CONFIG.couple}`)}&dates=${start}/${end}&details=${details}&location=${encodeURIComponent(CONFIG.address)}&ctz=Asia%2FJakarta`;
}

function formatCountdown(target: number) {
  const distance = Math.max(0, target - Date.now());
  return { days: Math.floor(distance / 86400000), hours: Math.floor(distance / 3600000) % 24, minutes: Math.floor(distance / 60000) % 60, seconds: Math.floor(distance / 1000) % 60 };
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [countdown, setCountdown] = useState(formatCountdown(new Date(CONFIG.eventDate).getTime()));
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState("");
  const [rsvp, setRsvp] = useState({ name: "", attendance: "Hadir", message: "" });
  const [guestbook, setGuestbook] = useState<{ name: string; attendance: string; message: string; time: string }[]>([]);
  const target = useMemo(() => new Date(CONFIG.eventDate).getTime(), []);
  const audio = useMemo(() => new Audio(CONFIG.musicUrl), []);

  useEffect(() => { audio.loop = true; audio.volume = 0.24; return () => { audio.pause(); }; }, [audio]);
  useEffect(() => { const id = window.setInterval(() => setCountdown(formatCountdown(target)), 1000); return () => clearInterval(id); }, [target]);
  useEffect(() => { const stored = localStorage.getItem("coastal-rsvp"); if (stored) setGuestbook(JSON.parse(stored)); }, []);
  useEffect(() => { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 }); document.querySelectorAll(".reveal").forEach((el) => observer.observe(el)); return () => observer.disconnect(); }, [isOpen]);
  useEffect(() => { document.body.style.overflow = lightbox !== null ? "hidden" : ""; const onKey = (e: KeyboardEvent) => { if (lightbox === null) return; if (e.key === "Escape") setLightbox(null); if (e.key === "ArrowRight") setLightbox((lightbox + 1) % images.length); if (e.key === "ArrowLeft") setLightbox((lightbox - 1 + images.length) % images.length); }; window.addEventListener("keydown", onKey); return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); }; }, [lightbox]);

  const toggleMusic = async () => { try { if (musicPlaying) { audio.pause(); setMusicPlaying(false); } else { await audio.play(); setMusicPlaying(true); } } catch { toast.error("Musik belum dapat diputar. Coba tekan lagi."); } };
  const openInvitation = async () => { setIsOpen(true); try { await audio.play(); setMusicPlaying(true); } catch { setMusicPlaying(false); } };
  const copyValue = async (label: string, value: string) => { try { await navigator.clipboard.writeText(value); } catch { const area = document.createElement("textarea"); area.value = value; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); } setCopied(label); window.setTimeout(() => setCopied(""), 2000); };
  const submitRsvp = (e: React.FormEvent) => { e.preventDefault(); if (!rsvp.name.trim() || !rsvp.message.trim()) { toast.error("Nama dan pesan ucapan perlu diisi."); return; } const next = [{ ...rsvp, time: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) }, ...guestbook]; setGuestbook(next); localStorage.setItem("coastal-rsvp", JSON.stringify(next)); setRsvp({ name: "", attendance: "Hadir", message: "" }); toast.success("Konfirmasi dan ucapanmu sudah tersimpan di perangkat ini."); };

  return <div className="site-shell">
    <div className={`cover ${isOpen ? "cover--open" : ""}`} aria-hidden={isOpen}>
      <div className="cover__image" />
      <div className="cover__wash" />
      <div className="cover__content">
        <div className="emblem emblem--light"><span /><span /><i /></div>
        <p className="eyebrow eyebrow--light">A private shore-side celebration</p>
        <h1>{CONFIG.couple.split(" & ")[0]}<em>&</em>{CONFIG.couple.split(" & ")[1]}</h1>
        <div className="cover__meta"><span>{CONFIG.displayDate}</span><span className="dot" /><span>For {guestName()}</span></div>
        <button className="button button--light" onClick={openInvitation}>Buka undangan <span>↗</span></button>
        <p className="cover__hint">Dengan penuh rasa syukur, kami mengundangmu untuk hadir.</p>
      </div>
      <div className="cover__folio">INVITATION / 01</div>
    </div>

    <header className={`topbar ${isOpen ? "topbar--visible" : ""}`}>
      <a href="#top" className="brand"><span className="brand__mark"><span /><span /><i /></span><span>{CONFIG.shortNames}</span></a>
      <nav><a href="#story">Cerita</a><a href="#details">Detail acara</a><a href="#gallery">Galeri</a><a href="#rsvp">RSVP</a><a href="#gift">Tanda kasih</a></nav>
      <span className="topbar__date">12.06.27</span>
    </header>

    <main id="top">
      <section className="hero section-pad">
        <div className="hero__backdrop" />
        <div className="hero__stamp">BALI / 2027</div>
        <div className="hero__copy reveal"><p className="eyebrow">A day we have been walking toward</p><h2>Alya <em>&</em><br />Raka</h2><p className="hero__lede">Dua langkah yang bertemu di satu garis pantai, lalu memilih untuk pulang ke arah yang sama.</p><a className="text-link" href="#story">Baca perjalanan kami <span>↓</span></a></div>
        <div className="hero__photo reveal"><img src={images[0].src} alt={images[0].alt} /><span className="photo-note">SANUR · 06.2026</span></div>
        <div className="hero__vertical">THE BEGINNING OF FOREVER</div>
      </section>

      <section id="story" className="story section-pad section-cream"><div className="section-label reveal"><span>01</span><span>The story</span></div><div className="story__layout"><div className="story__title reveal"><div className="emblem"><span /><span /><i /></div><h3>Yang tumbuh<br /><em>pelan-pelan.</em></h3></div><div className="story__copy reveal"><p className="lead">Kami bertemu di sebuah sore yang biasa. Namun, percakapan kecil tentang laut, buku yang belum selesai, dan kopi yang terlalu pahit membuat sore itu tinggal lebih lama.</p><p>Empat tahun kemudian, kami belajar bahwa rumah bukan selalu sebuah tempat. Kadang ia adalah seseorang yang membuat perjalanan panjang terasa ringan. Hari ini, kami ingin merayakan keputusan untuk berjalan bersama—dengan orang-orang yang membuat perjalanan ini berarti.</p><div className="story__signature">Alya & Raka <span>♡</span></div></div></div></section>

      <section id="details" className="details section-pad"><div className="section-label reveal"><span>02</span><span>The day</span></div><div className="details__intro reveal"><p className="eyebrow">Mark your calendar</p><h3>Satu hari,<br /><em>dua perayaan.</em></h3><div className="countdown"><div><strong>{String(countdown.days).padStart(2, "0")}</strong><span>hari</span></div><div><strong>{String(countdown.hours).padStart(2, "0")}</strong><span>jam</span></div><div><strong>{String(countdown.minutes).padStart(2, "0")}</strong><span>menit</span></div><div><strong>{String(countdown.seconds).padStart(2, "0")}</strong><span>detik</span></div></div></div><div className="events"><article className="event reveal"><span className="event__number">01</span><div><p className="eyebrow">Saturday morning</p><h4>Akad nikah</h4><p className="event__time">{CONFIG.akadTime}</p><p>{CONFIG.akadVenue}<br />Sanur, Bali</p><a href={CONFIG.mapsUrl} target="_blank" rel="noreferrer" className="text-link">Lihat lokasi <MapPin size={14} /></a></div></article><article className="event reveal"><span className="event__number">02</span><div><p className="eyebrow">Saturday evening</p><h4>Resepsi</h4><p className="event__time">{CONFIG.receptionTime}</p><p>{CONFIG.receptionVenue}<br />{CONFIG.address}</p><a href={calendarUrl()} target="_blank" rel="noreferrer" className="text-link">Simpan ke kalender <CalendarDays size={14} /></a></div></article></div></section>

      <section id="gallery" className="gallery section-pad section-blue"><div className="section-label section-label--light reveal"><span>03</span><span>Frames from us</span></div><div className="gallery__heading reveal"><p className="eyebrow eyebrow--light">A few stills from the way here</p><h3>Hari-hari kecil<br /><em>yang kami simpan.</em></h3></div><div className="masonry">{images.slice(1).map((image, index) => <button className={`gallery__item gallery__item--${index + 1} reveal`} key={image.src} onClick={() => setLightbox(index + 1)} aria-label={`Lihat foto: ${image.alt}`}><img src={image.src} alt={image.alt} /><span><ZoomIn size={15} /> Lihat foto</span></button>)}</div></section>

      <section id="rsvp" className="rsvp section-pad section-cream"><div className="section-label reveal"><span>04</span><span>Let us know</span></div><div className="rsvp__layout"><div className="rsvp__intro reveal"><Quote size={28} strokeWidth={1} /><h3>Datanglah dengan<br /><em>doa terbaikmu.</em></h3><p>Jika belum bisa hadir, doa yang dikirim dari jauh pun akan sampai kepada kami.</p></div><form className="rsvp__form reveal" onSubmit={submitRsvp}><label htmlFor="name">Nama lengkap<input id="name" value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} placeholder="Tulis namamu" /></label><fieldset><legend>Konfirmasi kehadiran</legend><label className="choice"><input type="radio" name="attendance" checked={rsvp.attendance === "Hadir"} onChange={() => setRsvp({ ...rsvp, attendance: "Hadir" })} /> Saya akan hadir</label><label className="choice"><input type="radio" name="attendance" checked={rsvp.attendance === "Belum pasti"} onChange={() => setRsvp({ ...rsvp, attendance: "Belum pasti" })} /> Belum bisa memastikan</label><label className="choice"><input type="radio" name="attendance" checked={rsvp.attendance === "Tidak hadir"} onChange={() => setRsvp({ ...rsvp, attendance: "Tidak hadir" })} /> Tidak dapat hadir</label></fieldset><label htmlFor="message">Pesan ucapan<textarea id="message" rows={4} value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} placeholder="Titipkan doa dan ucapanmu..." /></label><button className="button button--blue" type="submit">Kirim konfirmasi <Send size={16} /></button><small>RSVP ini tersimpan sementara di perangkatmu, tanpa mengirim data ke server.</small></form></div><div className="guestbook reveal"><div><p className="eyebrow">Guestbook</p><h4>Doa yang dititipkan</h4></div>{guestbook.length === 0 ? <p className="guestbook__empty">Pesan ucapanmu akan muncul di sini setelah dikirim.</p> : <div className="guestbook__list">{guestbook.map((item, i) => <article key={`${item.name}-${i}`}><div><strong>{item.name}</strong><span>{item.attendance} · {item.time}</span></div><p>“{item.message}”</p></article>)}</div>}</div></section>

      <section id="gift" className="gift section-pad section-coral"><div className="section-label reveal"><span>05</span><span>A little kindness</span></div><div className="gift__layout"><div className="gift__intro reveal"><Sparkles size={28} strokeWidth={1} /><h3>Tanda kasih,<br /><em>jika berkenan.</em></h3><p>Kehadiranmu adalah hadiah yang paling kami syukuri. Namun jika ingin mengirimkan tanda kasih, berikut detailnya.</p></div><div className="gift__details reveal"><div className="payment-row"><div className="qr"><img src={`https://quickchart.io/qr?text=${encodeURIComponent(CONFIG.paymentLink)}&size=180`} alt="QR code link tanda kasih" /></div><div><p className="eyebrow">Digital envelope</p><h4>{CONFIG.ewalletProvider}</h4><p>{CONFIG.ewallet}<br />a.n. {CONFIG.recipient}</p><button className="copy-button" onClick={() => copyValue("ewallet", CONFIG.ewallet)}><Copy size={14} /> {copied === "ewallet" ? "Tersalin" : "Salin nomor"}</button></div></div><div className="bank-row"><p className="eyebrow">Bank transfer</p><h4>{CONFIG.bank}</h4><p className="bank-number">{CONFIG.account}</p><p>a.n. {CONFIG.recipient}</p><button className="copy-button" onClick={() => copyValue("account", CONFIG.account)}><Copy size={14} /> {copied === "account" ? "Tersalin" : "Salin nomor rekening"}</button></div></div></div></section>

      <footer className="footer section-blue"><div className="emblem emblem--light"><span /><span /><i /></div><p className="eyebrow eyebrow--light">Thank you for being part of our tide</p><h3>Alya <em>&</em> Raka</h3><p>{CONFIG.displayDate} · Bali</p><a href="#top" className="footer__top">Kembali ke atas ↑</a><div className="footer__bottom"><span>Made with a little sea air</span><span><Instagram size={14} /> @alyaraka</span></div></footer>
    </main>

    <button className={`music-control ${isOpen ? "music-control--visible" : ""}`} onClick={toggleMusic} aria-label={musicPlaying ? "Jeda musik" : "Putar musik"}>{musicPlaying ? <Pause size={16} /> : <Play size={16} />}<span>{musicPlaying ? "Jeda musik" : "Putar musik"}</span></button>
    <nav className={`bottom-nav ${isOpen ? "bottom-nav--visible" : ""}`} aria-label="Navigasi mobile"><a href="#story">Story</a><a href="#details">Acara</a><a href="#gallery">Galeri</a><a href="#rsvp">RSVP</a><a href="#gift">Kasih</a></nav>

    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={() => setLightbox(null)}><button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Tutup"><X /></button><button className="lightbox__prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }} aria-label="Foto sebelumnya"><ChevronLeft /></button><figure onClick={(e) => e.stopPropagation()}><img src={images[lightbox].src} alt={images[lightbox].alt} /><figcaption>{images[lightbox].caption} <span>0{lightbox + 1} / 0{images.length}</span></figcaption></figure><button className="lightbox__next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length); }} aria-label="Foto berikutnya"><ChevronRight /></button></div>}
  </div>;
}
