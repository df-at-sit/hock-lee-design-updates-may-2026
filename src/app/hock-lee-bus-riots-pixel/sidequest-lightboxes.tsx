"use client";

import { useEffect } from "react";
import type { SceneSideQuest } from "./base-scene-shell";
import { STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID } from "./sidequest-state";

type QuestMenuLightboxProps = {
    sideQuests: SceneSideQuest[];
    completedSideQuestActions: Record<string, string[]>;
    onClose: () => void;
    onQuestSelect: (sideQuestId: string) => void;
};

type SideQuestLightboxProps = {
    sideQuest: SceneSideQuest;
    completedActionIds: string[];
    isAccepted: boolean;
    onAccept?: () => void;
    onClose: () => void;
    onBack?: () => void;
};

type QuestMenuRow = {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    progressLabel?: string;
    statusLabel: "ON QUEST" | "COMPLETED";
    sideQuestId?: string;
};

const QUEST_MENU_PLACEHOLDER_ROWS: QuestMenuRow[] = [
    {
        id: "student-answer-teacher",
        title: "Answer The Teacher",
        description:
            "Question the manifesto artefact to uncover the information your teacher needs.",
        imageSrc: "/npcfigures/Teacher/teacher_0001.webp",
        imageAlt: "Teacher",
        progressLabel: "1/2",
        statusLabel: "ON QUEST",
    },
    {
        id: "student-dear-journalist",
        title: "Dear Journalist",
        description:
            "Tell the journalist about the riot through the eyes of students and workers.",
        imageSrc: "/npcfigures/journalists/Asian Reporter_0001.webp",
        imageAlt: "Journalist",
        statusLabel: "COMPLETED",
    },
];

const buildQuestMenuRow = (
    sideQuest: SceneSideQuest,
    completedActionIds: string[]
): QuestMenuRow => {
    const completedCount = Math.min(completedActionIds.length, sideQuest.actions.length);
    const isComplete = sideQuest.actions.every((action) =>
        completedActionIds.includes(action.id)
    );
    const progressCount = isComplete ? completedCount : Math.max(1, completedCount);

    if (sideQuest.id === STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID) {
        return {
            id: `${sideQuest.id}-menu-row`,
            title: "Hungry Bus Worker",
            description:
                "Bus workers have been starving for days. Please help the bus worker to get food using Tingkat.",
            imageSrc:
                sideQuest.previewNpcImage ??
                "/npcfigures/busdepotworker2/Bus Worker02_South.webp",
            imageAlt: sideQuest.previewNpcAlt ?? "Hungry bus worker",
            progressLabel: isComplete
                ? undefined
                : `${progressCount}/${sideQuest.actions.length}`,
            statusLabel: isComplete ? "COMPLETED" : "ON QUEST",
            sideQuestId: sideQuest.id,
        };
    }

    return {
        id: `${sideQuest.id}-menu-row`,
        title: sideQuest.title,
        description: sideQuest.description,
        imageSrc:
            sideQuest.previewNpcImage ??
            sideQuest.previewImage ??
            sideQuest.iconSrc ??
            "/icons/quest.png",
        imageAlt: sideQuest.previewNpcAlt ?? sideQuest.previewAlt ?? sideQuest.iconAlt ?? "",
        progressLabel: isComplete
            ? undefined
            : `${progressCount}/${sideQuest.actions.length}`,
        statusLabel: isComplete ? "COMPLETED" : "ON QUEST",
        sideQuestId: sideQuest.id,
    };
};

