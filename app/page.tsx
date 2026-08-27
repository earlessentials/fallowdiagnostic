"use client";

import { useMemo, useState, type FormEvent } from "react";
import { sitePath } from "@/lib/site-path";

type PatternId = "A" | "B" | "C" | "D";
type View = "intro" | "assessment" | "profile" | "investigation";

type Pattern = {
  id: PatternId;
  title: string;
  profileTitle: string;
  focus: string;
  quote: string;
  questions: string[];
};

const patterns: Pattern[] = [
  {
    id: "A",
    title: "DEPLETION / BURNOUT-LIKE PATTERN",
    profileTitle: "Depletion / Burnout-Like",
    focus: "CAPACITY",
    quote:
      "“Aku masih menginginkan sebagian besar hidup ini, sementara kapasitas untuk menopangnya sedang terkuras.”",
    questions: [
      "Ketika membayangkan mendapatkan istirahat, dukungan, dan beban kerja yang jauh lebih manusiawi, sebagian besar pekerjaanku masih terasa worth returning to.",
      "Masalah utamaku terasa lebih dekat dengan kekurangan energi daripada kehilangan seluruh ketertarikan terhadap arah hidupku.",
      "Aku masih peduli pada hasil pekerjaanku, sementara tuntutan untuk terus mempertahankan performa terasa semakin sulit ditopang.",
      "Jadwal yang lebih ringan, tidur yang lebih baik, lebih sedikit responsibility, atau periode recovery terasa seperti sesuatu yang mungkin mengubah kondisiku secara signifikan.",
      "Aku sering merasa emotionally atau physically exhausted setelah memenuhi tuntutan yang sebelumnya masih mampu kutangani.",
      "Fantasiku tentang “kabur” lebih banyak berisi keinginan untuk berhenti menanggung beban daripada keinginan menjadi orang yang sepenuhnya berbeda.",
    ],
  },
  {
    id: "B",
    title: "DRIFT / LOSS OF ACTIVE CHOICE",
    profileTitle: "Drift",
    focus: "CHOICE",
    quote:
      "“Hidupku terus bergerak, sementara aku sudah lama berhenti benar-benar memilih arahnya.”",
    questions: [
      "Aku kesulitan menjelaskan kenapa aku masih menjalani beberapa bagian hidupku selain karena “ya sudah terlanjur begini.”",
      "Banyak keputusan sehari-hariku ditentukan oleh habit, convenience, expectation, atau circumstance dibandingkan pilihan yang benar-benar kuperiksa kembali.",
      "Aku punya beberapa hal yang sebenarnya masih ingin kukejar, sementara aku jarang menciptakan struktur yang membuatnya benar-benar terjadi.",
      "Hidupku terasa lebih autopilot daripada actively chosen, dan aku sudah cukup lama menunda keputusan yang sebenarnya bisa dibuat.",
      "Ketika memiliki waktu kosong, aku cenderung mengisinya dengan distraction atau passive consumption daripada exploration yang disengaja.",
      "Aku sering menunggu motivation, clarity, atau “waktu yang tepat” sebelum mengambil langkah yang sebenarnya cukup kecil dan reversible.",
    ],
  },
  {
    id: "C",
    title: "FALLOW / IDENTITY DISSOLUTION",
    profileTitle: "Fallow / Identity Dissolution",
    focus: "ALLEGIANCE",
    quote:
      "“Kemampuanku mungkin masih ada. Kesetiaanku pada arah lama terus melemah.”",
    questions: [
      "Aku masih mampu melakukan banyak hal yang selama ini kulakukan dengan baik, sementara keinginan untuk terus melakukannya semakin sulit ditemukan.",
      "Pencapaian atau peluang yang dulu terasa exciting sekarang lebih sering terasa seperti maintenance terhadap kehidupan yang sudah kubangun.",
      "Aku merasakan kelegaan yang mengejutkan ketika commitment, project, invitation, atau responsibility tertentu selesai atau dibatalkan.",
      "Aku semakin sulit membayangkan conventional “next level” dari hidupku dan merasa sedikit appetite untuk mengejarnya.",
      "Aku mulai mempertanyakan role, reputation, career, brand, ambition, atau identitas yang selama ini sangat melekat pada cara orang mengenalku.",
      "Kalau seluruh kebutuhan finansialku aman dan tak ada seorang pun yang kecewa, aku masih meragukan apakah aku ingin kembali menjalani hidup yang sama persis.",
    ],
  },
  {
    id: "D",
    title: "BROADER WELLBEING CONCERN",
    profileTitle: "Broader Wellbeing Concern",
    focus: "WELLBEING",
    quote:
      "“Perubahannya terasa lebih luas daripada satu pekerjaan, identitas, atau arah hidup.”",
    questions: [
      "Kehilangan interest atau pleasure terasa meluas ke banyak hal yang biasanya bisa kunikmati, termasuk area di luar pekerjaan atau achievement.",
      "Mood, energi, tidur, nafsu makan, konsentrasi, atau kemampuan menjalankan kehidupan sehari-hari mengalami perubahan yang cukup berarti.",
      "Perasaan kosong, hopeless, numb, sangat irritable, atau emotionally heavy muncul secara persisten dan sulit dijelaskan hanya melalui satu area kehidupan.",
      "Bahkan ketika tuntutan berkurang atau aku mendapat waktu untuk beristirahat, kondisiku tetap terasa sangat berat.",
      "Aku semakin menarik diri dari relationship, aktivitas, atau hal-hal yang biasanya memiliki makna bagiku.",
      "Aku merasa kondisi ini sudah cukup mengganggu functioning atau kualitas hidup sehingga dukungan profesional terasa layak dipertimbangkan.",
    ],
  },
];

