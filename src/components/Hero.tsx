import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
  animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

type Exchange = {
  question: string;
  answer: string;
  metrics: string[];
};

const EXCHANGES: Exchange[] = [
  {
    question: 'Which batteries are going to become warranty claims, and why?',
    answer:
      'Seven packs will cross your warranty SOH floor before term. Five trace to fast-charge plating, two to a transit thermal event, not normal aging.',
    metrics: ['7 packs at risk', 'CONF 88'],
  },
  {
    question: 'Which battery or cell is going to fail, and whose fault is it?',
    answer:
      'Cell 14 in Pack #482 breaches safe operating limits in 6 to 9 weeks. Cause is lithium plating from sub-zero fast charging, a duty-cycle fault.',
    metrics: ['Cell 14 · Pack #482', '6-9 weeks', 'CONF 86'],
  },
  {
    question: 'Which vehicle will fail or lose usable range next, and when?',
    answer:
      'Vehicle KA-19-C4471 drops about 12% usable range within nine weeks. Pack #217 hits the floor first, driven by loss of active material.',
    metrics: ['-12% range', '9 weeks', 'CONF 91'],
  },
  {
    question: 'Which batteries should I keep in service, swap, repair, or retire?',
    answer:
      'Of 284 packs: 231 stay in service, 38 swap at next service, 11 need cell-level repair, 4 retire. Ranked by remaining life against your duty cycle.',
    metrics: ['284 packs scored', 'CONF 84'],
  },
  {
    question: 'What is this battery actually worth, and which cells can still be reused?',
    answer:
      'Pack #482 holds 81% true SOH. Nineteen of 24 cells clear the second-life threshold; the five plating-damaged cells should not re-enter service.',
    metrics: ['81% true SOH', '19/24 reusable'],
  },
  {
    question:
      'What is the true health and remaining life of the battery I am financing, and what will it be worth later?',
    answer:
      'Pack #205 reads 96% true SOH with over 14 months before the EOL threshold. Projected residual at lease end is 78% SOH.',
    metrics: ['>14 months RUL', '78% at lease end', 'CONF 64'],
  },
];

type Phase = 'typing' | 'thinking' | 'answer';

