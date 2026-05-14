import { Mail, Send, Facebook, Twitter, Twitch, Youtube, ArrowUpRight } from 'lucide-react';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import Button from '../ui/Button.jsx';

export default function ConversationCTA() {
  return (
    <section className="bg-[#0A0A0A] text-white py-40 md:py-64 min-h-[75vh] flex items-center overflow-hidden relative -mt-20 pt-48 md:pt-72">
      {/* Background patterns */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-12 gap-12 md:gap-20 items-center">
          
          {/* ── Left Side: Headline & Social Cards ── */}
          <div className="col-span-12 lg:col-span-6">


            <RevealOnScroll delay={0.1}>
              <h2 className="font-sans font-black text-[64px] md:text-[100px] leading-[0.85] tracking-[-0.04em] mb-16">
                Have an <span className="relative inline-block px-5 py-3 mx-1">
                  <span className="absolute inset-0 bg-[#FF6B2C] -rotate-3 rounded-2xl shadow-[0_10px_30px_rgba(255,107,44,0.3)]" />
                  <span className="relative text-white">idea?</span>
                </span>
                <br />
                Let's build it.
              </h2>
            </RevealOnScroll>

            {/* Social Cards Section */}
            <div className="mt-16">
              <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase mb-6">Find us on</p>
              <div className="relative flex items-end gap-4">
                {/* Facebook (Tilted/Tinted) */}
                <RevealOnScroll delay={0.2}>
                  <div className="group w-20 h-20 md:w-28 md:h-28 border-2 border-[#4F6FFF]/30 rounded-[1.8rem] flex items-center justify-center transition-all hover:border-[#4F6FFF] hover:-translate-y-1 duration-500 cursor-pointer -rotate-6 shadow-[0_10px_20px_rgba(79,111,255,0.1)]">
                    <Facebook className="w-8 h-8 md:w-10 md:h-10 text-[#4F6FFF]/60 group-hover:text-[#4F6FFF] transition-colors" />
                  </div>
                </RevealOnScroll>

                {/* Twitter */}
                <RevealOnScroll delay={0.25}>
                  <div className="group w-20 h-20 md:w-28 md:h-28 border-2 border-white/10 rounded-[1.8rem] flex items-center justify-center transition-all hover:border-white/30 hover:-translate-y-1 duration-500 cursor-pointer">
                    <Twitter className="w-8 h-8 md:w-10 md:h-10 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </RevealOnScroll>

                {/* Twitch */}
                <RevealOnScroll delay={0.3}>
                  <div className="group w-20 h-20 md:w-28 md:h-28 border-2 border-white/10 rounded-[1.8rem] flex items-center justify-center transition-all hover:border-white/30 hover:-translate-y-1 duration-500 cursor-pointer">
                    <Twitch className="w-8 h-8 md:w-10 md:h-10 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </RevealOnScroll>

                {/* YouTube */}
                <RevealOnScroll delay={0.35}>
                  <div className="group w-20 h-20 md:w-28 md:h-28 border-2 border-white/10 rounded-[1.8rem] flex items-center justify-center transition-all hover:border-white/30 hover:-translate-y-1 duration-500 cursor-pointer">
                    <Youtube className="w-8 h-8 md:w-10 md:h-10 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>

          {/* ── Right Side: Text & Actions ── */}
          <div className="col-span-12 lg:col-span-6 lg:mt-[125px]">
            <RevealOnScroll delay={0.2}>
              <p className="text-white/60 text-lg md:text-[22px] leading-[1.4] font-medium mb-12">
                We don't do discovery calls. We do real conversations about your numbers, your gaps, and what we'd ship in your first <span className="text-white font-bold underline decoration-[#FF6B2C]/40 underline-offset-4">48 hours.</span>
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="mt-16 flex flex-row items-center gap-12">
                <Button 
                  variant="inverse" 
                  size="lg" 
                  to="/contact" 
                  arrow={false} 
                  className="rounded-full !px-12 !py-6 shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(255,107,44,0.2)] hover:scale-105 transition-all whitespace-nowrap"
                >
                  View pricing
                </Button>
                
                <div className="hidden sm:block">
                  <p className="font-mono text-[12px] font-bold tracking-[0.2em] text-white/40 uppercase mb-2">Email us</p>
                  <a 
                    href="mailto:hello@loompaa.in" 
                    className="group flex items-center gap-4 text-2xl font-bold text-white hover:text-[#FF6B2C] transition-all whitespace-nowrap"
                  >
                    hello@loompaa.in
                    <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FF6B2C] group-hover:bg-[#FF6B2C]/10 transition-all">
                      <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>
            </RevealOnScroll>


          </div>

        </div>
      </div>
    </section>
  );
}
