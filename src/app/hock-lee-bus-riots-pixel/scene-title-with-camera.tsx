"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type SceneBackgroundReference = {
  extraContent?: {
    eyebrow?: string;
    panels?: Array<{
      title: string;
      body: string;
    }>;
    footer?: string;
  };
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  caption?: string;
  additionalImages?: Array<{
    extraContent?: {
      eyebrow?: string;
      panels?: Array<{
        title: string;
        body: string;
      }>;
      footer?: string;
    };
    title?: string;
    description?: string;
    imageSrc?: string;
    imageAlt?: string;
    caption?: string;
  }>;
};

type SceneTitleWithCameraProps = {
  children: ReactNode;
  wrapperClassName?: string;
  titleClassName?: string;
};

type SceneCameraButtonProps = {
  reference?: SceneBackgroundReference;
  onOpen?: () => void;
  onClose?: () => void;
  disableImplicitClose?: boolean;
  buttonAriaLabel?: string;
  className?: string;
  iconClassName?: string;
  iconSrc?: string;
  closeButtonClassName?: string;
  lightboxVariant?: "default" | "easterEgg";
};

const LIGHTBOX_FONT = "\"PPNeueBit Bold\", \"PPNeueBit\", Arial, sans-serif";

const joinClasses = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

export function SceneTitleWithCamera({
  children,
  wrapperClassName,
  titleClassName,
}: SceneTitleWithCameraProps) {
  return (
    <div className={joinClasses("pixel-corners--wrapper", wrapperClassName)}>
      <div className={joinClasses("pixel-corners scene-title", titleClassName)}>{children}</div>
    </div>
  );
}

