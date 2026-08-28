# Panduan Kustomisasi Website Undangan Digital

Dokumen ini menjelaskan cara mengganti identitas pasangan, detail acara, foto, musik, RSVP, tanda kasih, dan elemen visual pada website undangan digital **Coastal Editorial**. Website menggunakan React + TypeScript dan seluruh konfigurasi undangan saat ini dipusatkan di `client/src/pages/Home.tsx`.

> **Prinsip utama:** ubah data di objek `CONFIG` terlebih dahulu. Komponen halaman membaca nilai dari objek tersebut sehingga Anda tidak perlu mencari dan mengganti nama pasangan di banyak tempat.

## 1. Struktur File Penting

| File atau folder | Fungsi | Kapan perlu diubah |
|---|---|---|
| `client/src/pages/Home.tsx` | Halaman undangan, objek data, interaksi, galeri, RSVP, countdown, dan lightbox | Saat mengganti konten atau perilaku undangan |
| `client/src/index.css` | Palet warna, tipografi, layout responsif, motif visual, dan animasi | Saat menyesuaikan tema atau breakpoint |
| `client/index.html` | Bahasa halaman, judul browser, deskripsi, dan warna theme | Saat mengganti metadata undangan |
| `ideas.md` | Keputusan arah desain Coastal Editorial | Saat mengembangkan atau mengganti identitas visual |
| `docs/CUSTOMIZATION.md` | Panduan kustomisasi ini | Saat menambahkan instruksi baru |
| `client/src/components/ui/` | Komponen UI bawaan scaffold | Biasanya tidak perlu diubah untuk kustomisasi konten |

Jangan menyimpan foto, video, atau audio berukuran besar di `client/public` atau `client/src/assets`. Asset visual untuk deployment sebaiknya diunggah melalui alur asset proyek, kemudian URL hasil upload digunakan langsung di kode.

## 2. Mengganti Data Utama Pasangan

Buka `client/src/pages/Home.tsx`, lalu cari konstanta `CONFIG` di bagian atas file. Ganti setiap nilai contoh dengan data final pasangan.

```tsx
const CONFIG = {
  couple: "Nama Mempelai 1 & Nama Mempelai 2",
  shortNames: "Panggilan 1 dan Panggilan 2",
  parents: "Nama orang tua kedua mempelai",
  eventDate: "2027-06-12T10:00:00+07:00",
  displayDate: "Sabtu, 12 Juni 2027",
  akadTime: "10.00 — 11.00 WIB",
  receptionTime: "18.30 — 21.00 WIB",
  akadVenue: "Nama lokasi akad",
  receptionVenue: "Nama lokasi resepsi",
  address: "Alamat lengkap acara",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=...",
  bank: "Nama bank",
  account: "Nomor rekening",
  ewalletProvider: "DANA",
  ewallet: "Nomor e-wallet",
  recipient: "Nama penerima",
  paymentLink: "https://link-pembayaran-final",
  musicUrl: "https://url-asset-musik-final.mp3",
};
```

`eventDate` dipakai oleh countdown. Gunakan format ISO dengan zona waktu `+07:00` untuk waktu Indonesia Barat. `displayDate`, `akadTime`, dan `receptionTime` hanya mengatur teks yang terlihat, sehingga ketiganya perlu diperbarui secara manual apabila tanggal atau jam berubah.

Nilai `parents` sudah disiapkan sebagai konfigurasi terpusat. Jika ingin menampilkannya pada section cerita atau footer, tambahkan ekspresi `{CONFIG.parents}` pada lokasi yang diinginkan.

## 3. Nama Tamu dari URL

Nama tamu dibaca dari parameter URL `to`. Contoh tautan yang valid:

```text
https://undangannew-pcoivdzf.manus.space/?to=Keluarga%20Budi%20Santoso
```

Fungsi `guestName()` merapikan spasi, membatasi panjang nama hingga 60 karakter, dan menggunakan fallback `Tamu undangan` jika parameter tidak tersedia. Nilai tersebut ditampilkan sebagai teks biasa, bukan sebagai HTML, sehingga aman untuk nama tamu yang berasal dari URL.

Untuk membagikan undangan kepada banyak tamu, buat satu tautan unik untuk setiap penerima. Spasi pada nama boleh dikodekan sebagai `%20`, atau gunakan `encodeURIComponent` jika tautan dibuat secara otomatis.

## 4. Mengganti Foto Galeri

Daftar foto berada pada konstanta `images`. Setiap objek foto memiliki tiga properti: `src`, `alt`, dan `caption`.

