import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'How does the carbon offset tracking work?',
    answer: 'We utilize satellite imagery combined with ground sensors to measure biomass density in real-time. This data is processed through our proprietary algorithm to calculate precise CO2 absorption rates.'
  },
  {
    question: 'Can I visit the preservation sites?',
    answer: 'Yes, we offer guided eco-tours. These are strictly regulated to ensure minimal environmental impact. All visitors must undergo a brief orientation regarding ecosystem safety.'
  },
  {
    question: 'Where does the funding go?',
    answer: '85% of all funds go directly to on-ground preservation efforts, equipment, and ranger salaries. The remaining 15% is allocated to administrative costs and technological development.'
  },
  {
    question: 'Is this tax deductible?',
    answer: 'Yes, we are a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the extent allowed by law in your jurisdiction.'
  }
];

function FAQItem({ question, answer, isOpen, onClick, index }: any) {
  return (
    <motion.div
      className="border-b border-white/10 py-4 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button
        className="flex justify-between items-center w-full text-left text-white/90 hover:text-white transition-colors text-lg font-medium pr-4 select-none"
        onClick={onClick}
      >
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className={`w-5 h-5 transition-colors ${isOpen ? 'text-[#4ade80]' : 'text-white/40'}`} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-white/50 text-sm leading-7 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="faq" 
      ref={containerRef}
      className="py-32 px-6 md:px-12 bg-black relative overflow-hidden"
    >
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#020202] to-transparent z-10 pointer-events-none" />
      
      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-semibold text-white mb-12 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}