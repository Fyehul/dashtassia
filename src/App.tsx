import { useState, useEffect, useRef } from 'react';
import './index.css';

// ─── Foto da Tassia (coloque tassia.png em src/assets/img/) ───────────────────
import tassiaImg from './assets/img/tassia.png';

// ─── Config ──────────────────────────────────────────────────────────────────
const CFG = {
  heverecUrl: 'https://heverec.com.br',
  waLink:
    'https://wa.me/557999795997?text=Ol%C3%A1%20Tassia!%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20saber%20mais.',
} as const;

// ─── Auto-import das screenshots do feed ─────────────────────────────────────
// Coloque Screenshot_1.png, Screenshot_2.png… em src/assets/img/
// O glob carrega TODAS as imagens da pasta e filtra pelo prefixo "Screenshot_"
const allImgModules = import.meta.glob<{ default: string }>(
  './assets/img/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true },
);

interface GalleryItem {
  url: string;
  label: string;
}

const galleryImages: GalleryItem[] = Object.entries(allImgModules)
  .filter(([path]) => {
    const filename = path.split('/').pop() ?? '';
    return /^Screenshot_/i.test(filename);
  })
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, mod], i) => ({
    url: mod.default,
    label: `Projeto ${i + 1}`,
  }));

// ─── Serviços ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: '🏘️',
    title: 'Corretagem de Imóveis',
    desc: 'Lotes e apartamentos em construção. As melhores oportunidades de Aracaju para o seu investimento.',
  },
  {
    icon: '📐',
    title: 'Arquitetura',
    desc: 'Projetos que unem estética e funcionalidade. Do conceito à obra, com atenção a cada detalhe.',
  },
  {
    icon: '🛋️',
    title: 'Design de Interiores',
    desc: 'Ambientes que refletem sua personalidade. Móveis planejados e decoração sob medida.',
  },
  {
    icon: '📊',
    title: 'Avaliação de Imóveis',
    desc: 'Laudos técnicos com precisão por Inferência Estatística. Credibilidade que o mercado reconhece.',
  },
  {
    icon: '⚖️',
    title: 'Perita Judicial TJSE',
    desc: 'Perícias com embasamento técnico e científico reconhecidas pelo Tribunal de Justiça de Sergipe.',
  },
  {
    icon: '📋',
    title: 'Regularização & Usucapião',
    desc: 'Laudos e documentação para regularização fundiária. Solução completa para o seu imóvel.',
  },
];