```tsx
{
  src: "URL-FOTO-FINAL",
  alt: "Deskripsi foto yang dapat dibaca pembaca layar",
  caption: "Keterangan pendek bergaya editorial",
}
```

Ganti URL foto satu per satu dan jangan memakai foto yang sama pada beberapa item. Pertahankan variasi crop portrait, landscape, dan tall agar masonry grid tetap memiliki ritme asimetris. `alt` sebaiknya menjelaskan subjek dan konteks foto, bukan sekadar menulis `foto 1`.

Foto pertama pada array juga dipakai sebagai artwork hero dan cover. Jika ingin cover menggunakan foto berbeda dari galeri, tambahkan objek foto khusus sebelum item galeri, atau buat konstanta terpisah seperti `heroImage` dan ubah referensi `.cover__image` serta `hero__photo` di komponen.

## 5. Mengganti Musik Latar

Ganti nilai `musicUrl` dengan URL file audio yang dapat diakses publik. Website mengatur audio agar loop dengan volume awal 24 persen dan baru mencoba memutarnya setelah pengguna menekan **Buka undangan**. Tombol musik tetap tersedia jika browser menolak pemutaran awal.

Gunakan musik instrumental yang memiliki hak penggunaan sesuai kebutuhan acara. Jika URL audio berubah, cukup perbarui `CONFIG.musicUrl`; perilaku tombol musik tidak perlu diubah.

## 6. Mengganti Google Maps dan Kalender

`mapsUrl` harus berupa tautan Google Maps final. Tautan tersebut dibuka pada tab baru melalui tombol **Lihat lokasi**.

Fungsi `calendarUrl()` membuat tautan Google Calendar berdasarkan tanggal dan waktu yang tertanam di dalam fungsi. Saat tanggal atau jam acara berubah, perbarui nilai `start` dan `end` di fungsi tersebut dalam format UTC `YYYYMMDDTHHMMSSZ`. Periksa kembali konversi zona waktu sebelum membagikan tautan kalender. Judul, deskripsi, dan lokasi kalender mengambil data dari `CONFIG`.

Jika acara memiliki zona waktu selain WIB, sesuaikan nilai `eventDate`, nilai UTC kalender, dan parameter `ctz` secara bersamaan.

## 7. Mengatur Countdown

Countdown membaca `CONFIG.eventDate` dan diperbarui setiap detik. Ketika waktu acara sudah lewat, fungsi `formatCountdown()` menggunakan nilai minimum nol sehingga angka tidak berubah menjadi negatif.

Biasanya Anda tidak perlu mengubah logika countdown. Cukup pastikan `eventDate` valid dan memiliki zona waktu. Jika ingin countdown menuju akad, gunakan waktu akad sebagai nilai `eventDate`, bukan tanggal resepsi.

## 8. RSVP dan Guestbook

Form RSVP memiliki tiga status: `Hadir`, `Belum pasti`, dan `Tidak hadir`. Nama dan pesan wajib diisi. Setelah submit berhasil, data baru ditambahkan ke guestbook dan disimpan di `localStorage` menggunakan key `coastal-rsvp`.

Implementasi ini bersifat frontend-only. Artinya, RSVP yang dikirim pada satu browser tidak otomatis terlihat pada perangkat lain. Untuk kebutuhan RSVP nyata lintas perangkat, website perlu di-upgrade dengan backend, endpoint penyimpanan, validasi server, dan pengelolaan data yang aman.

Jangan menambahkan data contoh seolah-olah berasal dari tamu. Empty state akan tampil sampai pengguna benar-benar mengirimkan pesan dari perangkatnya.

Untuk menghapus data RSVP lokal selama pengujian, buka Developer Tools browser lalu jalankan:

```js
localStorage.removeItem("coastal-rsvp");
```

## 9. Mengatur Tanda Kasih dan QR Code

Ganti nilai berikut di `CONFIG` sebelum publikasi:

| Nilai | Isi final |
|---|---|
| `ewalletProvider` | Nama provider e-wallet |
| `ewallet` | Nomor e-wallet |
| `recipient` | Nama penerima |
| `bank` | Nama bank |
| `account` | Nomor rekening |
| `paymentLink` | Link pembayaran atau permintaan dana |

QR code dibuat dari `CONFIG.paymentLink` melalui URL generator QR pada komponen. Pastikan link pembayaran final sudah benar dan dapat diakses sebelum undangan dibagikan. Tombol salin menggunakan Clipboard API dengan fallback untuk browser yang tidak mendukung API tersebut.

Untuk keamanan dan kejelasan, periksa ulang nomor rekening, nomor e-wallet, dan nama penerima secara manual. Jangan membiarkan data contoh berada di versi publik.

## 10. Mengubah Warna dan Tipografi

