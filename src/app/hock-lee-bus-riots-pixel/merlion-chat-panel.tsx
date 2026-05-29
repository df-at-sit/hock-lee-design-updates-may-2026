"use client";

import { useEffect, useRef, useState } from "react";

export const MERLION_CHAT_PROMPTS = [
    "About the Story",
    "About Game Play",
    "Ask for a Hint",
] as const;

export const MERLION_PROMPT_QUESTIONS: Record<
    (typeof MERLION_CHAT_PROMPTS)[number],
    string
> = {
    "About the Story": "Tell me about the story in this scene.",
    "About Game Play": "How should I play this scene?",
    "Ask for a Hint": "Can I have a hint?",
};

export type MerlionChatMessage = {
    id: string;
    sender: "merlion" | "user";
    text: string;
};

type MerlionChatPanelProps = {
    id?: string;
    playerName: string;
    introMessage: string;
    isClosing: boolean;
    onClose: () => void;
    buildReply: (question: string) => string;
};

export function MerlionChatPanel({
    id,
    playerName,
    introMessage,
    isClosing,
    onClose,
    buildReply,
}: MerlionChatPanelProps) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<MerlionChatMessage[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messages.length === 0) return;
        window.requestAnimationFrame(() => {
            const element = scrollRef.current;
            if (!element) return;
            element.scrollTop = element.scrollHeight;
        });
    }, [messages.length]);

    const sendMessage = (presetQuestion?: string) => {
        const text = (presetQuestion ?? input).trim();
        if (!text) return;
        const reply = buildReply(text);
        const baseId = Date.now();
        setMessages((prev) => [
            ...prev,
            { id: `user-${baseId}`, sender: "user", text },
            { id: `merlion-${baseId + 1}`, sender: "merlion", text: reply },
        ]);
        setInput("");
    };

    return (
        <section
            id={id}
            className={`hl-merlion-chat-panel-frame double-one-step ${isClosing ? "hl-merlion-chat-panel-frame--closing" : ""}`}
            aria-label="Game Master Merlion chat"
            data-ui="true"
        >
            <div className="hl-merlion-chat-panel one-step-border__content">
                <header className="hl-merlion-chat-panel__header">
                    <img
                        src="/character-profile-pics/merlion.png"
                        alt=""
                        aria-hidden="true"
                        className="hl-merlion-chat-panel__avatar"
                        draggable={false}
                    />
                    <div className="hl-merlion-chat-panel__title">
                        Game Master Merlion
                    </div>
                    <button
                        type="button"
                        className="hl-merlion-chat-panel__close"
                        aria-label="Close Game Master Merlion chat"
                        onClick={(event) => {
                            event.stopPropagation();
                            onClose();
                        }}
                    >
                        ×
                    </button>
                </header>
                <div className="hl-merlion-chat-panel__rule" />
                <div
                    className="hl-merlion-chat-panel__messages"
                    ref={scrollRef}
                    aria-live="polite"
                >
                    <div className="hl-merlion-chat-panel__intro">
                        <p>
                            Hello, {playerName}. I&apos;m Game Master Merlion. I&apos;m
                            here to guide you through Singapore&apos;s past, answer your
                            questions, and help you understand the people, places, and
                            events you meet in the game.
                        </p>
                        <p>{introMessage}</p>
                    </div>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`hl-merlion-chat-panel__bubble hl-merlion-chat-panel__bubble--${message.sender}`}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className="hl-merlion-chat-panel__prompts">
                    {MERLION_CHAT_PROMPTS.map((prompt) => (
                        <button
                            key={prompt}
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                sendMessage(MERLION_PROMPT_QUESTIONS[prompt]);
                            }}
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
                <form
                    className="hl-merlion-chat-panel__composer"
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        sendMessage();
                    }}
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        placeholder="Type a question to Game Master"
                        aria-label="Type a question to Game Master Merlion"
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>
    );
}
