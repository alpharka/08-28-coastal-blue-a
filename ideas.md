# Arah Desain Undangan Digital

## Tiga Pendekatan Awal

### Theme Name: Coastal Editorial
**Very Brief Intro:** Undangan terasa seperti jurnal perjalanan pesisir: lapang, hangat, dan intim, dengan tekstur kertas, garis kontur, serta komposisi foto yang tidak simetris.
**Probability:** 0.07

### Theme Name: Midnight Botanica
**Very Brief Intro:** Nuansa romantis malam dengan botanical silhouette, tipografi kontras, dan aksen tembaga yang dramatis namun tetap tenang.
**Probability:** 0.03

### Theme Name: Ceramic Garden
**Very Brief Intro:** Estetika keramik handmade dan taman pagi: putih kapur, biru glasir, bentuk organik, dan detail seperti cap tangan.
**Probability:** 0.05

## Pendekatan Terpilih: Coastal Editorial

### Design Movement
Modern coastal editorialism, dipadukan dengan referensi layout majalah perjalanan dan fotografi analog yang tenang.

### Core Principles
1. **Ruang sebagai napas:** whitespace besar dan ritme vertikal yang memberi kesan premium.
2. **Asimetri yang terarah:** komposisi offset, garis editorial, dan foto yang saling mengimbangi tanpa menjadi grid seragam.
3. **Material yang terasa:** tekstur pasir, noise halus, border tipis, dan warna pudar yang terasa dicetak.
4. **Romantis yang dewasa:** copy personal, bukan filler; interaksi lembut dan tidak berlebihan.

### Color Philosophy
Warna utama adalah **deep tide blue** untuk rasa tenang dan kepercayaan. **Shell cream** menjadi kanvas hangat yang menyerupai kertas kapas. **Dried coral** dipakai sebagai aksen kecil yang memberi kehidupan tanpa menjadi manis berlebihan. **Sea-glass sage** menjadi penyeimbang organik untuk detail dan status interaktif. Palet sengaja rendah saturasi agar fotografi dan nama pasangan menjadi pusat perhatian.

### Layout Paradigm
Halaman dibangun seperti spread editorial: hero dengan panel teks yang bergeser, section cerita memakai kolom narasi dan catatan margin, detail acara memakai dua garis waktu vertikal, serta galeri masonry dengan crop yang bervariasi. Pada mobile, struktur berubah menjadi aliran naratif yang tetap mempertahankan aksen offset.

### Signature Elements
- Garis kontur ombak tipis sebagai divider dan ornament.
- Label kecil uppercase bergaya metadata editorial, misalnya “THE DAY / 01”.
- Emblem dua busur matahari yang menyatu, digunakan sebagai simbol grafis tanpa teks.

### Interaction Philosophy
Setiap interaksi terasa seperti membuka halaman berikutnya: tombol memiliki respons taktil singkat, anchor scroll halus, lightbox fokus pada foto, dan feedback RSVP tetap hangat serta informatif. Tidak ada dekorasi interaktif yang mengganggu pembacaan.

### Animation
Cover bergerak slide-up selama 720ms dengan ease-in-out yang lembut. Header muncul dengan fade dan translateY kecil setelah cover selesai. Section dan gambar di-reveal memakai opacity, translateY, serta scale ringan melalui IntersectionObserver. Hover galeri hanya memperbesar sekitar 1.02x. Lightbox fade-in cepat dengan fokus keyboard. Semua motion non-esensial dinonaktifkan ketika `prefers-reduced-motion: reduce` aktif.

### Typography System
Display menggunakan **DM Serif Display** untuk nama pasangan dan judul section. Body menggunakan **Manrope** dengan ukuran 15–17px dan line-height longgar untuk keterbacaan. Metadata menggunakan Manrope 10–11px uppercase dengan letter spacing lebar. Nama pasangan boleh memakai italic display pada satu kata untuk memberi rasa editorial.

### Brand Essence
Undangan personal untuk pasangan yang ingin membagikan hari mereka dengan rasa tenang, hangat, dan berkelas—berbeda karena terasa seperti cerita perjalanan yang hanya milik mereka.

**Personality:** intimate, composed, sun-washed.

### Brand Voice
Headline terdengar puitis tetapi spesifik; CTA singkat dan mengundang; microcopy jujur, hangat, dan tidak berlebihan.

Contoh headline: “Dari satu garis pantai, menuju satu rumah.”

Contoh CTA: “Baca perjalanan kami” dan “Titipkan doa untuk kami”.

### Wordmark & Logo
Emblem grafis berupa dua busur setengah matahari yang saling berhadapan, dengan titik kecil di tengah sebagai simbol dua perjalanan yang bertemu. Mark tanpa teks ini dipakai pada cover, header, footer, dan favicon.

### Signature Brand Color
**Deep Tide Blue — #173A4A**, warna biru laut dalam yang tenang, dewasa, dan mudah dikenali sebagai jangkar visual brand.

## Style Decisions

- Gunakan palet deep tide blue, shell cream, dried coral, dan sea-glass sage secara konsisten.
- Hindari rounded card berulang; prioritaskan garis, bidang editorial, dan whitespace.
- Semua komponen/page yang dibuat harus mengingatkan pada jurnal perjalanan pesisir, bukan template undangan generik.
