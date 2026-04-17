"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CHARACTER_ROLE_LABELS } from "./character-content";
import type { CharacterCode } from "./scenes";
import { buildRoleAwareRoute } from "./story-data";
import { OUTRO_CUTSCENE_ROUTE } from "./story-paths";
import { useSelectedCharacterCode } from "./use-selected-character-code";

const lockFullscreenPage = () => {
  const { body, documentElement } = document;
  const previousHtmlOverflow = documentElement.style.overflow;
  const previousBodyOverflow = body.style.overflow;
  const previousHtmlHeight = documentElement.style.height;
  const previousBodyHeight = body.style.height;
  const previousBodyOverscroll = body.style.overscrollBehavior;

  documentElement.style.overflow = "hidden";
  body.style.overflow = "hidden";
  documentElement.style.height = "100%";
  body.style.height = "100%";
  body.style.overscrollBehavior = "none";

  return () => {
    documentElement.style.overflow = previousHtmlOverflow;
    body.style.overflow = previousBodyOverflow;
    documentElement.style.height = previousHtmlHeight;
    body.style.height = previousBodyHeight;
    body.style.overscrollBehavior = previousBodyOverscroll;
  };
};

type WhatReallyHappenedSlide = {
  alt: string;
  src: string;
};

type WhatReallyHappenedSlideSet = [
  WhatReallyHappenedSlide,
  WhatReallyHappenedSlide,
  WhatReallyHappenedSlide,
];

const buildWhatReallyHappenedSlidePath = (...segments: string[]) =>
  `/whatreallyahappened/${segments.map(encodeURIComponent).join("/")}`;

const WHAT_REALLY_HAPPENED_SLIDES: Record<CharacterCode, WhatReallyHappenedSlideSet> = {
  BW: [
    {
      alt: "Bus Worker ending screen 1",
      src: buildWhatReallyHappenedSlidePath(
        "Bus Worker",
        "png",
        "BusWorker-Ending Screen 01.png"
      ),
    },
    {
      alt: "Bus Worker ending screen 2",
      src: buildWhatReallyHappenedSlidePath(
        "Bus Worker",
        "png",
        "BusWorker-Ending Screen 02.png"
      ),
    },
    {
      alt: "Bus Worker ending screen 3",
      src: buildWhatReallyHappenedSlidePath(
        "Bus Worker",
        "png",
        "BusWorker-Ending Screen 03.png"
      ),
    },
  ],
  CIV: [
    {
      alt: "Civil Servant ending screen 1",
      src: buildWhatReallyHappenedSlidePath(
        "Civil Servant",
        "png",
        "Civil Servant-Ending Screen 01.png"
      ),
    },
    {
      alt: "Civil Servant ending screen 2",
      src: buildWhatReallyHappenedSlidePath(
        "Civil Servant",
        "png",
        "Civil Servant-Ending Screen 02.png"
      ),
    },
    {
      alt: "Civil Servant ending screen 3",
      src: buildWhatReallyHappenedSlidePath(
        "Civil Servant",
        "png",
        "Civil Servant-Ending Screen 03.png"
      ),
    },
  ],
  CS: [
    {
      alt: "Chinese Student ending screen 1",
      src: buildWhatReallyHappenedSlidePath(
        "Chinese Student",
        "png",
        "Student-Ending Screen 01.png"
      ),
    },
    {
      alt: "Chinese Student ending screen 2",
      src: buildWhatReallyHappenedSlidePath(
        "Chinese Student",
        "png",
        "Student-Ending Screen 02.png"
      ),
    },
    {
      alt: "Chinese Student ending screen 3",
      src: buildWhatReallyHappenedSlidePath(
        "Chinese Student",
        "png",
        "Student-Ending Screen 03.png"
      ),
    },
  ],
};

