"use client";

import dynamic from "next/dynamic";
import localFont from "next/font/local";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LetterGlitch = dynamic(
  () => import("@/components/LetterGlitch"),
  { ssr: false }
);

const eventFont = localFont({
  src: "../../public/font.otf",
});

export function HomePage() {
  const router = useRouter();

  const primaryUrl = "https://forms.gle/3wNJRPjrAwC3Ph119";
  const secondaryUrl = "https://drive.google.com/file/d/1RSD0Ixx-B-WxD0V81hUQyPg3N92Rhzrp/view?usp=sharing";

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <LetterGlitch
          className="h-full w-full"
          centerVignette
          glitchColors={["#a0d8ff", "#7cc8ff", "#4aa8ff"]}
          glitchSpeed={100}
          smooth
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.72)_100%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
        <div className="flex w-full max-w-[360px] flex-col items-center gap-6 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xs sm:max-w-[560px] md:max-w-[760px] lg:max-w-[980px] xl:max-w-[1120px]">
          <Image
            src="/logo.png"
            alt="IT-FEST logo"
            width={1600}
            height={220}
            priority
            className="h-auto w-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]"
          />

          <div className="flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              className="w-full sm:w-auto"
              onClick={() => router.push(primaryUrl)}
            >
              <span className={`${eventFont.className} text-sm`}>
                Register Here
              </span>
            </Button>
            <Button
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={() => router.push(secondaryUrl)}
            >
              <span className={`${eventFont.className} text-sm`}>
                View Brochure
              </span>
            </Button>
            <p className="max-w-3xl text-[10px] font-medium tracking-[0.18em] text-white/75 uppercase sm:text-xs">
              IT Fest | Innovation | Technology | Creativity
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
