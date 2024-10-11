# Chronicles of Forgotten Lands - A Terminal-Based Text Adventure Game

Chronicles of Forgotten Lands is a terminal-based text adventure game that allows players to explore three mystical realms: a haunted castle, a desert island, and a forgotten village. The objective is to solve riddles, collect items, and unlock paths to complete each realm's quest. The player must gather magical objects in each realm to win the game.

![Game Title](/screenshots/game-title.png)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Game Experience](#game-experience)
- [Game Preview](#game-preview)

## Features

Key features include:

- **Three Unique Realms**: Each with its own atmosphere, storyline, and set of challenges:
  - **Echoing Castle**: Uncover ancient mysteries hidden in the haunted halls.
  - **Desert Island**: Solve the secrets of the shipwreck, cave, and jungle to escape.
  - **Forgotten Village**: Seek the Wise Elder after finding the sacred relics.

- **Interactive Riddles**: Each realm contains challenging riddles, tailored to its environment, that the player must solve to progress.

- **Collectible Items**: Players gather unique items like the Ancient Key, Magic Amulet, or pieces of a map to advance the story.

- **ASCII Art**: Visually enhanced with ASCII art to set the atmosphere for each realm.


## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:diecatiamonteiro/text-based-game.git
   ```

2. Install the required dependencies:
    ```bash
    npm install readline-sync chalk
    ```

3. To start the game, run:
    ```bash
    node index.js    
    ```

## Game experience

### Game Flow

1. The game begins with an introduction and rules.
2. The player selects one of the three realms to explore.
3. Each scenario provides three actions that lead the player through different challenges.
4. After collecting all three items in a scenario, the player must perform athe fourth, final action to complete the quest.
5. The game can be restarted or exited by the player.


### Scenarios

1. **Echoing Castle:**
   - Collect: Ancient Key, Magic Amulet, Crystal Ball
   - Objective: Open the treasure after collecting all three items.

2. **Desert Island:**
   - Collect: Map Piece 1, Map Piece 2, Map Piece 3
   - Objective: Escape the island by collecting all map pieces.

3. **Forgotten Village:**
   - Collect: Ancient Book of Secrets, Golden Chalice, Crystal of Fate
   - Objective: Visit the Wise Elder after collecting the items to seek his wisdom.


## Game preview

#### Intro and Rules

![Game Intro and Rules](/screenshots/intro.png)

#### Riddle

![Game Riddle](/screenshots/castle.riddle.png)

#### Object collection

![Game Object Collection](/screenshots/island-objects-collected.png)

#### Quest Completion

![Game Quest Completion](/screenshots/village-winning-msg.png)


# Thanks for reading. I hope you enjoy the game!