function WhatReallyHappenedCarousel({
  roleLabel,
  slides,
}: {
  roleLabel: string;
  slides: WhatReallyHappenedSlideSet;
}) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = slides[activeSlideIndex];
  const isFirstSlide = activeSlideIndex === 0;
  const isLastSlide = activeSlideIndex === slides.length - 1;

  const handlePreviousSlide = () => {
    setActiveSlideIndex((currentIndex) => {
      return currentIndex > 0 ? currentIndex - 1 : currentIndex;
    });
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((currentIndex) => {
      return currentIndex < slides.length - 1 ? currentIndex + 1 : currentIndex;
    });
  };

  return (
    <>
      <div className="hl-what-really-happened-image-shell">
        <div className="hl-what-really-happened-image-frame">
          <Image
            key={activeSlide.src}
            alt={activeSlide.alt}
            className="hl-what-really-happened-image"
            fill
            priority={activeSlideIndex === 0}
            sizes="(max-width: 640px) calc(100vw - 72px), (max-width: 960px) calc(100vw - 84px), 932px"
            src={activeSlide.src}
          />
        </div>
      </div>

      <div
        aria-label={`${roleLabel} ending screens`}
        className="hl-what-really-happened-carousel-nav"
        role="group"
      >
        <button
          aria-label={`Previous ${roleLabel} ending screen`}
          className="pixel-corners hl-character-select-mission-arrow hl-character-select-mission-arrow--prev"
          disabled={isFirstSlide}
          onClick={handlePreviousSlide}
          type="button"
        >
          <span
            aria-hidden="true"
            className="hl-character-select-mission-arrow-icon"
          />
        </button>
        <button
          aria-label={`Next ${roleLabel} ending screen`}
          className="pixel-corners hl-character-select-mission-arrow hl-character-select-mission-arrow--next"
          disabled={isLastSlide}
          onClick={handleNextSlide}
          type="button"
        >
          <span
            aria-hidden="true"
            className="hl-character-select-mission-arrow-icon"
          />
        </button>
      </div>
    </>
  );
}

export function WhatReallyHappenedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCharacter = useSelectedCharacterCode(searchParams.get("role"));
  const roleLabel = CHARACTER_ROLE_LABELS[selectedCharacter];
  const slides = WHAT_REALLY_HAPPENED_SLIDES[selectedCharacter];

  useEffect(() => {
    router.prefetch(buildRoleAwareRoute(OUTRO_CUTSCENE_ROUTE, selectedCharacter));
    router.prefetch("/hock-lee-bus-riots-pixel");
  }, [router, selectedCharacter]);

  useEffect(() => lockFullscreenPage(), []);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(buildRoleAwareRoute(OUTRO_CUTSCENE_ROUTE, selectedCharacter));
  };

  const handleExit = () => {
    router.push("/hock-lee-bus-riots-pixel");
  };

  return (
    <main className="hl-character-select-page hl-post-story-page">
      <div className="hl-character-select-stage hl-post-story-stage hl-what-really-happened-stage">
        <section className="hl-what-really-happened-layout">
          <div className="hl-what-really-happened-shell">
            <div className="hl-what-really-happened-panel">
              <WhatReallyHappenedCarousel
                key={selectedCharacter}
                roleLabel={roleLabel}
                slides={slides}
              />
            </div>
          </div>
        </section>

        <div className="hl-character-select-actions">
          <div className="pixel-corners--wrapper hl-character-select-action-shell hl-character-select-action-shell--back">
            <button
              className="pixel-corners hl-character-select-action hl-character-select-action--back"
              onClick={handleBack}
              type="button"
            >
              Back
            </button>
          </div>
          <div className="pixel-corners--wrapper hl-character-select-action-shell hl-character-select-action-shell--select">
            <button
              className="pixel-corners hl-character-select-action hl-character-select-action--select"
              onClick={handleExit}
              type="button"
            >
              Exit
            </button>
          </div>
        </div>

        <div className="hl-character-select-floor" aria-hidden="true" />
      </div>
    </main>
  );
}
