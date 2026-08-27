import type { Metadata } from "next";
import { sitePath } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "Disclaimer | The Fallow Diagnostic",
  description: "Batas penggunaan The Fallow Diagnostic.",
};

const disclaimerSections = [
  {
    number: "01",
    title: "Tujuan penggunaan",
    body: "The Fallow Diagnostic merupakan alat edukasi dan refleksi personal. Hasilnya menggambarkan pola jawaban pada saat pengisian dan berfungsi sebagai bahan untuk memperjelas pertanyaan berikutnya.",
  },
  {
    number: "02",
    title: "Ruang profesional",
    body: "Diagnosis klinis, penilaian risiko, perawatan, terapi, serta nasihat medis, hukum, finansial, atau profesional berada dalam ranah tenaga berwenang sesuai konteks.",
  },
  {
    number: "03",
    title: "Konteks hasil",
    body: "Setiap hasil dapat dipengaruhi kondisi saat mengisi, pemahaman terhadap pertanyaan, pengalaman pribadi, serta kejujuran jawaban. Skor membawa hipotesis awal untuk investigasi lebih lanjut.",
  },
  {
    number: "04",
    title: "Keputusan pengguna",
    body: "Keputusan tentang kesehatan, keselamatan, pekerjaan, hubungan, keuangan, atau kehidupan tetap menjadi tanggung jawab pengguna. Carilah dukungan profesional yang relevan sebelum mengambil keputusan berdampak besar.",
  },
  {
    number: "05",
    title: "Batas tanggung jawab",
    body: "Sejauh diizinkan hukum yang berlaku, pengguna menerima tanggung jawab atas penggunaan informasi serta langkah yang dipilih. Pearling Lim, pengelola, kontributor, dan pihak terkait dibebaskan dari klaim, kerugian, atau konsekuensi yang berkaitan dengan penggunaan situs ini.",
  },
  {
    number: "06",
    title: "Keselamatan dan bantuan segera",
    body: "Saat muncul pikiran untuk menyakiti diri, keinginan mengakhiri hidup, atau rasa keselamatan terancam, prioritaskan layanan darurat setempat, tenaga kesehatan, atau seseorang yang dapat hadir secara langsung.",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="legal-brand" href={sitePath()}>
          <span>THE FALLOW DIAGNOSTIC</span>
          <em>by Pearling</em>
        </a>
        <a className="legal-back" href={sitePath()}>← Kembali ke assessment</a>
      </header>

      <section className="legal-hero disclaimer-hero page-shell">
        <div className="legal-folio">TERMS / 02</div>
        <div>
          <span className="section-kicker">DISCLAIMER</span>
          <h1>Batas penggunaan, dengan bahasa manusia.</h1>
        </div>
        <p>
          Halaman ini membantu kamu memahami fungsi tool, tanggung jawab pengguna, ruang profesional, serta langkah keselamatan yang relevan.
        </p>
      </section>

      <section className="legal-notice page-shell" role="note">
        <strong>REFLECTION FIRST</strong>
        <p>Baca hasil sebagai data subjektif dari satu periode hidup. Gunakan dukungan profesional untuk concerns yang menyentuh kesehatan, fungsi, atau keselamatan.</p>
      </section>

      <section className="legal-grid page-shell">
        {disclaimerSections.map((section) => (
          <article className="legal-card" data-number={section.number} key={section.number}>
            <span>{section.number}</span>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="legal-emergency page-shell" role="note">
        <span aria-hidden="true">!</span>
        <div>
          <strong>URGENT SAFETY NOTE</strong>
          <p>Saat keselamatan terasa terancam, hubungi layanan darurat setempat, tenaga kesehatan, atau orang tepercaya yang dapat hadir bersamamu sekarang.</p>
        </div>
      </section>

      <section className="legal-closing">
        <div className="page-shell">
          <span>TERAKHIR DIPERBARUI · 27 AGUSTUS 2026</span>
          <h2>Refleksi yang kuat berjalan bersama konteks, kehati-hatian, dan support.</h2>
          <a className="outline-light-button" href={sitePath()}>Kembali ke Fallow Diagnostic →</a>
        </div>
      </section>

      <footer className="site-footer legal-site-footer">
        <div className="page-shell">
          <div className="footer-identity">
            <span>© 2026 Pearling Lim. All Rights Reserved</span>
            <span>THE FALLOW DIAGNOSTIC · BY PEARLING</span>
          </div>
          <nav className="footer-links" aria-label="Legal">
            <a href={sitePath("privacy/")}>Privacy Policy</a>
            <a aria-current="page" href={sitePath("disclaimer/")}>Disclaimer</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
