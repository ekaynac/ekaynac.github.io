import { data } from "../data";

export function Lines() {
  return (
    <section className="lines" aria-labelledby="lines-h">
      <h2 id="lines-h">Lines</h2>
      <blockquote className="verse">
        {data.lines.verse.map((line, i) => <p key={i}>{line}</p>)}
      </blockquote>
      <p className="verse-note">{data.lines.note}</p>
    </section>
  );
}
