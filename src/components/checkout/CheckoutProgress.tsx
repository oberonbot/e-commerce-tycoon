import { Check } from 'lucide-react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

export type CheckoutStep = 1 | 2 | 3;

export function CheckoutProgress({
  activeStep,
  allComplete = false,
}: {
  activeStep: CheckoutStep;
  allComplete?: boolean;
}) {
  const { t } = useTranslation();
  const steps = [
    { n: 1 as const, label: t('checkout.shipping') },
    { n: 2 as const, label: t('checkout.payment') },
    { n: 3 as const, label: t('checkout.confirmation') },
  ];

  return (
    <nav aria-label="Checkout progress" className="w-full">
      <div className="mx-auto flex max-w-2xl items-start gap-0 md:max-w-3xl">
        {steps.map((step, index) => {
          const done = allComplete || activeStep > step.n;
          const current = !allComplete && activeStep === step.n;
          const showLine = index < steps.length - 1;

          return (
            <Fragment key={step.n}>
              <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                    done
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : current
                        ? 'border-brand-600 bg-white text-brand-600 shadow-md shadow-brand-600/15'
                        : 'border-slate-200 bg-white text-slate-400'
                  }`}
                >
                  {done ? <Check className="size-[18px]" strokeWidth={2.5} aria-hidden /> : step.n}
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    {t('checkout.step')} {step.n}
                  </p>
                  <p
                    className={`text-xs font-semibold sm:text-sm ${
                      current ? 'text-brand-700' : done ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
              {showLine && (
                <div
                  className={`mx-0 mt-5 hidden h-0.5 min-w-[12px] flex-1 md:block ${
                    allComplete || activeStep > step.n ? 'bg-brand-600' : 'bg-slate-200'
                  }`}
                  aria-hidden
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
}
