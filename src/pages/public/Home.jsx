import { Helmet } from 'react-helmet-async';
import Hero from '../../components/home/Hero.jsx';
import SocialProofTicker from '../../components/home/SocialProofTicker.jsx';
import Numbers from '../../components/home/Numbers.jsx';
import ServicesGrid from '../../components/home/ServicesGrid.jsx';
import SocialCTA from '../../components/home/SocialCTA.jsx';
import HowItWorks from '../../components/home/HowItWorks.jsx';
import LoompaaStory from '../../components/home/LoompaaStory.jsx';
import Testimonials from '../../components/home/Testimonials.jsx';
import BlogTeaser from '../../components/home/BlogTeaser.jsx';
import FAQ from '../../components/home/FAQ.jsx';
import FinalCTA from '../../components/home/FinalCTA.jsx';

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Loompaa',
  url: 'https://loompaa.in',
  description:
    "India's result-driven e-commerce execution partner. Performance marketing, store development, and D2C growth — live in 48 hours.",
  founder: { '@type': 'Organization', name: 'Loompaa' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Surat',
    addressCountry: 'IN',
  },
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Loompaa — We don't pitch decks. We ship results.</title>
        <meta
          name="description"
          content="Loompaa is India's result-driven e-commerce partner. Performance marketing, store development, and D2C growth — live in 48 hours, guaranteed results, no lock-in."
        />
        <meta property="og:title" content="Loompaa — We ship results." />
        <meta
          property="og:description"
          content="Your e-commerce factory floor. We plug in, build the systems, and move the number."
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>
      </Helmet>

      <Hero />
      <SocialProofTicker />
      <Numbers />
      <ServicesGrid />
      <SocialCTA />
      <HowItWorks />
      <Testimonials />
      <LoompaaStory />
      <BlogTeaser />
      <FAQ />
      <FinalCTA />
    </>
  );
}
