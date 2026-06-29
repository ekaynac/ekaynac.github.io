import { data } from "../data";

export function Work() {
  return (
    <section className="work" aria-labelledby="work-h">
      <h2 id="work-h">Work</h2>
      <div className="work-grid">
        {data.work.map((p) => (
          <article key={p.slug} className="project-card">
            <h3>{p.url ? <a href={p.url}>{p.name}</a> : p.name}{p.isPrivate && <span className="badge"> private</span>}</h3>
            <p>{p.oneLiner}</p>
            <ul className="tech">{p.tech.slice(0, 6).map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
