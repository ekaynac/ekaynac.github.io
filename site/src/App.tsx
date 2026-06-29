import { MorphProvider } from "./morph/MorphProvider";
import "./morph/tokens.css";
import { Hero } from "./sections/Hero";
import { Work } from "./sections/Work";
import { Experience } from "./sections/Experience";
import { Lines } from "./sections/Lines";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <MorphProvider>
      <main>
        <Hero />
        <Work />
        <Experience />
        <Lines />
        <About />
        <Contact />
      </main>
    </MorphProvider>
  );
}