export function QuestMenuLightbox({
    sideQuests,
    completedSideQuestActions,
    onClose,
    onQuestSelect,
}: QuestMenuLightboxProps) {
    useEffect(() => {
        const handleQuestMenuKeys = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            onClose();
        };

        window.addEventListener("keydown", handleQuestMenuKeys);
        return () => window.removeEventListener("keydown", handleQuestMenuKeys);
    }, [onClose]);

    const menuRows = [
        ...sideQuests.map((sideQuest) =>
            buildQuestMenuRow(
                sideQuest,
                completedSideQuestActions[sideQuest.id] ?? []
            )
        ),
        ...QUEST_MENU_PLACEHOLDER_ROWS,
    ];

    return (
        <div
            className="sidequest-lightbox-overlay quest-menu-lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quest-menu-lightbox-title"
            data-ui="true"
        >
            <div className="quest-menu-lightbox-shell">
                <div className="quest-menu-lightbox-frame double-one-step">
                    <div className="quest-menu-lightbox-panel one-step-border__content">
                        <header className="quest-menu-lightbox-header">
                            <div className="quest-menu-lightbox-heading">
                                <img
                                    src="/icons/quest.png"
                                    alt=""
                                    aria-hidden="true"
                                    className="quest-menu-lightbox-heading-icon"
                                    draggable={false}
                                />
                                <h2 id="quest-menu-lightbox-title">QUESTS</h2>
                            </div>
                            <button
                                type="button"
                                className="quest-menu-lightbox-close hl-pixel-close-button"
                                onClick={onClose}
                                aria-label="Close quest menu"
                            >
                                ×
                            </button>
                        </header>

                        <div className="quest-menu-lightbox-list">
                            {menuRows.map((row) => {
                                const isComplete = row.statusLabel === "COMPLETED";
                                const content = (
                                    <>
                                        <span className="quest-menu-lightbox-card-image-shell">
                                            <img
                                                src={row.imageSrc}
                                                alt={row.imageAlt}
                                                className="quest-menu-lightbox-card-image"
                                                draggable={false}
                                            />
                                        </span>
                                        <span className="quest-menu-lightbox-card-copy">
                                            <span className="quest-menu-lightbox-card-title">
                                                {row.title}
                                            </span>
                                            <span className="quest-menu-lightbox-card-description">
                                                {row.description}
                                            </span>
                                        </span>
                                        <span
                                            className={`quest-menu-lightbox-status ${isComplete
                                                ? "quest-menu-lightbox-status--complete"
                                                : "quest-menu-lightbox-status--active"
                                                }`}
                                        >
                                            {row.progressLabel ? (
                                                <span className="quest-menu-lightbox-status-progress">
                                                    {row.progressLabel}
                                                </span>
                                            ) : null}
                                            <span className="quest-menu-lightbox-status-label">
                                                {row.statusLabel}
                                            </span>
                                        </span>
                                    </>
                                );

                                if (row.sideQuestId) {
                                    return (
                                        <button
                                            key={row.id}
                                            type="button"
                                            className={`quest-menu-lightbox-card ${isComplete
                                                ? "quest-menu-lightbox-card--complete"
                                                : ""
                                                }`}
                                            onClick={() => onQuestSelect(row.sideQuestId!)}
                                            aria-label={`Open quest: ${row.title}`}
                                        >
                                            {content}
                                        </button>
                                    );
                                }

                                return (
                                    <div
                                        key={row.id}
                                        className={`quest-menu-lightbox-card ${isComplete
                                            ? "quest-menu-lightbox-card--complete"
                                            : ""
                                            }`}
                                    >
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SideQuestLightbox({
    sideQuest,
    completedActionIds,
    isAccepted,
    onAccept,
    onClose,
    onBack,
}: SideQuestLightboxProps) {
    useEffect(() => {
        const handleSideQuestKeys = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            onClose();
        };

        window.addEventListener("keydown", handleSideQuestKeys);
        return () => window.removeEventListener("keydown", handleSideQuestKeys);
    }, [onClose]);

    const isDone = sideQuest.actions.every((action) =>
        completedActionIds.includes(action.id)
    );

    return (
        <div
            className="sidequest-lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sidequest-lightbox-title"
            data-ui="true"
        >
            <div className="sidequest-lightbox-shell">
                <div className="sidequest-lightbox-frame double-one-step">
                    <div className="sidequest-lightbox-panel one-step-border__content">
                        {onBack ? (
                            <button
                                type="button"
                                className="sidequest-lightbox-back hl-pixel-close-button"
                                onClick={onBack}
                                aria-label="Back to quest menu"
                            >
                                ←
                            </button>
                        ) : null}
                        <button
                            type="button"
                            className="sidequest-lightbox-close hl-pixel-close-button"
                            onClick={onClose}
                            aria-label="Close quest lightbox"
                        >
                            ×
                        </button>
                        <div className="sidequest-lightbox-kicker">
                            {sideQuest.iconSrc ? (
                                <img
                                    src={sideQuest.iconSrc}
                                    alt={sideQuest.iconAlt ?? ""}
                                    aria-hidden={sideQuest.iconAlt ? undefined : true}
                                />
                            ) : null}
                            <span>{sideQuest.typeLabel}</span>
                        </div>
                        <h2 id="sidequest-lightbox-title">{sideQuest.title}</h2>
                        {isDone ? (
                            <div className="sidequest-lightbox-done-banner">DONE</div>
                        ) : null}
                        {sideQuest.previewImage ? (
                            <div className="sidequest-lightbox-preview">
                                <img
                                    src={sideQuest.previewImage}
                                    alt={sideQuest.previewAlt ?? ""}
                                    className="sidequest-lightbox-preview__background"
                                />
                                {sideQuest.previewNpcImage ? (
                                    <img
                                        src={sideQuest.previewNpcImage}
                                        alt={sideQuest.previewNpcAlt ?? ""}
                                        className="sidequest-lightbox-preview__npc"
                                    />
                                ) : null}
                            </div>
                        ) : null}
                        <p className="sidequest-lightbox-description">
                            {sideQuest.description}
                        </p>
                        <div className="sidequest-lightbox-actions-label">Actions</div>
                        <ol className="sidequest-lightbox-actions">
                            {sideQuest.actions.map((action, index) => {
                                const isActionComplete = completedActionIds.includes(action.id);

                                return (
                                    <li
                                        key={action.id}
                                        className={
                                            isActionComplete
                                                ? "sidequest-lightbox-action--done"
                                                : undefined
                                        }
                                    >
                                        <span className="sidequest-lightbox-action-number">
                                            {isActionComplete ? "✓" : index + 1}
                                        </span>
                                        {action.iconSrc ? (
                                            <img src={action.iconSrc} alt={action.iconAlt ?? ""} />
                                        ) : null}
                                        <span>{action.label}</span>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
                {!isAccepted ? (
                    <div className="sidequest-lightbox-buttons">
                        <button
                            type="button"
                            className="sidequest-lightbox-button sidequest-lightbox-button--later pixel-corners"
                            onClick={onClose}
                        >
                            {sideQuest.laterLabel ?? "Later"}
                        </button>
                        <button
                            type="button"
                            className="sidequest-lightbox-button sidequest-lightbox-button--accept pixel-corners"
                            onClick={onAccept}
                        >
                            {sideQuest.acceptLabel ?? "Take it"}
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
