import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api, { unwrap } from '../../lib/api.js';
import ServiceHero from '../../components/service/ServiceHero.jsx';
import ServiceDeliverables from '../../components/service/ServiceDeliverables.jsx';
import ServiceLoompaaTake from '../../components/service/ServiceLoompaaTake.jsx';
import ServiceCrossSell from '../../components/service/ServiceCrossSell.jsx';
import ServiceCTA from '../../components/service/ServiceCTA.jsx';
import NotFound from './NotFound.jsx';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [search] = useSearchParams();
  const preview = search.get('preview') === '1';
  const [service, setService] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    const url = preview ? `/services/${slug}?preview=1` : `/services/${slug}`;
    unwrap(api.get(url))
      .then((d) => {
        if (cancelled) return;
        setService(d);
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('not-found'));
    return () => {
      cancelled = true;
    };
  }, [slug, preview]);

  if (status === 'not-found') return <NotFound />;
  if (status === 'loading' || !service) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-40 text-ink-sec">Loading…</div>
    );
  }

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.meta?.description || service.cardDescription,
    provider: { '@type': 'Organization', name: 'Loompaa' },
    areaServed: 'India',
  };

  return (
    <>
      <Helmet>
        <title>{service.meta?.title || `${service.title} for D2C Brands | Loompaa`}</title>
        <meta
          name="description"
          content={service.meta?.description || service.cardDescription}
        />
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      </Helmet>

      <ServiceHero service={service} />
      <ServiceDeliverables service={service} />
      <ServiceLoompaaTake service={service} />
      <ServiceCrossSell service={service} />
      <ServiceCTA service={service} />
    </>
  );
}
