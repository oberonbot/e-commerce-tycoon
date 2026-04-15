import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  name: string;
  items: FaqItem[];
}

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:text-brand-600"
      >
        <span className="font-medium text-slate-900">{item.question}</span>
        <ChevronDown
          className={`size-5 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed text-slate-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqData: FaqCategory[] = [
    {
      name: t('faq.categories.shipping'),
      items: [
        { question: t('faq.shipping.q1'), answer: t('faq.shipping.a1') },
        { question: t('faq.shipping.q2'), answer: t('faq.shipping.a2') },
        { question: t('faq.shipping.q3'), answer: t('faq.shipping.a3') },
        { question: t('faq.shipping.q4'), answer: t('faq.shipping.a4') },
      ],
    },
    {
      name: t('faq.categories.returns'),
      items: [
        { question: t('faq.returns.q1'), answer: t('faq.returns.a1') },
        { question: t('faq.returns.q2'), answer: t('faq.returns.a2') },
        { question: t('faq.returns.q3'), answer: t('faq.returns.a3') },
      ],
    },
    {
      name: t('faq.categories.payment'),
      items: [
        { question: t('faq.payment.q1'), answer: t('faq.payment.a1') },
        { question: t('faq.payment.q2'), answer: t('faq.payment.a2') },
        { question: t('faq.payment.q3'), answer: t('faq.payment.a3') },
      ],
    },
    {
      name: t('faq.categories.products'),
      items: [
        { question: t('faq.products.q1'), answer: t('faq.products.a1') },
        { question: t('faq.products.q2'), answer: t('faq.products.a2') },
        { question: t('faq.products.q3'), answer: t('faq.products.a3') },
      ],
    },
    {
      name: t('faq.categories.account'),
      items: [
        { question: t('faq.account.q1'), answer: t('faq.account.a1') },
        { question: t('faq.account.q2'), answer: t('faq.account.a2') },
        { question: t('faq.account.q3'), answer: t('faq.account.a3') },
      ],
    },
  ];

  function toggleItem(key: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {t('faq.title')}
        </h1>
        <p className="mt-3 text-slate-600">
          {t('faq.subtitle')}
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {faqData.map((category) => (
            <div key={category.name}>
              <h2 className="mb-2 text-lg font-semibold text-brand-600">{category.name}</h2>
              <div className="rounded-2xl border border-slate-200/80 bg-white px-6 shadow-sm">
                {category.items.map((item) => {
                  const key = `${category.name}-${item.question}`;
                  return (
                    <AccordionItem
                      key={key}
                      item={item}
                      isOpen={openItems.has(key)}
                      onToggle={() => toggleItem(key)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
          <HelpCircle className="mx-auto size-10 text-brand-600" strokeWidth={1.5} />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">{t('faq.stillHaveQuestions')}</h2>
          <p className="mt-2 text-slate-600">
            {t('faq.stillHaveQuestionsDescription')}
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            {t('faq.contactUs')}
          </Link>
        </div>
      </section>
    </div>
  );
}
