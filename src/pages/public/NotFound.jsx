import { Helmet } from 'react-helmet-async';
import Button from '../../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Off the factory floor | Loompaa</title>
      </Helmet>
      <section className="min-h-[70vh] flex items-center justify-center px-6 md:px-10">
        <div className="max-w-2xl text-center">
          <p className="font-mono text-eyebrow uppercase text-tangerine mb-6">404 — Not Found</p>
          <h1 className="font-sans font-bold text-display-lg text-ink">
            This page is off the <em className="font-display not-italic italic text-tangerine">factory floor.</em>
          </h1>
          <p className="mt-6 text-lg text-ink-sec leading-relaxed">
            The link's broken. The page is gone. Or someone unplugged it. Either way — it isn't here.
          </p>
          <div className="mt-10 flex justify-center">
            <Button to="/" size="lg">Back to Home</Button>
          </div>
        </div>
      </section>
    </>
  );
}
