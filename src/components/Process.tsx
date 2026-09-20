import { process as steps } from "@/data/services";
import { Reveal, SectionHead } from "./ui";

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container-x">
        <SectionHead eyebrow="How it works" title={<>From first call to live, in five clear steps.</>} />
        <ol className="grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.06} className="h-full">
              <div className="card relative h-full p-6">
                <span className="h-display text-5xl text-brand/90">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h-display mt-4 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.text}</p>
                <p className="mt-4 inline-block rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-muted">{s.duration}</p>
              </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
