import type { CharacterCode } from "./scenes";
import { CHARACTER_ROLE_LABELS } from "./character-content";
import { CHARACTER_PRESENTATIONS } from "./story-data";

type CharacterProfileCardProps = {
  characterCode: CharacterCode;
};

export const CharacterProfileCard = ({ characterCode }: CharacterProfileCardProps) => {
  const presentation = CHARACTER_PRESENTATIONS[characterCode];
  const designation = CHARACTER_ROLE_LABELS[characterCode];

  return (
    <div
      className="hl-map-character-profile-card"
      aria-label={`${presentation.playerFullName}, ${designation}`}
    >
      <div
        className="hl-map-character-profile-image-stage"
        data-character={characterCode}
      >
        <img
          src={presentation.cutsceneSprite}
          alt=""
          aria-hidden="true"
          className="hl-map-character-profile-image"
          draggable={false}
        />
      </div>
      <div className="pixel-corners--wrapper hl-map-character-profile-name-shell">
        <div className="pixel-corners hl-map-character-profile-name">
          {presentation.playerFullName}
        </div>
      </div>
      <div className="pixel-corners--wrapper hl-map-character-profile-designation-shell">
        <div className="pixel-corners hl-map-character-profile-designation">
          {designation}
        </div>
      </div>
    </div>
  );
};
