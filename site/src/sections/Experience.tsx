import { data } from "../data";

export function Experience() {
  return (
    <section className="experience" aria-labelledby="exp-h">
      <h2 id="exp-h">Experience</h2>
      <ul className="exp-list">
        {data.experience.map((e) => (
          <li key={`${e.org}-${e.period}`}>
            <div className="exp-head"><strong>{e.role}</strong>, {e.org} <span className="period">{e.period}</span></div>
            <ul>{e.highlights.slice(0, 2).map((h, i) => <li key={i}>{h}</li>)}</ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