const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  const exchange = EXCHANGES[index];
  const questionLength = exchange.question.length;

  const goTo = (i: number) => {
    setIndex(i);
    setTyped(reduce ? EXCHANGES[i].question.length : 0);
    setPhase(reduce ? 'answer' : 'typing');
  };

  // Reduced motion: skip the typing beat entirely, show the full exchange.
  useEffect(() => {
    if (!reduce) return;
    setTyped(questionLength);
    setPhase('answer');
  }, [reduce, index, questionLength]);

  // Type the question one character at a time.
  useEffect(() => {
    if (reduce || phase !== 'typing') return;
    if (typed >= questionLength) {
      setPhase('thinking');
      return;
    }
    const t = setTimeout(() => setTyped((n) => n + 1), 26);
    return () => clearTimeout(t);
  }, [reduce, phase, typed, questionLength]);

  // Brief pause between the question landing and the answer resolving.
  useEffect(() => {
    if (reduce || phase !== 'thinking') return;
    const t = setTimeout(() => setPhase('answer'), 620);
    return () => clearTimeout(t);
  }, [reduce, phase]);

  // Hold the answer, then advance to the next question.
  useEffect(() => {
    if (phase !== 'answer') return;
    const t = setTimeout(() => {
      const next = (index + 1) % EXCHANGES.length;
      setIndex(next);
      setTyped(reduce ? EXCHANGES[next].question.length : 0);
      setPhase(reduce ? 'answer' : 'typing');
    }, reduce ? 6500 : 4600);
    return () => clearTimeout(t);
  }, [phase, index, reduce]);

  return (
    <section
      id="hero"
      className="relative flex items-center bg-[var(--bg)] overflow-hidden"
      style={{ paddingTop: '3.5rem', minHeight: '100vh' }}
    >
      {/* SEO / screen-reader description */}
      <span className="sr-only">
        Zylectra builds Physical AI for lithium-ion batteries. We help EV fleets,
        battery swapping companies, and battery operators understand battery health,
        track degradation, and make better decisions about their battery assets.
      </span>

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.032,
          backgroundImage:
            'linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Left radial glow */}
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{
          top: '5%',
          left: '-14%',
          width: '45%',
          height: '70%',
          background: 'radial-gradient(ellipse, rgba(52,211,153,0.06) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left: message */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">

            <motion.span
              {...fadeUp(0, reduce)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(9px, 1.6vw, 10.5px)',
                color: 'var(--accent-green-text)',
                letterSpacing: '0.14em',
              }}
              className="uppercase mb-4"
            >
              Physical AI for lithium-ion batteries
            </motion.span>

            <motion.h1
              {...fadeUp(0.1, reduce)}
              className="font-bold text-[var(--text)] tracking-tight mb-4"
              style={{
                lineHeight: 1.1,
                fontSize: 'clamp(1.9rem, 3.8vw, 3.1rem)',
                maxWidth: 580,
              }}
            >
              You can see every battery's data.
              <br />
              <span className="text-emerald-400">You can't see what's happening inside it.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2, reduce)}
              className="text-[var(--text-muted)] leading-relaxed mb-7"
              style={{ fontSize: 'clamp(13.5px, 1.2vw, 16px)', maxWidth: 500 }}
            >
              Go beyond BMS-reported health with real-world battery intelligence. Get pack and cell-level actual
              electrochemical health, 4-8 months in advance failure prediction, RUL, and root-cause analysis, with a confidence 
              score for every output.
            </motion.p>

            <motion.div
              {...fadeUp(0.3, reduce)}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <a
                href="#contact"
                title="Contact Zylectra"
                className="group inline-flex items-center justify-center gap-2.5 pl-6 pr-2 py-1.5 rounded-2xl bg-emerald-400 text-black font-bold text-[15px] shadow-lg shadow-emerald-400/10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-emerald-300 hover:shadow-[0_4px_40px_rgba(52,211,153,0.25)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                style={{ letterSpacing: '0.015em' }}
              >
                <span className="py-2">Contact Us</span>
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:bg-black/15">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right: the agent answering the questions operators actually ask */}
          <motion.div
            {...fadeUp(0.25, reduce)}
            className="lg:col-span-6 w-full lg:justify-self-end"
            style={{ maxWidth: 540 }}
          >
            <div
              className="relative rounded-[1.75rem] p-1"
              style={{
                background: 'linear-gradient(160deg, rgba(52,211,153,0.35), rgba(52,211,153,0.05))',
              }}
            >
              <div
                className="rounded-[1.5rem] overflow-hidden"
                style={{ background: '#0a0a0f', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* panel header */}
                <div
                  className="flex items-center justify-between px-5 py-3.5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      {!reduce && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                      )}
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-sm font-semibold text-white">Zylectra</span>
                  </div>
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9.5px',
                      letterSpacing: '0.12em',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    Physics-informed AI
                  </span>
                </div>

                <div className="px-5 py-5" style={{ minHeight: 252 }}>
                  {/* the question, typed out */}
                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="text-[15px] text-white/90 leading-relaxed">
                      {exchange.question.slice(0, typed)}
                      {phase !== 'answer' && (
                        <motion.span
                          className="inline-block w-[2px] h-[15px] align-middle ml-0.5"
                          style={{ background: '#34d399' }}
                          animate={reduce ? undefined : { opacity: [1, 1, 0, 0] }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                    </p>
                  </div>

                  {/* the answer */}
                  <div className="mt-4">
                    {phase === 'thinking' && (
                        <motion.div
                          key={`thinking-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-1.5 px-1"
                        >
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400/60"
                              animate={{ opacity: [0.25, 1, 0.25] }}
                              transition={{ duration: 1, repeat: Infinity, delay: d * 0.16, ease: 'easeInOut' }}
                            />
                          ))}
                        </motion.div>
                      )}

                      {phase === 'answer' && (
                        <motion.div
                          key={`answer-${index}`}
                          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                        >
                          <p className="text-[15px] text-white/70 leading-relaxed px-1">
                            {exchange.answer}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-4 px-1">
                            {exchange.metrics.map((m) => {
                              const isConfidence = m.startsWith('CONF');
                              return (
                                <span
                                  key={m}
                                  className="inline-flex items-center rounded-full px-2.5 py-1"
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10px',
                                    letterSpacing: '0.06em',
                                    border: isConfidence
                                      ? '1px solid rgba(52,211,153,0.3)'
                                      : '1px solid rgba(255,255,255,0.1)',
                                    background: isConfidence ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.03)',
                                    color: isConfidence ? '#34d399' : 'rgba(255,255,255,0.55)',
                                  }}
                                >
                                  {m}
                                </span>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                  </div>
                </div>

                {/* question selector */}
                <div
                  className="flex items-center justify-center gap-2 px-5 py-3.5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {EXCHANGES.map((e, i) => (
                    <button
                      key={e.question}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={e.question}
                      aria-current={i === index}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === index ? 20 : 6,
                        background: i === index ? '#34d399' : 'rgba(255,255,255,0.18)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
