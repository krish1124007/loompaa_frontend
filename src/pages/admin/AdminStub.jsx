import { Helmet } from 'react-helmet-async';

export default function AdminStub({ title, phase = 10 }) {
  return (
    <>
      <Helmet>
        <title>{title} | Loompaa Admin</title>
      </Helmet>
      <div className="p-8 md:p-12">
        <h1 className="text-3xl font-bold text-ink mb-3">{title}</h1>
        <p className="text-ink-sec">
          This page lands in <span className="font-mono text-tangerine">Phase {phase}</span>.
        </p>
      </div>
    </>
  );
}