const initialAnswers: Record<PatternId, Array<number | null>> = {
  A: [null, null, null, null, null, null],
  B: [null, null, null, null, null, null],
  C: [null, null, null, null, null, null],
  D: [null, null, null, null, null, null],
};

const scoreMeanings = [
  ["1", "Sedikit / jarang"],
  ["2", "Kadang-kadang"],
  ["3", "Sering / cukup kuat"],
  ["4", "Sangat kuat / hampir selalu"],
];

const scoreTones: Record<number, string> = {
  1: "sedikit",
  2: "kadang-kadang",
  3: "sering",
  4: "sangat kuat",
};

const interpretationRows = [
  ["0–6", "LOW", "Pola ini kurang menonjol berdasarkan jawabanmu saat ini."],
  [
    "7–12",
    "PRESENT",
    "Beberapa elemen pola ini muncul dan layak diperhatikan bersama konteks lain.",
  ],
  [
    "13–18",
    "STRONG",
    "Pola ini cukup kuat dan kemungkinan menjelaskan bagian penting dari pengalaman “stuck”-mu.",
  ],
  [
    "19–24",
    "VERY STRONG",
    "Pola ini sangat dominan dan layak mendapatkan investigasi atau respons yang lebih intentional.",
  ],
];

const mixedPatterns = [
  [
    "Depletion + Fallow",
    "Kamu mungkin kelelahan sekaligus kehilangan allegiance terhadap arah lama. Recovery tetap penting karena keputusan besar lebih jernih ketika kapasitas membaik.",
  ],
  [
    "Depletion + Drift",
    "Kapasitas rendah mungkin membuat active choice semakin sulit, lalu autopilot mengambil alih.",
  ],
  [
    "Fallow + Drift",
    "Kamu tahu sesuatu sudah selesai, sementara arah baru belum cukup jelas sehingga hidup menggantung dalam inertia.",
  ],
  [
    "Fallow + Wellbeing Concern",
    "Identity dissolution dan psychological difficulty mungkin terjadi bersamaan; jangan memaksa salah satunya menjelaskan semuanya.",
  ],
  [
    "Drift + Wellbeing Concern",
    "Kesulitan functioning atau mood dapat memperbesar inertia, sehingga “kurang disiplin” menjadi penjelasan yang terlalu dangkal.",
  ],
  [
    "Semua Tinggi",
    "Sistem hidupmu mungkin sedang berada di bawah tekanan dari beberapa arah sekaligus. Prioritaskan stabilization dan support sebelum memaksa keputusan identitas besar.",
  ],
];

const lifeAreas = [
  "Career / Work",
  "Business / Brand",
  "Relationships",
  "Creative Life",
  "Lifestyle",
  "Ambition / Future Goals",
];

const planPrompts = [
  "Pola dengan skor tertinggi:",
  "Pola kedua yang juga perlu diperhatikan:",
  "Hal yang sekarang terasa jauh lebih jelas tentang periode “stuck”-ku:",
  "Satu penjelasan yang selama ini terlalu cepat kupercaya:",
  "Hal yang paling layak kuinvestigasi sebelum membuat keputusan besar:",
];

function getSignal(score: number) {
  if (score <= 6) return "LOW";
  if (score <= 12) return "PRESENT";
  if (score <= 18) return "STRONG";
  return "VERY STRONG";
}

