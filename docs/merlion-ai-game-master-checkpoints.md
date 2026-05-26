# AI Game Master - Merlion Checkpoint Specifications

Backend implementation reference for Merlion AI intervention points in the Hock Lee Bus Riot game.

## 1. Map - Landing Page After Character Selection

Immediately after the first cutscene plays, the AI should trigger an onboarding message that sets the context and tone for the player, and walks them through the UI. The message should explain what the player is entering - the Hock Lee Bus Riot historical event timeline - and guide them to explore every node to learn about important scenes and become part of the storyline. The AI should also draw attention to the Stats Indicator, which tracks Empathy, Curiosity, and Awareness, and the Timeline element. This checkpoint applies to all characters.

## 2. Tutorial - City Hall

Immediately after the player enters the City Hall scene, the AI game master should take over the existing tutorial and walk the player through all core game interactions. Specifically, it should cover how to interact with NPCs, how to interact with NPCs that have artefacts attached, how to use the artefact chat function, and how to use the Camera Icon to view real photos of the scene. This checkpoint applies to all characters.

## 3. Game Scenes - Nudge to Explore Artefacts

If the player has not clicked or interacted with any artefact yet within a game scene and clicks the map icon to exit the scene, the AI should prompt them to do so. The message should be contextualised to the current game location, following the format: "Learn more about the artefacts used at [home] during the 1950s", with the game location dynamically inserted. This checkpoint applies to all characters.

## 4. Game Scenes - Nudge to Talk to NPCs

If the player has not clicked or interacted with any NPC yet within a game scene and clicks the map icon to exit the scene, the AI should nudge them to engage. The message should reference the specific major NPCs present in the scene, such as students, bus workers, David Marshall, or police, following the format: "Hear about what [students] are thinking about the situation.", with the NPC type dynamically inserted. This checkpoint applies to all characters.

## 5. Bus Depot - Nudge to Talk to a Specific NPC for Side Quest

This checkpoint is exclusive to the Chinese Student character. It is triggered when a hidden side quest has not yet been activated, and the player clicks the map icon to exit the Bus Depot scene. The AI should hint that a specific NPC, a bus worker, may have something important to say, using the format: "Seems like [Bus worker] is trying to tell you something!", with the NPC category dynamically inserted.

## 6. Riot Map - Setting Context and Tone

After the riot cutscene plays and the player enters the riot stage of the game, the AI should briefly orient them on what to observe. The message should highlight a few key things to watch for, such as: "Look out for the atmosphere change during the riot and how students and bus workers are acting." This checkpoint applies to all characters.

## 7. Post-Riot Map - Setting Context and Tone

After the post-riot cutscene plays and the player enters the post-riot stage, the AI should again set context. The message should prompt the player to observe the consequences that follow, for example: "Although the riot has ended, look out for what are the consequences of using violence." This checkpoint applies to all characters.

## 8. Finished Screen - Nudge About Incomplete Side Quest

If the side quest was triggered during gameplay but the player reached the finished screen without completing it, the AI should surface a hint. For the Chinese Student character specifically, the message should be: "Oh no! We forgot to feed the bus workers at the bus depot, I bet they are still hungry!" As a general nudge, applicable to all characters in future, the format should be: "We totally forgot about the side quest we took from [game scene title] - let's go back to complete it!", with the scene title dynamically inserted.

## 9. Finished Screen - Congratulations on Completion

When the player exits the last game scene before entering the final cutscene, the AI should congratulate them on completing the game. The message should acknowledge the character they played as and encourage them to replay as other characters to get different perspectives, using the format: "Congrats! You have made it to the end. You've learnt the full story about the Hock Lee Bus Riot as [Chinese Student]. You might want to check out other characters' perspectives!", with the character name dynamically inserted. Currently applies to Chinese Student; intended for all characters in future.

## 10. Map / Game Scene - General Help (Idle Trigger)

If the player has been inactive for 5 minutes with no actions taken in the game, the AI should check in with a general help prompt: "Are you stuck? I'm here to help, ask me anything!" This checkpoint applies to all characters across all scenes.
