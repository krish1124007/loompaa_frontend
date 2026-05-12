import { MessageCircle, MapPin } from 'lucide-react';
import IMG from '../../assets/images.js';

const ITEMS = [
  {
    iconSrc: IMG.email,
    label: 'Email',
    value: 'hello@loompaa.in',
    href: 'mailto:hello@loompaa.in',
    note: 'We respond within 4 hours on weekdays.',
  },
  {
    iconSrc: IMG.phone,
    label: 'Book a Call',
    value: 'calendly.com/loompaa',
    href: 'https://calendly.com/loompaa',
    note: "Pick a 20-minute slot. We'll come prepared with observations on your brand.",
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 98XXX XXXXX',
    href: 'https://wa.me/919800000000',
    note: "For quick conversations. We're direct — so feel free to be too.",
  },
  {
    icon: MapPin,
    label: 'Based In',
    value: 'Surat & Ahmedabad, India',
    note: 'Serving D2C brands across India and international markets.',
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-3">
      <h2 className="font-mono text-eyebrow uppercase tracking-[0.18em] text-ink-tri mb-6">
        How To Reach Us
      </h2>
      {ITEMS.map((item) => {
        const Card = item.href ? 'a' : 'div';
        const cardProps = item.href ? { href: item.href } : {};
        return (
          <Card
            key={item.label}
            {...cardProps}
            className={`group block rounded-card border border-subtle bg-elevated p-5 transition-all duration-300 ${
              item.href ? 'hover:border-tangerine hover:-translate-y-0.5' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tangerine/15"
              >
                {item.iconSrc ? (
                  <img src={item.iconSrc} alt="" aria-hidden="true" className="h-7 w-7" />
                ) : (
                  <item.icon className="h-5 w-5 text-tangerine" />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-ink-tri font-mono uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="mt-1 text-base text-ink font-medium group-hover:text-tangerine transition-colors">
                  {item.value}
                </p>
                {item.note && (
                  <p className="mt-1 text-xs text-ink-tri">{item.note}</p>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