// ─── Ícone WhatsApp ───────────────────────────────────────────────────────────
function WAIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Hook: scroll reveal via IntersectionObserver ────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // só anima uma vez
          }
        });
      },
      { threshold: 0.12 },
    );

    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function TassiaLanding() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <span className={`nav-logo ${scrolled ? 'dark' : 'light'}`}>Tassia Rouvena</span>
          <a href={CFG.waLink} target="_blank" rel="noopener noreferrer" className="btn-wa-nav">
            <WAIcon size={15} color="#fff" />
            WhatsApp
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=55')",
          }}
        />
        <div className="hero-gradient" />
        <div className="hero-accent" />

        <div className="hero-content">
          <span className="hero-tag reveal delay-1">📍 Aracaju · Barra</span>

          <h1 className="reveal delay-2">
            Tassia
            <br />
            <em>Rouvena</em>
          </h1>

          <p className="hero-role reveal delay-3">Imóveis · Arquitetura · Design de Interiores</p>

          <p className="hero-desc reveal delay-3">
            Mais de 17 anos transformando espaços e realizando sonhos. Do imóvel ideal ao ambiente
            perfeito — experiência completa em um só lugar.
          </p>

          <div className="hero-actions reveal delay-4">
            <a href={CFG.waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WAIcon size={17} color="#fff" />
              Falar Agora
            </a>
            <a href="#servicos" className="btn-ghost">
              Ver Serviços
            </a>
          </div>
        </div>

        <div className="hero-stats">
          <div style={{ textAlign: 'center' }}>
            <div className="stat-num">
              17<span>+</span>
            </div>
            <div className="stat-lbl">
              Anos de
              <br />
              Experiência
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-num">
              <span>∞</span>
            </div>
            <div className="stat-lbl">
              Famílias
              <br />
              Atendidas
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="sec about" id="sobre">
        <div className="about-inner">
          <div className="about-grid">
            <div className="about-img-wrap reveal-left">
              <img className="about-img" src={tassiaImg} alt="Tassia Rouvena — Arquiteta e Corretora" />
              <div className="about-img-border" />
            </div>

            <div className="about-text reveal-right">
              <span className="sec-tag">Sobre Mim</span>
              <h2 className="sec-title">
                Uma profissional,
                <br />
                <em>múltiplas soluções</em>
              </h2>
              <div className="divider" />
              <p>
                Designer de Interiores, Arquiteta, Urbanista e Engenheira Avaliadora de Imóveis por
                Inferência Estatística. Minha trajetória começou em 2007 e evoluiu para uma atuação
                completa no mercado imobiliário.
              </p>
              <p>
                Localizada no Condomínio Horizonte Jardins em Aracaju, atendo clientes que buscam
                mais do que um imóvel — buscam um lar. Sou revendedora da fábrica Inusittá e Perita
                do TJSE.
              </p>
              <p className="about-highlight">
                "Quanto mais gostosa a nossa casa, mais feliz a nossa vida." 🏡❤️
              </p>
              <div className="badges">
                {['CRECI', 'CAU', 'Perita TJSE', 'Inusittá', 'Aracaju/SE'].map((b) => (
                  <span key={b} className="badge">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="sec" id="servicos" style={{ background: '#fafaf8' }}>
        <div className="srv-inner">
          <span className="sec-tag reveal">O Que Faço</span>
          <h2 className="sec-title reveal delay-1">
            Serviços que
            <br />
            <em>transformam vidas</em>
          </h2>
          <div className="srv-grid">
            {services.map((s, i) => (
              <div key={i} className={`srv-card reveal delay-${(i % 3) + 1}`}>
                <div className="srv-line" />
                <span className="srv-icon">{s.icon}</span>
                <div className="srv-title">{s.title}</div>
                <div className="srv-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY (auto-load via import.meta.glob) ── */}
      <section className="sec gal" id="portfolio">
        <div className="gal-inner">
          <span className="sec-tag reveal">Portfolio</span>
          <h2 className="sec-title reveal delay-1">
            Projetos que
            <br />
            <em>inspiram</em>
          </h2>

          <div className="gal-grid">
            {galleryImages.length === 0 ? (
              <div className="gal-empty">
                Adicione imagens com o nome <strong>Screenshot_1.png</strong>,{' '}
                <strong>Screenshot_2.png</strong>… em <code>src/assets/img/</code>
              </div>
            ) : (
              galleryImages.map((item, i) => (
                <div key={i} className={`g-item reveal delay-${(i % 3) + 1}`}>
                  <img src={item.url} alt={item.label} loading="lazy" />
                  <div className="g-overlay">
                    <span className="g-label">{item.label}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec">
        <h2 className="reveal">
          Seu imóvel ou projeto começa
          <br />
          com uma conversa
        </h2>
        <p className="reveal delay-1">
          Atendo pelo WhatsApp com rapidez e atenção personalizada. Vamos transformar seus planos em
          realidade.
        </p>
        <div className="reveal delay-2">
          <a href={CFG.waLink} target="_blank" rel="noopener noreferrer" className="btn-white">
            <WAIcon size={18} color="#b8192a" />
            Chamar no WhatsApp
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-logo reveal">
          Tassia <span>Rouvena</span>
        </div>
        <div className="footer-sub reveal delay-1">Imóveis & Arquitetura · Aracaju, SE</div>

        <div className="footer-links reveal delay-2">
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#portfolio">Portfolio</a>
          <a href={CFG.waLink} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a
            href="https://instagram.com/tassia_rouvena_imoveis_"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>

        <div className="footer-sep" />

        <p className="footer-copy">
          © 2026 Tassia Rouvena Imóveis & Arquitetura · Todos os direitos reservados
        </p>

        <p className="footer-dev">
          Desenvolvido por{' '}
          <a href={CFG.heverecUrl} target="_blank" rel="noopener noreferrer" className="footer-dev-link">
            Heverec Studio Code
          </a>
        </p>
      </footer>

      {/* ── WHATSAPP FLOAT ── */}
      <a href={CFG.waLink} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Falar no WhatsApp">
        <WAIcon size={28} color="#fff" />
      </a>
    </div>
  );
}