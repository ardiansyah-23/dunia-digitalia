'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import FadeUp from '@/components/animations/FadeUp';
import { FAQ_DATA } from '@/lib/constants/faq';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <div className="section-label mx-auto w-fit mb-4">FAQ</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Pertanyaan <span className="text-gradient">Sering Diajukan</span>
          </h2>
          <p className="text-[#A8B3C7] text-lg mt-4 max-w-xl mx-auto">
            Temukan jawaban untuk pertanyaan umum mengenai layanan dan kerja sama dengan kami.
          </p>
        </FadeUp>

        <div className="space-y-4">
          {FAQ_DATA.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <FadeUp key={item.id} delay={i * 0.05}>
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: isOpen ? 'rgba(15,29,53,0.9)' : 'rgba(15,29,53,0.5)',
                    border: isOpen ? '1px solid rgba(30,136,255,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: isOpen ? '0 0 30px rgba(30,136,255,0.1)' : 'none',
                  }}
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white text-base lg:text-lg hover:text-[#5EC8FF] transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#1E88FF] shrink-0" />
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-[#A8B3C7]" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-0 text-[#A8B3C7] text-sm lg:text-base leading-relaxed border-t border-white/5 mt-2">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
