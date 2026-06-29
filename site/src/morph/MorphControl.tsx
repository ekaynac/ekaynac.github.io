import { useMorph } from "./useMorph";

const label = (t: number) => (t < 0.25 ? "engineer" : t > 0.75 ? "poet" : "engineer ⟷ poet");

export function MorphControl() {
  const { t, setT } = useMorph();
  const now = Math.round(t * 100);
  const onKey = (e: React.KeyboardEvent) => {
    const step = 0.05;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { setT(t + step); e.preventDefault(); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") { setT(t - step); e.preventDefault(); }
    else if (e.key === "Home") { setT(0); e.preventDefault(); }
    else if (e.key === "End") { setT(1); e.preventDefault(); }
  };
  return (
    <div className="morph-control">
      <span aria-hidden="true">engineer</span>
      <div
        role="slider"
        tabIndex={0}
        aria-label="Morph between engineer and poet"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={now}
        aria-valuetext={label(t)}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          const track = e.currentTarget.getBoundingClientRect();
          const move = (clientX: number) => setT((clientX - track.left) / track.width);
          move(e.clientX);
          const onMove = (ev: PointerEvent) => move(ev.clientX);
          const onUp = () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
          window.addEventListener("pointermove", onMove);
          window.addEventListener("pointerup", onUp);
        }}
        className="morph-track"
      >
        <div className="morph-fill" style={{ width: `${now}%` }} />
      </div>
      <span aria-hidden="true">poet</span>
    </div>
  );
}
