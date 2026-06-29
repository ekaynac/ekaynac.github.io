import { data } from "../data";
import { useMorph } from "../morph/useMorph";
import { useGenerateText } from "../hooks/useGenerateText";
import { MorphControl } from "../morph/MorphControl";

export function Hero() {
  const { t } = useMorph();
  const pair = data.heroPairs[0];
  const phrase = t < 0.5 ? pair.engineer : pair.poet;
  const shown = useGenerateText(phrase);
  return (
    <section className="hero" aria-labelledby="hero-name">
      <h1 id="hero-name">{data.profile.name}</h1>
      <p className="hero-line" aria-live="polite">{shown}</p>
      <p className="hero-tagline">{data.profile.title} · {data.profile.location}</p>
      <MorphControl />
      <nav className="hero-links" aria-label="Profile links">
        <a href={data.profile.links.github}>GitHub</a>
        <a href={data.profile.links.linkedin}>LinkedIn</a>
        <a href="/cv.pdf">CV</a>
        <a href={`mailto:${data.profile.email}`}>Email</a>
      </nav>
    </section>
  );
}
