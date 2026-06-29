import { data } from "../data";

export function Contact() {
  return (
    <section className="contact" aria-labelledby="contact-h">
      <h2 id="contact-h">Contact</h2>
      <p>
        <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a> ·{" "}
        <a href={data.profile.links.github}>GitHub</a> ·{" "}
        <a href={data.profile.links.linkedin}>LinkedIn</a>
      </p>
    </section>
  );
}
