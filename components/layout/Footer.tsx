import Link from 'next/link';
import { Zap, Mail, Phone, MapPin, Clock, Github, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { NAV_LINKS, COMPANY_INFO } from '@/lib/constants/nav';

const footerLinks = {
  Services: [
    { label: 'Artificial Intelligence', href: '/services#ai' },
    { label: 'Website Development', href: '/services#web' },
    { label: 'Automation', href: '/services#automation' },
    { label: 'UI/UX Design', href: '/services#design' },
    { label: 'Mobile Apps', href: '/services#mobile' },
    { label: 'Cloud Solutions', href: '/services#cloud' },
  ],
  Learn: [
    { label: 'Tutorial', href: '/tutorial' },
    { label: 'Articles', href: '/articles' },
    { label: 'Portfolio', href: '/portfolio' },
  ],
};

const socialLinks = [
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/6281234567890', color: '#25D366' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/duniadigitalia', color: '#E1306C' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/duniadigitalia', color: '#0077B5' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/duniadigitalia', color: '#A8B3C7' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #07111F 0%, #040D1A 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1E88FF, #00C8FF)', boxShadow: '0 0 20px rgba(30,136,255,0.4)' }}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Dunia<span className="text-gradient">Digitalia</span>
              </span>
            </Link>
            <p className="text-[#A8B3C7] text-sm leading-relaxed mb-6 max-w-xs">
              Platform terdepan untuk belajar dan membangun solusi digital — dari AI hingga web, dari desain hingga cloud.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              {[
                { icon: MapPin, text: COMPANY_INFO.address },
                { icon: Mail, text: COMPANY_INFO.email },
                { icon: Phone, text: COMPANY_INFO.phone },
                { icon: Clock, text: COMPANY_INFO.workingHours },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-[#1E88FF] mt-0.5 shrink-0" />
                  <span className="text-[#A8B3C7] text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = color + '40';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${color}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A8B3C7] text-sm hover:text-white transition-colors hover:translate-x-1 inline-block transition-transform duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {footerLinks.Services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#A8B3C7] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Learn</h4>
            <ul className="space-y-3">
              {footerLinks.Learn.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#A8B3C7] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter teaser */}
            <div
              className="mt-8 p-4 rounded-xl"
              style={{ background: 'rgba(30,136,255,0.06)', border: '1px solid rgba(30,136,255,0.15)' }}
            >
              <p className="text-white text-xs font-semibold mb-1">Newsletter</p>
              <p className="text-[#A8B3C7] text-xs mb-3">Tips & tutorial terbaru langsung ke inbox Anda.</p>
              <a
                href="mailto:hello@duniadigitalia.com?subject=Newsletter Subscription"
                className="block text-center py-2 rounded-lg text-xs font-semibold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #1E88FF, #1565C0)' }}
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#A8B3C7] text-xs">
            © {year} Dunia Digitalia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[#A8B3C7] text-xs hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
