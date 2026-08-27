import type { Metadata } from "next";
import { sitePath } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "Privacy Policy | The Fallow Diagnostic",
  description: "Kebijakan privasi The Fallow Diagnostic.",
};

const privacySections = [
  {
    number: "01",
    title: "Data yang kamu masukkan",
    body: "Nama panggilan, pilihan skor, serta catatan rencana investigasi menjadi data yang kamu berikan selama menggunakan tool ini.",
  },
  {
    number: "02",
    title: "Cara data digunakan",
    body: "Data tersebut diproses di dalam halaman untuk personalisasi, perhitungan skor, serta penyusunan pengalaman refleksi yang tampil di layar.",
  },
  {
    number: "03",
    title: "Penyimpanan selama sesi",
    body: "Pada versi saat ini, data input berada di memori halaman selama sesi tab aktif. Menutup atau menyegarkan halaman memulai sesi baru.",
  },
  {
    number: "04",
    title: "Data teknis",
    body: "Penyedia hosting dapat memproses alamat IP, tipe perangkat, browser, waktu akses, serta log keamanan untuk operasional, perlindungan, dan kinerja layanan.",
  },
  {
    number: "05",
    title: "Penyedia layanan",
    body: "Pengelola dapat melibatkan penyedia infrastruktur yang memproses data sesuai peran layanannya. Penggunaan browser dan layanan hosting juga mengikuti kebijakan penyedia terkait.",
  },
  {
    number: "06",
    title: "Pilihanmu",
    body: "Kamu dapat menghentikan sesi, menutup halaman, atau menyegarkan halaman untuk memulai pengisian baru. Pertanyaan terkait privasi dapat disampaikan melalui kanal kontak resmi Pearling Lim.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="legal-brand" href={sitePath()}>
          <span>THE FALLOW DIAGNOSTIC</span>
          <em>by Pearling</em>
        </a>
        <a className="legal-back" href={sitePath()}>← Kembali ke assessment</a>
      </header>

      <section className="legal-hero page-shell">
        <div className="legal-folio">POLICY / 01</div>
        <div>
          <span className="section-kicker">PRIVACY POLICY</span>
          <h1>Privasi yang ringkas dan jelas.</h1>
        </div>
        <p>
          Kebijakan ini menjelaskan data yang muncul selama penggunaan The Fallow Diagnostic, cara pemrosesannya, serta pilihan yang tersedia bagimu.
        </p>
      </section>

      <section className="legal-notice page-shell" role="note">
        <strong>QUICK READ</strong>
        <p>Input refleksimu digunakan untuk pengalaman di layar selama sesi aktif. Isi hanya informasi yang terasa nyaman untuk kamu tuliskan.</p>
      </section>

      <section className="legal-grid page-shell">
        {privacySections.map((section) => (
          <article className="legal-card" data-number={section.number} key={section.number}>
            <span>{section.number}</span>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="legal-closing">
        <div className="page-shell">
          <span>TERAKHIR DIPERBARUI · 27 AGUSTUS 2026</span>
          <h2>Gunakan ruang ini dengan sadar, perlahan, dan sesuai kenyamananmu.</h2>
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
            <a aria-current="page" href={sitePath("privacy/")}>Privacy Policy</a>
            <a href={sitePath("disclaimer/")}>Disclaimer</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
