import "./styles/site.css";
import { data } from "./data";
import { InkBackground } from "./ink/InkBackground";

const p = data.profile;

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <InkBackground />

      <header className="bar">
        <div className="bar__in">
          <a className="bar__name" href="#top">{p.name}</a>
          <nav aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <a className="cv" href="/cv.pdf" target="_blank" rel="noopener">CV</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero wrap" id="top">
          <h1>{p.name}<span className="role">{p.title}</span></h1>
          <p className="lead">{p.summary}</p>
          <nav className="links" aria-label="Profiles">
            <a href={p.links.github} target="_blank" rel="noopener">GitHub ↗</a>
            <a href={p.links.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
            <a href="/cv.pdf" target="_blank" rel="noopener">CV ↓</a>
            <a href={`mailto:${p.email}`}>Email</a>
          </nav>
        </section>

        <section className="wrap" id="work">
          <p className="eyebrow">Selected work</p>
          <div className="cards">
            {data.work.map((w) => (
              <article className="card" key={w.slug}>
                <div className="card__top">
                  <h3 className="card__t">
                    {w.name.includes("—") ? (
                      <>{w.name.split("—")[0].trim()}<small>{w.name.split("—")[1].trim()}</small></>
                    ) : w.name}
                  </h3>
                  {w.url
                    ? <a className="card__link" href={w.url} target="_blank" rel="noopener">repo ↗</a>
                    : <span className="card__priv">private</span>}
                </div>
                <p className="card__d">{w.oneLiner}</p>
                <ul className="card__tech">
                  {w.tech.slice(0, 4).map((t) => <li key={t}>{t}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap" id="experience">
          <p className="eyebrow">Experience</p>
          <div className="xp">
            {data.experience.map((e) => (
              <div className="xp__row" key={`${e.org}-${e.period}`}>
                <div className="xp__when">{e.period}</div>
                <div>
                  <h3 className="xp__org">{e.org}</h3>
                  <p className="xp__role">{e.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap" id="skills">
          <p className="eyebrow">Skills</p>
          <div className="skills">
            {data.skills.map((s) => (
              <div className="row" key={s.category}>
                <div className="k">{s.category}</div>
                <div className="v">{s.items.join(", ")}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap contact" id="contact">
          <p className="eyebrow">Contact</p>
          <h2>Let’s build something.</h2>
          <div className="clist">
            <a href={`mailto:${p.email}`}><span className="k">Email</span><span className="v">{p.email}</span><span className="go">↗</span></a>
            <a href={p.links.github} target="_blank" rel="noopener"><span className="k">GitHub</span><span className="v">github.com/ekaynac</span><span className="go">↗</span></a>
            <a href={p.links.linkedin} target="_blank" rel="noopener"><span className="k">LinkedIn</span><span className="v">linkedin.com/in/enes-kaynakci</span><span className="go">↗</span></a>
          </div>
          <div className="foot"><span>© 2026 {p.name} — {p.location}</span><span>⟡</span></div>
        </section>
      </main>
    </>
  );
}
