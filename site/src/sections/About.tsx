import { data } from "../data";

export function About() {
  return (
    <section className="about" aria-labelledby="about-h">
      <h2 id="about-h">About</h2>
      {data.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      <ul className="education">
        {data.about.education.map((ed) => (
          <li key={ed.org}><strong>{ed.credential}</strong>, {ed.org} <span className="period">{ed.period}</span></li>
        ))}
      </ul>
    </section>
  );
}
