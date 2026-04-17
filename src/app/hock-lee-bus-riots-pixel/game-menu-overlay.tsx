"use client";

const MENU_FONT = "\"PPNeueBit Bold\", \"PPNeueBit\", Arial, sans-serif";

type GameMenuOverlayProps = {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (route: string) => void;
};

export function GameMenuOverlay({
    isOpen,
    onClose,
    onNavigate,
}: GameMenuOverlayProps) {
    if (!isOpen) return null;

    return (
        <div
            className="absolute inset-0 flex items-center justify-center bg-black/75 p-6"
            style={{ zIndex: 120 }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-[680px]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="game-menu-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    aria-label="Close menu"
                    className="pixel-corners flex h-12 w-12 items-center justify-center border border-[#7a1010] bg-[#d94141] text-2xl leading-none text-[#fff4dc]"
                    style={{ position: "absolute", top: -24, right: -24, zIndex: 1 }}
                    onClick={onClose}
                >
                    ×
                </button>
                <div
                    className="pixel-corners w-full border border-[#9d4a1d] bg-[#ed7c42] p-6 text-[#2a1400]"
                    style={{ fontFamily: MENU_FONT }}
                >
                    <div id="game-menu-title" className="artifact-label text-center text-4xl sm:text-6xl">
                        Pause Menu
                    </div>
                    <div className="mt-6 flex flex-col items-center justify-center gap-4">
                        <button
                            type="button"
                            className="artifact-button pixel-corners w-full max-w-[600px] rounded-full border border-[#2a1400] bg-[#ffe7b0] px-6 py-3 text-lg uppercase tracking-[0.16em] text-[#2a1400] sm:text-2xl"
                            onClick={() => onNavigate("/hock-lee-bus-riots-pixel")}
                        >
                            Back to Start
                        </button>
                        <button
                            type="button"
                            className="artifact-button pixel-corners w-full max-w-[600px] rounded-full border border-[#2a1400] bg-[#ffe7b0] px-6 py-3 text-lg uppercase tracking-[0.16em] text-[#2a1400] sm:text-2xl"
                            onClick={() => onNavigate("/hock-lee-bus-riots-pixel/choose-your-character")}
                        >
                            Choose Another Character
                        </button>
                        <button
                            type="button"
                            className="artifact-button pixel-corners w-full max-w-[600px] rounded-full border border-[#2a1400] bg-[#2a1400] px-6 py-3 text-lg uppercase tracking-[0.16em] text-[#fff4dc] sm:text-2xl"
                            onClick={() => onNavigate("/")}
                        >
                            Leave Game
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
