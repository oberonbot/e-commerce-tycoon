import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Lightbulb, Leaf, Award, Users, ArrowRight } from 'lucide-react';

export function About() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
    },
    {
      icon: Award,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description'),
    },
    {
      icon: Leaf,
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.description'),
    },
    {
      icon: Users,
      title: t('about.values.community.title'),
      description: t('about.values.community.description'),
    },
  ];

  const team = [
    {
      name: t('about.team.maya.name'),
      role: t('about.team.maya.role'),
      bio: t('about.team.maya.bio'),
      avatar: 'https://ui-avatars.com/api/?name=Maya+Chen&background=6366f1&color=fff&size=256',
    },
    {
      name: t('about.team.alex.name'),
      role: t('about.team.alex.role'),
      bio: t('about.team.alex.bio'),
      avatar: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=8b5cf6&color=fff&size=256',
    },
    {
      name: t('about.team.jordan.name'),
      role: t('about.team.jordan.role'),
      bio: t('about.team.jordan.bio'),
      avatar: 'https://ui-avatars.com/api/?name=Jordan+Patel&background=ec4899&color=fff&size=256',
    },
    {
      name: t('about.team.sam.name'),
      role: t('about.team.sam.role'),
      bio: t('about.team.sam.bio'),
      avatar: 'https://ui-avatars.com/api/?name=Sam+Nakamura&background=14b8a6&color=fff&size=256',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-72 overflow-hidden bg-slate-900 md:h-96">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
          alt={t('about.heroAlt')}
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="relative flex size-full items-center justify-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {t('about.heroTitle')}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:px-8">
        <p className="text-lg leading-relaxed text-slate-700">
          {t('about.storyP1')}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">
          {t('about.storyP2')}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">
          {t('about.storyP3')}
        </p>
      </section>

      {/* Values */}
      <section className="border-y border-slate-200/80 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {t('about.valuesTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {t('about.valuesSubtitle')}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <Icon className="size-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          {t('about.teamTitle')}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          {t('about.teamSubtitle')}
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map(({ name, role, bio, avatar }) => (
            <div
              key={name}
              className="flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm"
            >
              <img
                src={avatar}
                alt={name}
                className="size-24 rounded-full object-cover"
              />
              <h3 className="mt-4 font-semibold text-slate-900">{name}</h3>
              <p className="text-sm font-medium text-brand-600">{role}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-br from-brand-600 to-brand-800 py-16">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {t('about.ctaTitle')}
          </h2>
          <p className="mt-3 text-white/90">
            {t('about.ctaDescription')}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-md transition hover:bg-brand-50"
            >
              {t('about.shopCollection')}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t('about.getInTouch')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
