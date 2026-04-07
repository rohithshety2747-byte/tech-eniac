import localFont from "next/font/local";

const eventFont = localFont({
  src: "../../public/font.otf",
});

const bootLines = [
  "[ OK ] INIT_CORE_SYSTEM",
  "[ OK ] MOUNTING_FILESYSTEM",
  "[ OK ] ESTABLISHING_UPLINK",
  "[ OK ] VERIFYING_SIGNAL_PATH",
];

export default function Loading() {
  return (
    <main className="terminal-loader-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-10 text-[#16f2b3]">
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(20,255,180,0.08)_1px,transparent_1px)] [background-size:100%_4px]" />

      <section className="terminal-loader-stage relative z-10 w-full max-w-md">
        <div className="space-y-10">
          <div className="space-y-1 font-mono text-[12px] uppercase tracking-[0.18em] text-[#19e0aa] sm:text-[13px]">
            {bootLines.map((line, index) => (
              <p
                key={line}
                className="terminal-loader-line whitespace-nowrap opacity-0"
                style={{ animationDelay: `${420 + index * 520}ms` }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[#118c69]/95">
              <span className={eventFont.className}>SYSTEM_LOAD</span>
              <span className="terminal-loader-percent">100%</span>
            </div>

            <div className="h-5 overflow-hidden border border-[#0f7f5f] bg-[#00120d]">
              <div className="terminal-loader-bar h-full w-full origin-left bg-[repeating-linear-gradient(90deg,#13d9a2_0,#13d9a2_10px,#11c393_10px,#11c393_12px)]" />
            </div>

            <p className="terminal-loader-status font-mono text-[10px] uppercase tracking-[0.18em] text-[#118c69]">
              NEURAL_LINK_SYNCHRONIZED
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
