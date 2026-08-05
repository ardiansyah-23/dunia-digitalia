import PageTransition from '@/components/layout/PageTransition';
import FadeUp from '@/components/animations/FadeUp';
import { PlayCircle, Clock, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Tutorial & Kelas Edukasi | Dunia Digitalia',
  description: 'Pelajari teknologi terbaru: AI, Next.js 15, Python Automation, React Native, dan Cloud Architecture.',
};

const TUTORIALS = [
  {
    id: '1',
    title: 'Mastering Next.js 15 & React 19: Full-Stack AI Apps',
    category: 'Web & AI',
    level: 'Intermediate',
    duration: '4.5 Jam',
    episodes: 12,
    description: 'Panduan komprehensif membangun aplikasi web skala produksi memanfaatkan App Router, Server Actions, dan AI streaming API.',
  },
  {
    id: '2',
    title: 'Python Automation & RPA: Otomasi Tugas Harian',
    category: 'Automation',
    level: 'Beginner to Advanced',
    duration: '3.5 Jam',
    episodes: 8,
    description: 'Belajar membuat bot otomasi web, pengolah dokumen PDF/Excel otomatis, dan web scraping menggunakan Python.',
  },
  {
    id: '3',
    title: 'Firebase & Firestore Masterclass 2026',
    category: 'Backend & Cloud',
    level: 'All Levels',
    duration: '5 Jam',
    episodes: 15,
    description: 'Konfigurasi Firebase Authentication, Firestore Database rules, Storage, dan deployment Firebase Hosting.',
  },
];

export default function TutorialPage() {
  return (
    <PageTransition>
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
          <FadeUp>
            <div className="section-label mx-auto w-fit mb-4">Learn Modern Tech</div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6">
              Pusat <span className="text-gradient">Tutorial & Modul</span>
            </h1>
            <p className="text-[#A8B3C7] text-lg max-w-2xl mx-auto">
              Tingkatkan keahlian teknis Anda melalui tutorial terstruktur berbasis proyek nyata.
            </p>
          </FadeUp>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {TUTORIALS.map((tut, i) => (
              <FadeUp key={tut.id} delay={i * 0.1}>
                <div
                  className="rounded-3xl p-8 h-full flex flex-col justify-between"
                  style={{ background: 'rgba(15,29,53,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1E88FF]/20 text-[#5EC8FF] border border-[#1E88FF]/30">
                        {tut.category}
                      </span>
                      <span className="text-xs text-[#A8B3C7]">{tut.level}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{tut.title}</h3>
                    <p className="text-[#A8B3C7] text-sm leading-relaxed mb-6">{tut.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-[#A8B3C7] mb-6 pt-4 border-t border-white/10">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {tut.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {tut.episodes} Modul
                      </span>
                    </div>

                    <Link href="/articles" className="btn-primary w-full text-center flex items-center justify-center gap-2 text-sm">
                      <PlayCircle className="w-4 h-4" /> Mulai Belajar
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