export default function Home() {
  const [view, setView] = useState<View>("intro");
  const [activePattern, setActivePattern] = useState(0);
  const [answers, setAnswers] =
    useState<Record<PatternId, Array<number | null>>>(initialAnswers);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [planAnswers, setPlanAnswers] = useState(["", "", "", "", ""]);

  const scores = useMemo(
    () =>
      patterns.reduce(
        (result, pattern) => {
          result[pattern.id] = answers[pattern.id].reduce<number>(
            (sum, answer) => sum + (answer ?? 0),
            0,
          );
          return result;
        },
        {} as Record<PatternId, number>,
      ),
    [answers],
  );

  const highestScore = Math.max(...Object.values(scores));
  const highestPatterns = patterns.filter(
    (pattern) => scores[pattern.id] === highestScore,
  );

  const scrollHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeView = (nextView: View) => {
    setMessage("");
    setView(nextView);
    scrollHome();
  };

  const setAnswer = (pattern: PatternId, index: number, value: number) => {
    setMessage("");
    setAnswers((current) => ({
      ...current,
      [pattern]: current[pattern].map((answer, answerIndex) =>
        answerIndex === index ? value : answer,
      ),
    }));
  };

  const handleAssessmentNext = () => {
    const pattern = patterns[activePattern];
    if (answers[pattern.id].some((answer) => answer === null)) {
      setMessage("Jawab semua pernyataan sebelum melanjutkan.");
      return;
    }

    if (activePattern < patterns.length - 1) {
      setActivePattern((current) => current + 1);
      setMessage("");
      scrollHome();
    } else {
      changeView("profile");
    }
  };

  const startAssessment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setNameMessage("Tulis namamu untuk memulai pengalaman ini.");
      return;
    }

    setName(cleanName);
    setNameMessage("");
    changeView("assessment");
  };

  const openInvestigation = () => {
    setPlanAnswers((current) => {
      const next = [...current];
      if (!next[0]) {
        next[0] = highestPatterns.map((pattern) => pattern.profileTitle).join(" + ");
      }
      return next;
    });
    changeView("investigation");
  };

  const resetAssessment = () => {
    setAnswers(initialAnswers);
    setActivePattern(0);
    setMessage("");
    setPlanAnswers(["", "", "", "", ""]);
    setView("intro");
    scrollHome();
  };

  const progress =
    view === "intro"
      ? 0
      : view === "assessment"
        ? ((activePattern + 1) / 6) * 100
        : view === "profile"
          ? (5 / 6) * 100
          : 100;

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={() => changeView("intro")}>
          <span className="brand-title">THE FALLOW DIAGNOSTIC</span>
          <span className="brand-issue">by Pearling</span>
        </button>
        <div className="header-step">
          {name && view !== "intro" && <span className="user-chip">FOR {name}</span>}
          <span>{view === "investigation" ? "PAGE 2" : "PAGE 1"}</span>
          <div className="header-progress" aria-label="Progress assessment">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      <aside className="reflection-strip" role="note" aria-label="Pengingat penggunaan">
        <span aria-hidden="true">✦</span>
        <strong>RUANG REFLEKSI</strong>
        <span>HASIL INDIKATIF</span>
        <span>DUKUNGAN PROFESIONAL SAAT DIBUTUHKAN</span>
      </aside>

      {view === "intro" && (
        <>
          <section className="hero page-shell">
            <div className="hero-folio" aria-hidden="true">
              <span>SELF-INQUIRY · VOL. 01</span>
              <span>FOR THE IN-BETWEEN</span>
            </div>
            <div className="hero-copy">
              <div className="eyebrow">THE FALLOW DIAGNOSTIC</div>
              <h1>
                Apa sebenarnya yang sedang terjadi ketika kamu merasa <em>“stuck”?</em>
              </h1>
              <p className="hero-purpose">
                <strong>Tujuan:</strong> Membantu kamu mengidentifikasi pola dominan di balik periode kehilangan momentum, apakah pengalamanmu lebih menyerupai Depletion/Burnout, Drift, Fallow/Identity Dissolution, atau Broader Wellbeing Concern, serta menentukan area mana yang layak diperiksa lebih dalam.
              </p>
              <form className="name-card" onSubmit={startAssessment}>
                <div className="name-card-heading">
                  <span className={name.trim() ? "live-name" : ""}>
                    {name.trim() ? `THIS ONE’S FOR ${name.trim()}` : "PERSONALISE YOUR EXPERIENCE"}
                  </span>
                  <small>01 / NAME</small>
                </div>
                <div className="name-field-row">
                  <label>
                    <span className="sr-only">Namamu</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        setNameMessage("");
                      }}
                      placeholder="Tulis namamu"
                      autoComplete="name"
                      maxLength={80}
                    />
                  </label>
                  <button className="primary-button" type="submit">
                    Mulai diagnostic <span aria-hidden="true">→</span>
                  </button>
                </div>
                {nameMessage && <span className="name-message">{nameMessage}</span>}
                <p className="start-acknowledgement">
                  Menekan “Mulai diagnostic” menandakan pemahaman bahwa hasil ini merupakan bahan refleksi personal. Baca <a href={sitePath("privacy/")}>Privacy Policy</a> dan <a href={sitePath("disclaimer/")}>Disclaimer</a>.
                </p>
              </form>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="hero-orbit" />
              <span className="hero-art-word">STUCK?</span>
              <div className="hero-pattern-stack">
                {patterns.map((pattern, index) => (
                  <span key={pattern.id}>
                    <b>{pattern.id}</b>
                    {pattern.focus}
                    <i>0{index + 1}</i>
                  </span>
                ))}
              </div>
              <span className="hero-scribble">↳ {name.trim() ? `for ${name.trim()}` : "start here"}</span>
            </div>
          </section>

          <div className="editorial-ribbon" aria-hidden="true">
            <div>
              <span>DEPLETION</span><i>✦</i><span>DRIFT</span><i>✦</i><span>FALLOW</span><i>✦</i><span>WELLBEING</span><i>✦</i><span>A REFLECTION — A BETTER QUESTION</span>
            </div>
          </div>

          <section className="important-banner page-shell">
            <span className="important-label">Reflection note</span>
            <p>
              Fallow adalah framework reflektif dalam masterclass ini. Hasil assessment menggambarkan pola jawabanmu selama 4–8 minggu terakhir dan berfungsi sebagai bahan eksplorasi. Diagnosis burnout, depresi, serta kondisi kesehatan mental berada dalam ranah profesional berkualifikasi. Beberapa pola dapat muncul bersamaan. Saat perubahan mood, pleasure, hope, fungsi sehari-hari, tidur, nafsu makan, konsentrasi, atau keselamatan diri mulai mengkhawatirkan, sertakan assessment profesional dalam langkah berikutnya.
            </p>
          </section>

          <section className="intro-grid page-shell">
            <div className="intro-copy">
              <div className="section-kicker">PAGE 1</div>
              <h2>WHAT KIND OF “STUCK” IS THIS?</h2>
              <h3>Cara Mengisi</h3>
              <p>
                Jawab berdasarkan pengalamanmu selama 4–8 minggu terakhir, lalu beri skor pada setiap pernyataan berdasarkan seberapa kuat pernyataan tersebut menggambarkan kondisimu sekarang.
              </p>
              <p className="reality-note">
                Jawab berdasarkan apa yang benar-benar kamu lakukan, jangan berdasarkan versi dirimu yang ingin kamu percaya.
              </p>
            </div>

            <div className="score-key-card">
              <div className="score-key-stamp" aria-hidden="true">YOUR SCALE</div>
              <div className="table-heading">
                <span>Skor</span>
                <span>Arti</span>
              </div>
              {scoreMeanings.map(([score, meaning]) => (
                <div className="score-key-row" key={score}>
                  <span>{score}</span>
                  <span>{meaning}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {view === "assessment" && (
        <AssessmentView
          pattern={patterns[activePattern]}
          patternIndex={activePattern}
          answers={answers[patterns[activePattern].id]}
          score={scores[patterns[activePattern].id]}
          name={name}
          message={message}
          onAnswer={setAnswer}
          onBack={() => {
            if (activePattern === 0) changeView("intro");
            else {
              setActivePattern((current) => current - 1);
              setMessage("");
              scrollHome();
            }
          }}
          onNext={handleAssessmentNext}
        />
      )}

      {view === "profile" && (
        <ProfileView
          scores={scores}
          highestPatterns={highestPatterns}
          name={name}
          onBack={() => {
            setActivePattern(3);
            changeView("assessment");
          }}
          onNext={openInvestigation}
        />
      )}

      {view === "investigation" && (
        <InvestigationView
          scores={scores}
          highestPatterns={highestPatterns}
          name={name}
          planAnswers={planAnswers}
          onPlanAnswer={(index, value) =>
            setPlanAnswers((current) =>
              current.map((answer, answerIndex) =>
                answerIndex === index ? value : answer,
              ),
            )
          }
          onBack={() => changeView("profile")}
          onReset={resetAssessment}
        />
      )}
      <footer className="site-footer">
        <div className="page-shell">
          <div className="footer-identity">
            <span>© 2026 Pearling Lim. All Rights Reserved</span>
            <span>THE FALLOW DIAGNOSTIC · BY PEARLING</span>
          </div>
          <nav className="footer-links" aria-label="Legal">
            <a href={sitePath("privacy/")}>Privacy Policy</a>
            <a href={sitePath("disclaimer/")}>Disclaimer</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

function AssessmentView({
  pattern,
  patternIndex,
  answers,
  score,
  name,
  message,
  onAnswer,
  onBack,
  onNext,
}: {
  pattern: Pattern;
  patternIndex: number;
  answers: Array<number | null>;
  score: number;
  name: string;
  message: string;
  onAnswer: (pattern: PatternId, index: number, value: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <section className="assessment page-shell">
      <div className="assessment-topline">
        <span>PAGE 1 — WHAT KIND OF “STUCK” IS THIS?</span>
        <span>{name} · {patternIndex + 1} / 4</span>
      </div>

      <div className="pattern-journey" aria-label="Progress kategori diagnostic">
        {patterns.map((item, index) => {
          const state = index < patternIndex ? "complete" : index === patternIndex ? "current" : "upcoming";
          return (
            <div className={state} key={item.id}>
              <span>{item.id}</span>
              <div>
                <strong>{item.focus}</strong>
                <small>{state === "complete" ? "SELESAI" : state === "current" ? "SEKARANG" : "BERIKUTNYA"}</small>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="inline-reminder" role="note">
        <span>CHECK-IN</span>
        <p>Jawabanmu memetakan pengalaman subjektif dalam satu periode waktu. Beri ruang bagi hasil untuk berubah seiring kondisi, konteks, dan dukungan.</p>
      </aside>

      <div className="pattern-heading" data-pattern={pattern.id}>
        <span className="pattern-letter">{pattern.id}</span>
        <div>
          <span className="pattern-side-note">READ SLOWLY / ANSWER HONESTLY</span>
          <h1>{pattern.title}</h1>
          <p>{pattern.quote}</p>
        </div>
      </div>

      <div className="question-table-heading" aria-hidden="true">
        <span>#</span>
        <span>Pernyataan</span>
        <span>1–4</span>
      </div>

      <div className="question-list">
        {pattern.questions.map((question, index) => (
          <fieldset className={`question-card ${answers[index] !== null ? "answered" : ""}`} key={question}>
            <legend className="sr-only">Pernyataan {index + 1}</legend>
            <span className="question-number">{index + 1}</span>
            <p>{question}</p>
            <div className="score-options">
              {[1, 2, 3, 4].map((value) => (
                <label
                  className={answers[index] === value ? "selected" : ""}
                  data-tone={scoreTones[value]}
                  key={value}
                >
                  <input
                    type="radio"
                    name={`${pattern.id}-${index}`}
                    value={value}
                    checked={answers[index] === value}
                    onChange={() => onAnswer(pattern.id, index, value)}
                  />
                  <span aria-label={`${value} — ${scoreTones[value]}`}>{value}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="assessment-total">
        <span>TOTAL {pattern.id}:</span>
        <strong>{score} / 24</strong>
      </div>

      <div className="assessment-navigation">
        <button className="text-button" onClick={onBack}>
          ← Kembali
        </button>
        <div className="next-area">
          {message && <span className="form-message">{message}</span>}
          <button className="primary-button" onClick={onNext}>
            {patternIndex === 3 ? "Lihat profile" : "Kategori berikutnya"} →
          </button>
        </div>
      </div>
    </section>
  );
}

function ProfileView({
  scores,
  highestPatterns,
  name,
  onBack,
  onNext,
}: {
  scores: Record<PatternId, number>;
  highestPatterns: Pattern[];
  name: string;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <section className="profile page-shell">
      <div className="profile-folio">
        <div className="section-kicker">PAGE 1 · HASIL</div>
        <span aria-hidden="true">PROFILE / A WORKING HYPOTHESIS</span>
      </div>
      <h1>
        YOUR FALLOW DIAGNOSTIC PROFILE
        <span className="profile-name">{name}</span>
      </h1>

      <aside className="inline-reminder result-reminder" role="note">
        <span>READ WITH CARE</span>
        <p>Angka ini menggambarkan pola jawabanmu hari ini. Gunakan sebagai arah investigasi dan bawa concerns terkait wellbeing kepada profesional berkualifikasi.</p>
      </aside>

      <div className="profile-table">
        <div className="profile-row profile-table-heading">
          <span>Pattern</span>
          <span>Skor</span>
          <span>Persentase</span>
        </div>
        {patterns.map((pattern) => {
          const score = scores[pattern.id];
          const isHighest = highestPatterns.some((item) => item.id === pattern.id);
          return (
            <div className={`profile-row ${isHighest ? "highest" : ""}`} key={pattern.id}>
              <span>
                <b>{pattern.id}</b> — {pattern.profileTitle}
              </span>
              <span>{score} / 24</span>
              <span className="profile-percentage">
                <span>{Math.round((score / 24) * 100)}%</span>
                <i style={{ width: `${(score / 24) * 100}%` }} />
              </span>
            </div>
          );
        })}
      </div>

      <div className="formula-card">
        <span>Rumus:</span>
        <strong>Skor ÷ 24 × 100 = persentase</strong>
      </div>

      <p className="profile-explanation">
        Assessment ini sengaja menghasilkan profile. Kamu bisa memiliki skor tinggi pada Fallow sekaligus Depletion karena kehilangan allegiance terhadap arah lama dan kelelahan akibat mempertahankannya dapat terjadi bersamaan. Kamu juga bisa mengalami Fallow bersamaan dengan mental-health difficulties, sehingga setiap kategori tetap membawa informasi yang relevan.
      </p>

      <div className="assessment-navigation">
        <button className="text-button" onClick={onBack}>
          ← Kembali
        </button>
        <button className="primary-button" onClick={onNext}>
          What deserves investigation? →
        </button>
      </div>
    </section>
  );
}

function InvestigationView({
  scores,
  highestPatterns,
  name,
  planAnswers,
  onPlanAnswer,
  onBack,
  onReset,
}: {
  scores: Record<PatternId, number>;
  highestPatterns: Pattern[];
  name: string;
  planAnswers: string[];
  onPlanAnswer: (index: number, value: string) => void;
  onBack: () => void;
  onReset: () => void;
}) {
  const strongestIds = new Set(highestPatterns.map((pattern) => pattern.id));

  return (
    <div className="investigation">
      <section className="investigation-hero page-shell">
        <span className="investigation-page-number" aria-hidden="true">02</span>
        <div className="section-kicker light">PAGE 2 · FOR {name.toUpperCase()}</div>
        <h1>WHAT DESERVES INVESTIGATION?</h1>
        <div className="mini-profile">
          {patterns.map((pattern) => (
            <div className={strongestIds.has(pattern.id) ? "active" : ""} key={pattern.id}>
              <span>{pattern.id}</span>
              <strong>{scores[pattern.id]}</strong>
              <small>{getSignal(scores[pattern.id])}</small>
            </div>
          ))}
        </div>
        <aside className="hero-reminder" role="note">
          <strong>REFLECTION REMINDER</strong>
          <span>Eksperimen di halaman ini mendukung eksplorasi pribadi. Untuk perubahan fungsi, distress, gejala fisik, atau risiko keselamatan, prioritaskan dukungan profesional dan bantuan segera.</span>
        </aside>
      </section>

      <section className="content-section page-shell">
        <div className="section-number">STEP 1</div>
        <div className="section-content">
          <h2>BACA POLANYA, JANGAN CUMA CARI LABELNYA</h2>
          <p>Gunakan interpretasi berikut untuk masing-masing kategori.</p>
          <div className="interpretation-table">
            <div className="interpretation-row interpretation-heading">
              <span>Skor</span>
              <span>Signal</span>
              <span>Artinya</span>
            </div>
            {interpretationRows.map(([range, signal, meaning]) => (
              <div className="interpretation-row" key={range}>
                <strong>{range}</strong>
                <span className="signal-pill">{signal}</span>
                <span>{meaning}</span>
              </div>
            ))}
          </div>
          <p className="pull-quote">
            Skor tertinggi adalah hypothesis. Gunakan hasilnya untuk menentukan pertanyaan berikutnya, karena dua orang dengan skor Fallow yang sama bisa membutuhkan respons yang sangat berbeda.
          </p>
        </div>
      </section>

      <PatternInvestigation
        id="A"
        focus="INVESTIGATE CAPACITY"
        active={strongestIds.has("A")}
        score={scores.A}
      >
        <p className="lead-question">
          Pertanyaan utamanya “Dalam kondisi seperti apa aku masih mampu menginginkannya?”
        </p>
        <p>
          Sebelum membuat keputusan identitas besar, investigasikan workload, recovery, sleep, emotional labor, responsibility load, autonomy, conflict, resource, support, dan struktur kerja. Cari tahu apakah desire benar-benar menghilang atau tertimbun di bawah tuntutan yang terlalu besar.
        </p>
        <ThoughtExperiment title="THE RECOVERY THOUGHT EXPERIMENT">
          <p>
            Bayangkan kamu mendapatkan empat minggu dengan tidur cukup, beban berkurang, tekanan finansial terkendali, dan jauh lebih sedikit tuntutan terhadapmu.
          </p>
          <p>Lalu tanyakan:</p>
          <blockquote>
            Bagian hidup mana yang ingin kudatangi kembali setelah kapasitas pulih, dan bagian mana yang tetap membuatku ingin menjauh?
          </blockquote>
          <p>
            Kalau desire mulai terlihat ketika depletion berkurang, kamu baru saja mendapatkan informasi penting.
          </p>
        </ThoughtExperiment>
      </PatternInvestigation>

      <PatternInvestigation
        id="B"
        focus="INVESTIGATE CHOICE"
        active={strongestIds.has("B")}
        score={scores.B}
      >
        <p className="lead-question">
          Kamu mungkin membutuhkan lebih sedikit introspeksi dan lebih banyak friction dengan realitas.
        </p>
        <p>
          Drift sering menjadi semakin kuat ketika seseorang terus menunggu clarity sebelum bergerak, padahal clarity sendiri sering muncul setelah behavior menghasilkan data.
        </p>
        <div className="investigate-list">
          <strong>Investigasi:</strong>
          <ul>
            <li>keputusan apa yang sudah terlalu lama ditunda,</li>
            <li>struktur apa yang hilang,</li>
            <li>distraction apa yang menghabiskan ruang eksplorasi,</li>
            <li>pilihan apa yang sebenarnya sudah tersedia,</li>
            <li>eksperimen kecil apa yang bisa dilakukan minggu ini.</li>
          </ul>
        </div>
        <p>Pertanyaan utamanya:</p>
        <blockquote>
          Kalau aku berhenti menunggu motivation dan hanya perlu membuat satu pilihan aktif minggu ini, pilihan apa yang paling mengubah arah autopilot-ku?
        </blockquote>
      </PatternInvestigation>

      <PatternInvestigation
        id="C"
        focus="INVESTIGATE ALLEGIANCE"
        active={strongestIds.has("C")}
        score={scores.C}
      >
        <p className="lead-question">
          Holy shit, mungkin masalahnya memang lebih dalam daripada produktivitas.
        </p>
        <p>
          Kalau kompetensi masih relatif utuh sementara desire terhadap arah lama terus melemah, investigasikan identity maintenance.
        </p>
        <p>
          Tanyakan apa yang sebenarnya kamu pertahankan ketika mempertahankan kehidupan lama: income, reputation, approval, belonging, status, sunk cost, predictability, atau rasa aman karena masih tahu cara menjelaskan siapa dirimu.
        </p>
        <CompetenceDesireCheck />
        <p>
          Lingkari area dengan kompetensi tinggi + desire rendah + maintenance cost tinggi.
        </p>
        <p>Itulah wilayah yang paling layak diperiksa.</p>
        <p>Pertanyaannya:</p>
        <blockquote>
          Apa yang masih bisa kulakukan dengan sangat baik, sementara aku sudah semakin sedikit menginginkan kehidupan yang kemampuan itu terus ciptakan?
        </blockquote>
      </PatternInvestigation>

      <PatternInvestigation
        id="D"
        focus="INVESTIGATE WELLBEING BEFORE ROMANTICIZING THE VOID"
        active={scores.D >= 13}
        score={scores.D}
      >
        <p>
          Fallow bisa menjadi framework yang meaningful, sementara pengalaman yang meluas ke mood, pleasure, cognition, functioning, sleep, appetite, hope, atau keselamatan diri layak mendapatkan perhatian yang lebih luas daripada identity work saja.
        </p>
        <p>
          Gunakan skor ini sebagai alasan untuk mempertimbangkan dukungan yang sesuai, termasuk tenaga kesehatan atau profesional kesehatan mental ketika relevan. Kamu tetap boleh mengeksplorasi pertanyaan identitas sambil mendapatkan support.
        </p>
        <p className="lead-question">
          Kedalaman spiritual dan psychological support bisa hidup dalam ruangan yang sama.
        </p>
        <div className="safety-note">
          Kalau muncul pikiran untuk menyakiti diri, keinginan untuk mengakhiri hidup, atau rasa keselamatanmu terancam, prioritaskan bantuan segera dari layanan darurat setempat, tenaga kesehatan, atau seseorang yang dapat hadir bersamamu secara langsung.
        </div>
      </PatternInvestigation>

      <section className="content-section map-section page-shell">
        <div className="section-number">MAP</div>
        <div className="section-content">
          <h2>THE MIXED-PATTERN MAP</h2>
          <p>Hasil paling menarik sering muncul ketika dua kategori sama-sama tinggi.</p>
          <div className="mixed-table">
            <div className="mixed-row mixed-heading">
              <span>Kombinasi</span>
              <span>Yang Mungkin Layak Diselidiki</span>
            </div>
            {mixedPatterns.map(([combination, meaning]) => (
              <div className="mixed-row" key={combination}>
                <strong>{combination}</strong>
                <span>{meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="restored-section">
        <div className="page-shell restored-inner">
          <div className="section-kicker light">THOUGHT EXPERIMENT</div>
          <h2>THE “IF I WERE RESTORED TOMORROW” TEST</h2>
          <p>Sekarang gunakan satu thought experiment terakhir.</p>
          <p>
            Bayangkan besok pagi kamu bangun dengan energi yang jauh lebih baik. Tidurmu terasa cukup. Pikiranmu jernih. Tubuhmu terasa lebih ringan. Financial panic untuk sementara terangkat. Kamu memiliki ruang bebas dari tuntutan jawaban tentang masa depanmu.
          </p>
          <p>Lalu bayangkan seseorang berkata:</p>
          <blockquote>
            “Great. Sekarang kamu bisa kembali menjalani kehidupanmu persis seperti sebelumnya.”
          </blockquote>
          <p>Perhatikan responsmu.</p>
          <div className="response-grid">
            <p><strong>Relief</strong> bisa menjadi signal bahwa recovery memang sangat kamu rindukan.</p>
            <p><strong>Dread</strong> layak membuatmu menyelidiki arah hidup itu sendiri.</p>
            <p><strong>Confusion</strong> mungkin menunjukkan bahwa kamu membutuhkan exploration.</p>
            <p><strong>Emptiness</strong> yang tetap meluas ke hampir semua hal layak membuatmu mempertimbangkan broader wellbeing support.</p>
          </div>
          <p className="restored-final">Responsmu adalah data</p>
        </div>
      </section>

      <section className="plan-section page-shell">
        <div className="section-kicker">WRITE IT DOWN</div>
        <h2>THE INVESTIGATION PLAN</h2>
        <p>Selesaikan lima kalimat berikut berdasarkan hasil assessment-mu.</p>
        <div className="plan-form">
          {planPrompts.map((label, index) => (
            <label key={label}>
              <span>{label}</span>
              <textarea
                value={planAnswers[index]}
                onChange={(event) => onPlanAnswer(index, event.target.value)}
                rows={2}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="final-diagnostic">
        <div className="page-shell final-inner">
          <span className="final-folio" aria-hidden="true">END NOTE / 02</span>
          <div className="section-kicker light">THE FINAL DIAGNOSTIC</div>
          <h2>Tujuan The Fallow Diagnostic membuat pertanyaanmu lebih presisi.</h2>
          <p className="big-line">Karena “aku stuck” masih menyisakan banyak pertanyaan.</p>
          <p>
            Kamu bisa stuck karena tubuh dan pikiranmu sudah terlalu lama menanggung beban. Kamu bisa stuck karena hidup berjalan di atas autopilot. Kamu bisa stuck karena identitas yang masih berfungsi sudah kehilangan psychological allegiance. Kamu bisa mengalami perubahan wellbeing yang membutuhkan perhatian lebih luas. Kamu juga bisa mengalami beberapa hal tersebut sekaligus.
          </p>
          <p>
            Respons yang cerdas dimulai ketika kamu berhenti memberi semua pengalaman itu treatment yang sama.
          </p>
          <p>
            Kadang kamu membutuhkan recovery. Kadang kamu membutuhkan structure. Kadang kamu membutuhkan support. Kadang kamu perlu berhenti memaksa kehidupan lama kembali terasa hidup.
          </p>
          <div className="final-question">
            <blockquote>
              “Apa sebenarnya yang sedang terjadi di sini, dan bukti apa yang masih perlu kukumpulkan sebelum aku mengubah hidupku berdasarkan jawabannya?”
            </blockquote>
          </div>
          <aside className="final-safety-note" role="note">
            <strong>ONE LAST CHECK-IN</strong>
            <p>Hasil ini merupakan bahan refleksi personal. Untuk distress, perubahan fungsi, kekhawatiran kesehatan, atau risiko keselamatan, pilih dukungan profesional dan layanan darurat setempat sesuai kebutuhanmu.</p>
          </aside>
          <div className="final-actions">
            <button className="outline-light-button" onClick={onBack}>
              ← Kembali ke profile
            </button>
            <button className="outline-light-button" onClick={onReset}>
              Ulangi assessment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function PatternInvestigation({
  id,
  focus,
  active,
  score,
  children,
}: {
  id: PatternId;
  focus: string;
  active: boolean;
  score: number;
  children: React.ReactNode;
}) {
  return (
    <section className={`pattern-investigation page-shell ${active ? "active" : ""}`}>
      <div className="investigation-label">
        <span className="pattern-letter">{id}</span>
        <span className="current-score">{score}/24 · {getSignal(score)}</span>
      </div>
      <div className="investigation-copy">
        <div className="highest-tag">{active ? "LAYAK DIPRIORITASKAN" : "TETAP PERIKSA KONTEKSNYA"}</div>
        <h2>JIKA {id} {id === "D" ? "TINGGI" : "PALING TINGGI"} — {focus}</h2>
        {children}
      </div>
    </section>
  );
}

function ThoughtExperiment({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="thought-experiment">
      <span className="thought-label">THOUGHT EXPERIMENT</span>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function CompetenceDesireCheck() {
  return (
    <div className="competence-check">
      <span className="thought-label">MAPPING TOOL</span>
      <h3>THE COMPETENCE–DESIRE CHECK</h3>
      <p>Petakan area utama hidupmu.</p>
      <div className="competence-table">
        <div className="competence-row competence-heading">
          <span>Area</span>
          <span>Kompetensi 0–10</span>
          <span>Desire 0–10</span>
          <span>Maintenance Cost 0–10</span>
        </div>
        {lifeAreas.map((area) => (
          <div className="competence-row" key={area}>
            <strong>{area}</strong>
            {["Kompetensi", "Desire", "Maintenance Cost"].map((label) => (
              <label key={label}>
                <span className="sr-only">{area}: {label}</span>
                <input type="number" min="0" max="10" inputMode="numeric" />
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
