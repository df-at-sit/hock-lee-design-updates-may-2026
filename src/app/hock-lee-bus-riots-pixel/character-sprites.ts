export type CharacterDirection = "north" | "south" | "east" | "west";

export type CharacterSpriteSet = {
  idle: Record<CharacterDirection, string>;
  walking?: Partial<Record<CharacterDirection, string[]>>;
};
