"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { BaseSceneShell, type BaseSceneConfig } from "./base-scene-shell";
import {
  buildDefaultSceneConfig,
  PIXEL_SCENE_VARIANTS,
  type PixelSceneVariantKey,
} from "./scene-variants";
import {
  getStoredCharacterCode,
  persistCharacterCode,
  resolveSceneConfigForRole,
} from "./scene-config";

type HockLeeScenePageProps = {
  sceneNumber: number;
};

export function HockLeeScenePage({ sceneNumber }: HockLeeScenePageProps) {
  return <RoleAwareScenePage baseConfig={buildDefaultSceneConfig(sceneNumber)} />;
}

type HockLeeSceneVariantPageProps = {
  variant: PixelSceneVariantKey;
};

export function HockLeeSceneVariantPage({ variant }: HockLeeSceneVariantPageProps) {
  return <RoleAwareScenePage baseConfig={PIXEL_SCENE_VARIANTS[variant]} />;
}

type RoleAwareScenePageProps = {
  baseConfig: BaseSceneConfig;
};

function RoleAwareScenePage({ baseConfig }: RoleAwareScenePageProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCharacter = getStoredCharacterCode(searchParams.get("role"));

  useEffect(() => {
    persistCharacterCode(selectedCharacter);
  }, [selectedCharacter]);

  const resolvedConfig = useMemo(() => {
    return resolveSceneConfigForRole(baseConfig, selectedCharacter, pathname);
  }, [baseConfig, pathname, selectedCharacter]);

  return <BaseSceneShell config={resolvedConfig} />;
}
