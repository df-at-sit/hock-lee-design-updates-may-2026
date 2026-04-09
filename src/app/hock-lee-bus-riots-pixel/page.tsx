import Link from "next/link";

const TITLE_FONT = "\"PPNeueBit Bold\", \"PPNeueBit\", Arial, sans-serif";
const PLAY_BUTTON_LABEL_STYLE = {
  color: "#2a1400",
  letterSpacing: "0.12em",
  textShadow: `
    -1px 0 0 #ffe45e,
    1px 0 0 #ffe45e,
    0 -1px 0 #ffe45e,
    0 1px 0 #ffe45e,
    0 0 8px rgba(255, 228, 94, 0.45)
  `,
} as const;

export default function HockLeeBusRiotsPixelPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background/hockleescenes/busdepot.png')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(16, 7, 3, 0.36) 0%, rgba(16, 7, 3, 0.6) 48%, rgba(16, 7, 3, 0.82) 100%)",
        }}
      />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl text-center">
          <div className="inline-block pixel-corners--wrapper shadow-[10px_10px_0_rgba(0,0,0,0.35)]">
            <div
              className="pixel-corners px-8 py-4"
              style={{
                background: "rgba(157, 74, 29, 0.9)",
              }}
            >
              <h1
                className="text-5xl leading-none text-[#fff4dc] sm:text-7xl"
                style={{ fontFamily: TITLE_FONT }}
              >
                HOCK LEE BUS RIOTS
              </h1>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-2xl pixel-corners--wrapper shadow-[10px_10px_0_rgba(0,0,0,0.35)]">
            <div
              className="pixel-corners px-6 py-5 text-[#fff6eb]"
              style={{
                background: "rgba(42, 20, 0, 0.82)",
                fontFamily: TITLE_FONT,
              }}
            >
              <p className="text-2xl leading-tight sm:text-3xl">
                In 1955, labor unrest at the Hock Lee Amalgamated Bus Company grew into one of
                Singapore&apos;s most significant flashpoints of anti-colonial resistance. Workers
                striking for better conditions drew support from students, unions, and political
                activists across the city. Tensions escalated as police, protesters, and
                bystanders clashed in the streets around the bus depot. This story follows how a
                labor dispute became a defining political crisis in postwar Singapore.
              </p>
            </div>
          </div>

          <Link
            href="/hock-lee-bus-riots-pixel/choose-your-character"
            className="pixel-corners--wrapper mt-8 inline-block uppercase transition-transform duration-150 hover:-translate-y-1"
            style={{ fontFamily: TITLE_FONT }}
          >
            <span
              className="pixel-corners block px-8 py-4 text-2xl shadow-[10px_10px_0_rgba(0,0,0,0.35)] sm:text-3xl"
              style={{ background: "#f0b24d" }}
            >
              <span
                className="inline-flex items-center gap-3"
                style={PLAY_BUTTON_LABEL_STYLE}
              >
                <span>PLAY</span>
                <span aria-hidden="true">↵</span>
              </span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
