import { Helmet } from 'react-helmet-async';
import AboutHero from '../../components/about/AboutHero.jsx';
import AboutOrigin from '../../components/about/AboutOrigin.jsx';
import AboutDifferent from '../../components/about/AboutDifferent.jsx';
import AboutValues from '../../components/about/AboutValues.jsx';
import AboutSegments from '../../components/about/AboutSegments.jsx';
import FinalCTA from '../../components/home/FinalCTA.jsx';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Loompaa — The E-Commerce Factory Floor Built by Operators</title>
        <meta
          name="description"
          content="Loompaa is built by operators, not consultants. We plug into D2C brands and execute — not advise."
        />
      </Helmet>
      <AboutHero />
      <AboutOrigin />
      <AboutDifferent />
      <AboutValues />
      <AboutSegments />
      <FinalCTA />
    </>
  );
}
