import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  bgColor: string;
  image: string;
}

const AUTO_MS = 5000;

export interface CarouselProps {
  slides: CarouselSlide[];
}

export function Carousel({ slides }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [autoplayKey, setAutoplayKey] = useState(0);

  const count = slides.length;
  const safeIndex = count > 0 ? index % count : 0;

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex((next + count) % count);
      setAutoplayKey((k) => k + 1);
    },
    [count],
  );

  const prev = useCallback(() => go(safeIndex - 1), [go, safeIndex]);
  const next = useCallback(() => go(safeIndex + 1), [go, safeIndex]);

  useEffect(() => {
    if (count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [count, autoplayKey]);

  if (count === 0) return null;

  return (
    <section
      className="relative isolate h-[400px] overflow-hidden md:h-[500px]"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
    >
      {slides.map((slide, i) => {
        const active = i === safeIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!active}
            className={`absolute inset-0 bg-linear-to-br ${slide.bgColor} transition-opacity duration-500 ease-out ${
              active ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
          />
        );
      })}

      <div className="relative z-10 h-full">
        {slides.map((slide, i) => {
          const active = i === safeIndex;
          return (
            <div
              key={slide.id}
              aria-hidden={!active}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                active
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-3 opacity-0'
              }`}
            >
              <div className="mx-auto flex h-full max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:gap-10 md:px-6 lg:px-8">
                <div className="flex max-w-xl flex-1 flex-col justify-center md:order-1">
                  <h2 className="text-3xl font-semibold tracking-tight text-white drop-shadow-sm md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-white/90 md:text-lg">{slide.subtitle}</p>
                  <Link
                    to={slide.link}
                    className="mt-6 inline-flex w-fit items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-md transition hover:bg-brand-50 hover:shadow-lg"
                  >
                    {slide.cta}
                  </Link>
                </div>

                <div className="relative flex flex-1 items-center justify-center md:order-2">
                  <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm md:aspect-square">
                    <img
                      src={slide.image}
                      alt=""
                      className="size-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 md:left-4 md:size-11"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-6" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 md:right-4 md:size-11"
            aria-label="Next slide"
          >
            <ChevronRight className="size-6" strokeWidth={2} />
          </button>

          <div
            className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-6"
            role="tablist"
            aria-label="Slide indicators"
          >
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === safeIndex}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all ${
                  i === safeIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
