### Text Adventure Game

#### Objective

Your task is to create a simple text-based adventure game that can be played entirely in the console. The game should have different scenarios, items, and choices that affect the outcome.

#### Requirements

1. **Scenarios**: Your game should have at least three different "rooms" or scenarios that the player can navigate to. For example, a forest, a cave, and a castle.
2. **Choices**: At each location, the player should have to make a choice that affects what happens next. Choices could be as simple as going left or right or as complex as solving a riddle.
3. **Items**: Your game should include at least two types of items that the player can pick up, use, or interact with. For example, a key to unlock a door or a potion to heal.
4. **Win/Lose Conditions**: There should be at least one way to win the game and at least one way to lose the game.
5. **State Management**: Keep track of the player's state (items in inventory, rooms visited, etc.)
6. **Text Description**: Each room or scenario should have a text description telling the player what they see, hear, or experience. Include details that might hint at choices or actions they can take.

#### Optional Features

1. **Combat**: Add a simple combat system with an enemy.
2. **Randomness**: Include random elements (e.g., a monster appears 50% of the time you enter a room).
3. **Saving/Loading**: Implement a way to save the current game state and load it later.

#### Game Flow Example

1. The game starts, and a text description of the first room is displayed.
2. The player is given a set of choices (e.g., `Do you want to go left or right?`).
3. Based on the choice, a new scenario unfolds, and new choices are presented.
4. The player picks up items along the way that can be used later.
5. Eventually, the player either reaches a winning condition (e.g., finding the treasure) or a losing condition (e.g., getting caught by a monster).

#### User Input

You can use the `readline` or `prompt-sync` npm packages to get input from the user.

#### Tips

- Plan your game's scenarios, choices, and items on paper or digitally before starting to code.
- Start with the basic requirements and then add optional features as time allows.