Semua styling utama berada di `client/src/index.css`. Arah visual saat ini menggunakan:

| Token visual | Nilai | Peran |
|---|---|---|
| Deep Tide Blue | `#173A4A` | Warna jangkar, teks utama, footer, dan tombol |
| Shell Cream | `#F3EEE5` | Kanvas utama dan rasa kertas |
| Dried Coral | `#CF7D67` | Aksen kecil, italic, nomor section, dan highlight |
| Sea-glass Sage | `#D9E3DF` | Latar detail acara |
| DM Serif Display | Display font | Nama pasangan dan judul editorial |
| Manrope | Body font | Isi, metadata, label, dan kontrol |

Pertahankan coral sebagai warna aksen agar hierarki tetap tenang. Jika membuat tema baru, ubah nilai warna secara konsisten pada selector yang relevan, bukan hanya satu section. Perbarui juga komentar gaya di bagian awal file agar keputusan desain tetap terdokumentasi.

Jangan mengganti sistem ini dengan font Inter sebagai font utama. Jika ingin pasangan font baru, tambahkan import Google Fonts di `client/src/index.css` dan perbarui deklarasi `font-family` pada body serta heading.

## 11. Menyesuaikan Logo dan Emblem

Emblem dua busur matahari dibuat dengan CSS pada elemen `.emblem` dan `.brand__mark`. Mark yang sama muncul pada cover, header, footer, dan detail brand. Jika ingin menggunakan logo PNG atau SVG final, pertahankan bentuk tanpa teks agar tetap terbaca sebagai emblem pada ukuran kecil.

Setelah mengganti mark, periksa kontrasnya pada latar terang dan gelap. Selector `.emblem--light` dipakai untuk versi pada cover dan footer.

## 12. Menjalankan dan Memeriksa Secara Lokal

Dari root repository, jalankan perintah berikut:

```bash
pnpm install
pnpm dev
```

Buka URL yang ditampilkan oleh Vite. Periksa juga nama tamu melalui URL berikut:

```text
http://localhost:3000/?to=Keluarga%20Budi%20Santoso
```

Sebelum commit, jalankan pemeriksaan tipe dan production build:

```bash
pnpm check
pnpm build
```

Pemeriksaan manual sebaiknya mencakup pembukaan cover, pemutaran musik, countdown, tombol Maps dan Calendar, pembukaan lightbox dengan keyboard, validasi RSVP kosong, RSVP berhasil, tombol salin, serta tampilan pada lebar mobile dan desktop.

## 13. Publikasi dan GitHub

Perubahan kode dan dokumentasi disimpan di repository GitHub yang terhubung dengan proyek. Setelah selesai mengedit, periksa perubahan dengan:

```bash
git status
git diff -- docs/CUSTOMIZATION.md
```

Commit perubahan dokumentasi dan kode dengan pesan yang jelas:

```bash
git add docs/CUSTOMIZATION.md todo.md
git commit -m "docs: add website customization guide"
git push origin main
```

Jika repository menggunakan remote khusus yang sudah disiapkan oleh lingkungan proyek, gunakan remote tersebut sesuai konfigurasi Git yang tersedia. Jangan menimpa perubahan remote tanpa memeriksa konflik terlebih dahulu.

Untuk deployment melalui proyek Manus, buat checkpoint setelah perubahan lolos pemeriksaan. Checkpoint tersebut akan menjadi versi yang dapat dipublikasikan melalui panel proyek.

## 14. Checklist Sebelum Membagikan Undangan

| Pemeriksaan | Status yang diharapkan |
|---|---|
| Nama pasangan dan nama panggilan | Sudah final dan konsisten |
| Nama orang tua | Sudah diperbarui jika ingin ditampilkan |
| Tanggal dan jam | Benar pada teks, countdown, dan kalender |
| Lokasi dan alamat | Benar serta link Maps dapat dibuka |
| Foto | Semua URL valid, unik, dan memiliki alt text |
| Musik | URL dapat diakses dan memiliki hak penggunaan |
| RSVP | Perilaku lokal dipahami, atau backend sudah disiapkan |
| Rekening dan e-wallet | Sudah diverifikasi dan bukan data contoh |
| Nama tamu URL | Teruji dengan parameter `to` dan fallback |
| Mobile layout | Tidak ada overflow horizontal atau tombol tertutup |
| Reduced motion | Konten tetap tampil saat motion dikurangi |
| Production build | `pnpm check` dan `pnpm build` berhasil |

Jika seluruh pemeriksaan tersebut sudah sesuai, undangan siap dipersonalisasi lebih lanjut dan dibagikan melalui domain proyek.