export function SceneCameraButton({
  reference,
  onOpen,
  onClose,
  disableImplicitClose = false,
  buttonAriaLabel = "Open lightbox",
  className,
  iconClassName,
  iconSrc = "/icons/camera.png",
  closeButtonClassName,
  lightboxVariant = "default",
}: SceneCameraButtonProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isEasterEggVariant = lightboxVariant === "easterEgg";
  const lightboxImages = [
    {
      extraContent: reference?.extraContent,
      title: reference?.title,
      description: reference?.description,
      imageSrc: reference?.imageSrc,
      imageAlt: reference?.imageAlt,
      caption: reference?.caption,
    },
    ...(reference?.additionalImages ?? []),
  ].filter((item) => {
    const hasPanels = (item.extraContent?.panels?.length ?? 0) > 0;
    return Boolean(
      item.imageSrc ||
      item.title ||
      item.description ||
      item.caption ||
      item.extraContent?.eyebrow ||
      item.extraContent?.footer ||
      hasPanels
    );
  });
  const activeImage = lightboxImages[activeImageIndex];
  const activePanels = activeImage?.extraContent?.panels ?? [];
  const hasTimelineContent =
    activePanels.length > 0 ||
    Boolean(activeImage?.extraContent?.eyebrow || activeImage?.extraContent?.footer);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (disableImplicitClose) {
        return;
      }
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disableImplicitClose, isLightboxOpen]);

  if (lightboxImages.length === 0) {
    return null;
  }

  const lightboxTitle = activeImage?.title ?? "Background source image";
  const lightboxDescription =
    activeImage?.description ??
    "Archival or source photography for this scene will appear here once the reference image is linked.";
  const lightboxCaption =
    activeImage?.caption ?? "Archival reference details are still being added for this scene.";
  const lightboxContent = isLightboxOpen ? (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(7,11,20,0.82)] px-4 py-6"
      onClick={() => {
        if (disableImplicitClose) return;
        setIsLightboxOpen(false);
      }}
      role="dialog"
    >
      <div
        className={joinClasses(
          "w-full",
          isEasterEggVariant ? "max-w-4xl" : "max-w-5xl"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pixel-corners--wrapper">
          <div
            className={joinClasses(
              "pixel-corners max-h-[88vh] overflow-hidden px-5 py-5 sm:px-7 sm:py-6",
              isEasterEggVariant
                ? "bg-[#123c7a] text-[#f3f8ff]"
                : "bg-[#120a06] text-[#fff4dc]"
            )}
            style={{ fontFamily: LIGHTBOX_FONT }}
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className={joinClasses(
                  "min-w-0 flex-1",
                  isEasterEggVariant ? "max-w-[34rem]" : undefined
                )}
              >
                <div
                  className={joinClasses(
                    "artifact-label",
                    isEasterEggVariant ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl"
                  )}
                >
                  {lightboxTitle}
                </div>
                <p
                  className={joinClasses(
                    "mt-3 leading-relaxed",
                    isEasterEggVariant
                      ? "max-w-[32rem] text-lg text-[#e8f2ff] sm:text-[1.35rem]"
                      : "max-w-3xl text-base text-[#f3e2c1] sm:text-[1.02rem]"
                  )}
                >
                  {lightboxDescription}
                </p>
              </div>
              <div className="relative shrink-0">
                <button
                  aria-label="Close lightbox"
                  className={joinClasses(
                    isEasterEggVariant
                      ? "pixel-corners flex h-12 w-12 items-center justify-center border border-[#7db8ff] bg-[#0e2d60] text-2xl leading-none text-[#f3f8ff]"
                      : "pixel-corners flex h-12 w-12 items-center justify-center border border-[#7a1010] bg-[#d94141] text-2xl leading-none text-[#fff4dc]",
                    closeButtonClassName
                  )}
                  onClick={() => {
                    onClose?.();
                    setIsLightboxOpen(false);
                  }}
                  style={{ fontFamily: LIGHTBOX_FONT }}
                  type="button"
                >
                  ×
                </button>
                {disableImplicitClose ? (
                  <div className="absolute right-full top-1/2 z-[2] mr-6 -translate-y-1/2">
                    <div className="scene-onboarding-callout scene-onboarding-callout--right">
                      <div className="scene-onboarding-callout__bubble pixel-corners">
                        <span className="scene-onboarding-callout__text">Close the photo</span>
                      </div>
                      <span
                        aria-hidden="true"
                        className="scene-onboarding-callout__arrow scene-onboarding-callout__arrow--right"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {activeImage?.imageSrc ? (
              <div className="mt-5">
                <Image
                  alt={activeImage.imageAlt ?? "Source image for this scene background"}
                  className="block max-h-[56vh] w-full object-contain"
                  draggable={false}
                  height={1200}
                  src={activeImage.imageSrc}
                  unoptimized
                  width={1600}
                />
                <p
                  className={joinClasses(
                    "mt-3 leading-relaxed",
                    isEasterEggVariant
                      ? "max-w-[32rem] text-base text-[#dbe9ff] sm:text-[1.05rem]"
                      : "text-sm text-[#e7c98f] sm:text-[0.98rem]"
                  )}
                >
                  {lightboxCaption}
                </p>
                {lightboxImages.length > 1 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lightboxImages.map((image, index) => (
                      <button
                        key={`${image.imageSrc}-${index}`}
                        className={joinClasses(
                          "pixel-corners border px-3 py-2 text-left text-sm leading-tight transition-colors",
                          index === activeImageIndex
                            ? isEasterEggVariant
                              ? "border-[#9fd0ff] bg-[#0c2b59] text-[#f3f8ff]"
                              : "border-[#ffd24a] bg-[#4b2d11] text-[#fff4dc]"
                            : isEasterEggVariant
                              ? "border-[#4f83c0] bg-[#10254d] text-[#dbe9ff] hover:border-[#9fd0ff]"
                              : "border-[#8a6230] bg-[#22140c] text-[#f3e2c1] hover:border-[#c4932c]"
                        )}
                        onClick={() => setActiveImageIndex(index)}
                        style={{ fontFamily: LIGHTBOX_FONT }}
                        type="button"
                      >
                        {image.title ?? `Photo ${index + 1}`}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : hasTimelineContent ? (
              <div
                className={joinClasses(
                  "mt-5 space-y-4",
                  isEasterEggVariant ? "max-w-[34rem]" : undefined
                )}
              >
                {activeImage?.extraContent?.eyebrow ? (
                  <div
                    className={joinClasses(
                      "artifact-label",
                      isEasterEggVariant
                        ? "text-2xl text-[#d8ebff] sm:text-4xl"
                        : "text-xl text-[#ffd24a] sm:text-3xl"
                    )}
                  >
                    {activeImage.extraContent.eyebrow}
                  </div>
                ) : null}
                <div className="grid gap-3">
                  {activePanels.map((panel) => (
                    <div key={`${panel.title}-${panel.body}`} className="pixel-corners--wrapper">
                      <div
                        className={joinClasses(
                          "pixel-corners px-4 py-4",
                          isEasterEggVariant
                            ? "border border-[#5c92cf] bg-[#0d2d5f]"
                            : "border border-[#8a6230] bg-[#22140c]"
                        )}
                      >
                        <div
                          className={joinClasses(
                            "artifact-label",
                            isEasterEggVariant
                              ? "text-2xl text-[#f3f8ff] sm:text-3xl"
                              : "text-xl text-[#ffd24a] sm:text-2xl"
                          )}
                        >
                          {panel.title}
                        </div>
                        <p
                          className={joinClasses(
                            "mt-2 leading-relaxed",
                            isEasterEggVariant
                              ? "text-base text-[#dbe9ff] sm:text-lg"
                              : "text-sm text-[#f3e2c1] sm:text-base"
                          )}
                        >
                          {panel.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {activeImage?.extraContent?.footer ? (
                  <p
                    className={joinClasses(
                      "leading-relaxed",
                      isEasterEggVariant
                        ? "max-w-[32rem] text-base text-[#dbe9ff] sm:text-[1.05rem]"
                        : "text-sm text-[#e7c98f] sm:text-[0.98rem]"
                    )}
                  >
                    {activeImage.extraContent.footer}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="mt-5 pixel-corners--wrapper">
                <div
                  className={joinClasses(
                    "pixel-corners border-2 border-dashed px-5 py-8 text-center",
                    isEasterEggVariant
                      ? "border-[#7db8ff] bg-[#0d2d5f]"
                      : "border-[#c4932c] bg-[#22140c]"
                  )}
                >
                  <div
                    className={joinClasses(
                      "artifact-label",
                      isEasterEggVariant ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl"
                    )}
                  >
                    Reference photo coming soon
                  </div>
                  <p
                    className={joinClasses(
                      "mx-auto mt-3 leading-relaxed",
                      isEasterEggVariant
                        ? "max-w-[30rem] text-base text-[#dbe9ff] sm:text-lg"
                        : "max-w-2xl text-sm text-[#f3e2c1] sm:text-base"
                    )}
                  >
                    The archival source image for this scene has not been linked yet. A temporary
                    placeholder remains until that material is added.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        aria-label={buttonAriaLabel}
        className={joinClasses(
          "group inline-flex shrink-0 items-center justify-center p-1",
          className
        )}
        onClick={() => {
          onOpen?.();
          setActiveImageIndex(0);
          setIsLightboxOpen(true);
        }}
        type="button"
      >
        <Image
          alt=""
          aria-hidden="true"
          className={joinClasses(
            "pointer-events-none h-8 w-8 select-none object-contain transition-[filter] duration-150 [filter:drop-shadow(2px_0_0_#ffd24a)_drop-shadow(-2px_0_0_#ffd24a)_drop-shadow(0_2px_0_#ffd24a)_drop-shadow(0_-2px_0_#ffd24a)_drop-shadow(2px_2px_0_#ffd24a)_drop-shadow(-2px_2px_0_#ffd24a)_drop-shadow(2px_-2px_0_#ffd24a)_drop-shadow(-2px_-2px_0_#ffd24a)] group-hover:[filter:drop-shadow(2px_0_0_#4da3ff)_drop-shadow(-2px_0_0_#4da3ff)_drop-shadow(0_2px_0_#4da3ff)_drop-shadow(0_-2px_0_#4da3ff)_drop-shadow(2px_2px_0_#4da3ff)_drop-shadow(-2px_2px_0_#4da3ff)_drop-shadow(2px_-2px_0_#4da3ff)_drop-shadow(-2px_-2px_0_#4da3ff)] sm:h-10 sm:w-10",
            iconClassName
          )}
          draggable={false}
          height={40}
          src={iconSrc}
          style={{ imageRendering: "pixelated" }}
          width={40}
        />
      </button>
      {typeof document !== "undefined" && lightboxContent
        ? createPortal(lightboxContent, document.body)
        : null}
    </>
  );
}
