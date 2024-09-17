// CHRONICLES OF FORGOTTEN LANDS || A TEXT-BASED ADVENTURE GAME

/** "Chronicles of Forgotten Lands" is a text-based adventure game structured into five main sections:
 *
 * 1. GLOBAL VARIABLES & CONSTANTS: This section includes variables that hold scenarios (castle, island, village), collectible items for each location, and player states like inventory and progress flags.
 * 2. CORE FUNCTIONS (KEY TO GAME FLOW): These functions handle the primary flow of the game. They manage game initialization, scenario selection, and overall gameplay.
 * 3. SUPPORTING/HELPER FUNCTIONS: Functions that perform smaller tasks to support the game logic, such as handling riddles, showing collected items, or adding emojis to the display.
 * 4. SCENARIO-SPECIFIC HANDLER FUNCTIONS: Functions that process user actions for each scenario, including exploring, collecting items, and completing tasks.
 * 5. PROMPT & MESSAGE FUNCTIONS: This section includes functions that display messages to guide the player through the game. These functions help manage user prompts and display winning or failure messages.
 */

// ---------------------------------------------------------------------------------------------- 0. IMPORT DEPENDENCIES

import chalk from "chalk";
import readlineSync from "readline-sync";

// ---------------------------------------------------------------------------------------------- 1. GLOBAL VARIABLES

// Contains details (description, ASCII art, options, riddles) for each of the 3 scenarios
const scenarios = {
  castle: {
    name: "Echoing Castle",
    description: `You stand before the Echoing Castle, its towering walls looming in silence. The entrance, 
overgrown with vines, leads to shadowed halls where your footsteps echo. Inside, faded
tapestries tell stories of battles long past. A regal throne sits ahead, worn by time, 
and dark passages beckon with hidden secrets. Somewhere within, a treasure waits to be
unlocked, but you'll need to find three magical objects first.`,
    asciiArt: `
                 
              *                            |>>>                    +
          +          *                     |                   *       +
                             |>>>      _  _|_  _   *    |>>>
                     *       |        |;| |;| |;|       |                 *
               +         _  _|_  _    \\.    .  /    _  _|_  _       +
           *            |;|_|;|_|;|    \\: +   /    |;|_|;|_|;|
                         \\..      /    ||:+++. |    \\.    .  /           *
                 +        \\.  ,  /     ||:+++  |     \\:  .  /
                          ||:+  |_   _ ||_ . _ | _   _||:+  |       *
                          ||+++.|||_|;|_|;|_|;|_|;|_|;||+++ |          +
                          ||+++ ||.    .     .      . ||+++.|   *
          +   *           ||: . ||:.     . .   .  ,   ||:   |               *
                  *       ||:   ||:  ,     +       .  ||: , |      +
            *             ||:   ||:.     +++++      . ||:   |         *
              +           ||:   ||.     +++++++  .    ||: . |    +
                    +     ||: . ||: ,   +++++++ .  .  ||:   |             +
                          ||: . ||: ,   +++++++ .  .  ||:   |        *
                          ||: . ||: ,   +++++++ .  .  ||:   |
               
                        WELCOME TO THE CASTLE OF ETERNAL ECHOES
__________________________________________________________________________________________
    `,
    options: [
      "Explore the castle",
      "Inspect the throne",
      "Examine the passages",
      "Open the treasure",
    ],
    riddles: [
      {
        question:
          "As you wander the castle halls, an inscription appears on the cold stone: I open doors \nto forgotten places, yet I am silent and still. I hold power in my metal form, waiting \nto fulfill. What am I?\n",
        options: ["A key", "A sword", "A spell"],
        correctAnswer: 0, // Correct answer is 'A key'
      },
      {
        question:
          "As you approach the throne, a faint glow reveals a message on its base: I hang near the \nheart and glow with magic's might. I protect from the shadows and keep evil from sight. \nWhat am I?\n",
        options: ["A lantern", "A shield", "A magic amulet"],
        correctAnswer: 2, // Correct answer is 'A magic amulet'
      },
      {
        question:
          "Deep in the castle's hidden passages, you come across a glowing script on the wall: I \nshow what cannot be seen, I reveal what is to come. In my glass, all futures are spun. \nWhat am I?\n",
        options: ["A crystal ball", "A mirror", "A clock"],
        correctAnswer: 0, // Correct answer is 'A crystal ball'
      },
    ],
  },
  island: {
    name: "Desert Island",
    description: `You find yourself on the sunlit Desert Island of Lost Sands, with golden sands and swaying
palm trees. The salty breeze fills the air as distant seagulls cry overhead. To leave the 
island, you must collect three pieces of a map, scattered across its hidden locations. The 
dense jungle to the east calls for exploration. To the west, a shipwreck lies half-buried 
in the sand, offering secrets from the past. Inland, a dark cave entrance is hidden among 
the vines, daring you to investigate its depths. The island may seem serene, but its 
secrets are your key to escape.`,
    asciiArt: `
  
                              ⠀⠀⠀⠈⠉⠛⢷⣦⡀⠀⣀⣠⣤⠤⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                              ⠀⠀⠀⠀⠀⠀⣀⣻⣿⣿⣿⣋⣀⡀⠀⠀⢀⣠⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                              ⠀⠀⠀⣠⠾⠛⠛⢻⣿⣿⣿⠟⠛⠛⠓⠢⠀⠀⠉⢿⣿⣆⣀⣠⣤⣀⣀⠀⠀⠀
                              ⠀⠀⠘⠁⠀⠀⣰⡿⠛⠿⠿⣧⡀⠀⠀⢀⣤⣤⣤⣼⣿⣿⣿⡿⠟⠋⠉⠉⠀⠀
                              ⠀⠀⠀⠀⠀⠠⠋⠀⠀⠀⠀⠘⣷⡀⠀⠀⠀⠀⠹⣿⣿⣿⠟⠻⢶⣄⠀⠀⠀⠀
                              ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣧⠀⠀⠀⠀⢠⡿⠁⠀⠀⠀⠀⠈⠀⠀⠀⠀
                              ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡄⠀⠀⢠⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                              ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⣾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                              ⠀⣤⣤⣤⣤⣤⣤⡤⠄⠀⠀⣀⡀⢸⡇⢠⣤⣁⣀⠀⠀⠠⢤⣤⣤⣤⣤⣤⣤⠀
                              ⠀⠀⠀⠀⠀⠀⣀⣤⣶⣾⣿⣿⣷⣤⣤⣾⣿⣿⣿⣿⣷⣶⣤⣀⠀⠀⠀⠀⠀⠀
                              ⠀⠀⠀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⠀⠀
                              ⠀⠀⠼⠿⣿⣿⠿⠛⠉⠉⠉⠙⠛⠿⣿⣿⠿⠛⠛⠛⠛⠿⢿⣿⣿⠿⠿⠇⠀⠀
                              ⠀⢶⣤⣀⣀⣠⣴⠶⠛⠋⠙⠻⣦⣄⣀⣀⣠⣤⣴⠶⠶⣦⣄⣀⣀⣠⣤⣤⡶⠀
                              ⠀⠀⠈⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠀⠀⠀⠀⠀⠉⠉⠉⠉⠀⠀⠀⠀

                        WELCOME TO THE DESERT ISLAND OF LOST SANDS
__________________________________________________________________________________________
    `,
    options: [
      "Explore the jungle",
      "Investigate the cave",
      "Examine the shipwreck",
      "Leave the beach",
    ],
    riddles: [
      {
        question:
          "You are deep in the jungle, and a mysterious voice in the wind asks: 'I am the beginning \nof the end, and the end of every place. I begin eternity and end space. What am I?'\n",
        options: ["The earth", "The sun", "The letter 'E'"],
        correctAnswer: 2, // Correct answer is 'The letter 'E''
      },
      {
        question:
          "As you enter the dark cave, an inscription on the wall reads: 'The more you take, the \nmore you leave behind. What am I?'\n",
        options: ["Footsteps", "Time", "Shadows"],
        correctAnswer: 0, // Correct answer is 'Footsteps'
      },
      {
        question:
          "The ghostly remains of the ship whisper to you: 'I have seas without water, coasts without\nsand, towns without people, mountains without land. What am I?'\n",
        options: ["A dream", "A map", "A desert"],
        correctAnswer: 1, // Correct answer is 'A map'
      },
    ],
  },
  village: {
    name: "Forgotten Village",
    description: `You arrive in the Forgotten Village, a place frozen in time. Cobbled streets wind past old
cottages with ivy-covered walls and mossy roofs. The empty marketplace is silent, with
weathered stalls hinting at a bustling past. Tall trees surround the village, their shadows
falling over hidden corners and forgotten paths. A crumbling well stands in the center, and 
the air is filled with the scent of old wood and wildflowers. The village feels full of 
mystery, waiting for someone to discover its secrets.`,
    asciiArt: `
                                                                  <<<<
                                                                  |
                                                              ____|___
                                                              |______|
                                                              | ^  ^ |
                            0                                 | |  | |
                            |                                 |______|
                            x                                 |  _   |
                           xxx       _________________________|_    _|
                         xx^^xx     /========================== ^^ ===|
                        xxx[]xxx   /==========================  []  ==|
                       xxxxxxxxxx /==========================_______ =|
                    *  |        |/===========================|      |=|
                   *** | ^^  ^^ |----------------------------| ^  ^ |--
                  *****| []  [] |           _____            |[]  []| |
                 *******        |          /_____\            |     *| |
                *********^^  ^^ |  ^^  ^^  |  |  |  ^^  ^^   |     *| |
               ***********]  [] |  []  []  |  |  |  []  []   |    ****|
              *************     |         @|__|__|@          |   ********
             ***************   ***********--=====--********* |  **********
             ****************___********** |=====| ********  | ************
              *************     ********* /=======\ ********  |**************
                  
                  WELCOME TO THE FORGOTTEN VILLAGE OF WHISPERING SHADOWS
__________________________________________________________________________________________
    `,
    options: [
      "Visit the abandoned library",
      "Go to the forgotten well",
      "Inspect the blacksmith's shop",
      "Seek the Wise Elder",
    ],
    riddles: [
      {
        question:
          "The old scholar shows you the cover of the Ancient Book of Secrets. To unlock its pages,\n you must complete the phrase: 'In the heart of the village lies the secret of…'\n",
        options: ["Knowledge", "Time", "Wealth"],
        correctAnswer: 0, // Correct answer is 'Knowledge'
      },
      {
        question:
          "The guardian of the chalice presents three objects: a candle, a torch, and a star. One of \nthese lights the way through the dark. Which one shines brightest at night?\n",
        options: ["A candle", "A torch", "A star"],
        correctAnswer: 2, // Correct answer is 'A star'
      },
      {
        question:
          "The crystal glows brightly as it presents a riddle: I speak without a mouth and hear \nwithout ears. I have no body, but I come alive with wind. What am I?\n",
        options: ["A tree", "An echo", "A river"],
        correctAnswer: 1, // Correct answer is 'An echo'
      },
    ],
  },
};

// Contains the collectible items of each scenario.
const castleObjects = ["Ancient Key", "Magic Amulet", "Crystal Ball"];
const islandObjects = ["Map Piece 1", "Map Piece 2", "Map Piece 3"];
const villageObjects = [
  "Ancient Book of Secrets",
  "Golden Chalice",
  "Crystal of Fate",
];

// A boolean flag used to determine whether the game should exit or continue running. When shouldExit is falsem the game continues to run. When shouldExit is true, the game stops running, and the player is either exiting the game.
let shouldExit = false;

// ---------------------------------------------------------------------------------------------- 2. KEY FUNCTIONS

// Starts the game by initializing the player object and repeatedly calling the chooseScenario function until the player chooses to exit.
function startGame() {
  showTitleAndRules();
  const player = {
    items: [], // Global inventory
    visited: [], // Keep track of visited locations
    hasReceivedTreasureMessage: false, // Global treasure message status
    castleItems: [], // Castle-specific inventory
    islandItems: [], // Island-specific inventory
    villageItems: [], // Village-specific inventory
    castleTreasureOpened: false, // Track whether the treasure has been opened in the castle
    islandEscapeAchieved: false, // Track whether the island has been escaped
    villageElderVisited: false, // Track whether the elder has been visited
  };
  while (!shouldExit) {
    chooseScenario(scenarios, player);
  }
}

// Prompts the player to choose a realm to explore and plays the chosen scenario.
function chooseScenario(scenarios, player) {
  showTitleAndRules();

  // promptChoice() => displays 1.castle/2.island/3.village/0.exit game
  const promptChoice = () => {
    console.log(
      chalk.yellowBright.bold(
        `      Begin your adventure! Choose your realm:\n`
      )
    );
    Object.keys(scenarios).forEach((key, index) =>
      console.log(
        chalk.yellowBright(`         ${index + 1}. ${scenarios[key].name}`)
      )
    );
    console.log(chalk.hex("#FF8C00")(`         0. Exit Game`));

    const choice = readlineSync.questionInt(
      chalk.blue.bold(`\n      Where will you go? 💬 `)
    );
    if (choice === 0) {
      exitGame();
    } else {
      const scenarioKey = Object.keys(scenarios)[choice - 1]; // const scenarioKey = ["castle", "island", "village"]
      scenarioKey
        ? playScenario(scenarios[scenarioKey], player)
        : invalidChoice(promptChoice);
    }
  };

  promptChoice();
  if (shouldExit) process.exit();
}

// Displays the selected scenario’s description and ASCII art. Handles player actions in each scenario and checks if they have collected the necessary items to proceed.
function playScenario(scenario, player) {
  // The scenario in this function refers to the specific scenario object (castle, island, or village) because it is passed as an argument when calling playScenario (line 291).
  console.clear();
  console.log(chalk.green.bold(scenario.asciiArt));
  console.log(chalk.green(scenario.description));

  let action;
  do {
    action = handleScenarioOptions(scenario); // Displays the available 4 actions + go back to beginning for the current scenario and allows the player to choose an option.
    if (action !== 0) performActionFacade(action, player, scenario); // Handles which action to perform for each scenario (castle, island, village).

    // Show all 3 items collected and guide player for final action if player has collected all items and hasn't performed final action.
    if (
      scenario.name === "Echoing Castle" &&
      player.castleItems.length >= 3 &&
      !player.hasReceivedTreasureMessage
    ) {
      promptTreasureAllItemsCollected(player, scenario);
    } else if (
      scenario.name === "Desert Island" &&
      player.islandItems.length >= 3 &&
      !player.hasReceivedIslandEscapeMessage
    ) {
      promptIslandAllItemsCollected(player, scenario);
    } else if (
      scenario.name === "Forgotten Village" &&
      player.villageItems.length >= 3 &&
      !player.hasReceivedVillageElderMessage
    ) {
      promptVillageAllItemsCollected(player, scenario);
    }
  } while (action !== 0);
}

// Processes player's actions in each scenario, checks progress, displays messages when 3 items are collected, handles scenario completion, prevents repeated actions, and updates the display of collected items.
function performActionFacade(action, player, scenario) {
  // Defensive programming check. This condition is never met during gameplay because there are no cases where a scenario is undefined or missing its name property. If, in the future, something changes in the codebase (e.g., a bug is introduced, or a new feature adds complexity), removing this check could make debugging harder.
  if (!scenario || !scenario.name) {
    console.log("Error: Scenario is not defined.");
    return;
  }

  let items; // Holds the list of items the player has collected for the current scenario. Eg, if the player is in the castle, 'items' will hold 'player.castleItems'.
  let hasReceivedMessage; // Tracks whether the player has already seen the message congratulating them for collecting all 3 items in a particular scenario. Eg, in the castle scenario, hasReceivedMessage would refer to player.hasReceivedTreasureMessage.
  let hasOpenedPath; // Tracks whether the player has already completed the specific scenario objective. Eg, in the castle scenario, hasOpenedPath would refer to player.castleTreasureOpened, which checks whether the player has already opened the treasure.

  // Gives scenario values to each of the 3 variables declared above
  switch (scenario.name) {
    case "Echoing Castle":
      items = player.castleItems;
      hasReceivedMessage = player.hasReceivedTreasureMessage;
      hasOpenedPath = player.castleTreasureOpened;
      break;
    case "Desert Island":
      items = player.islandItems;
      hasReceivedMessage = player.hasReceivedIslandEscapeMessage;
      hasOpenedPath = player.islandEscapeAchieved;
      break;
    case "Forgotten Village":
      items = player.villageItems;
      hasReceivedMessage = player.hasReceivedVillageElderMessage;
      hasOpenedPath = player.villageElderVisited;
      break;
    default: // Default provides a safety net to handle unexpected scenarios and prevent errors
      items = [];
      hasReceivedMessage = false;
      hasOpenedPath = false;
  }

  // Checks if player has collected 3 items and hasn't seen the message yet, then displays the scenario-specific congratulatory message and exits to allow the player to see it
  if (items.length === 3 && !hasReceivedMessage) {
    if (scenario.name === "Echoing Castle") {
      promptTreasureAllItemsCollected(player, scenario);
    } else if (scenario.name === "Desert Island") {
      promptIslandAllItemsCollected(player, scenario);
    } else if (scenario.name === "Forgotten Village") {
      promptVillageAllItemsCollected(player, scenario);
    }
    return; // Exit early so the player can see the message
  }

  // Checks if the player chooses action 4 to complete the scenario and then shows the winning message after the player collects 3 items and marks the scenario's objective as completed.
  if (action === 4 && items.length === 3) {
    if (scenario.name === "Echoing Castle") {
      showCastleWinningMessage(scenario);
      player.castleTreasureOpened = true;
    } else if (scenario.name === "Desert Island") {
      showIslandWinningMessage(scenario);
      player.islandEscapeAchieved = true;
    } else if (scenario.name === "Forgotten Village") {
      showVillageWinningMessage(scenario);
      player.villageElderVisited = true;
    }
    return;
  }

  // Checks if the player has already completed the scenario and ensures the winning message is displayed again without requiring further actions.
  if (hasOpenedPath) {
    console.clear();
    showTitleAndRules();
    if (scenario.name === "Echoing Castle") {
      showCastleWinningMessage(scenario);
    } else if (scenario.name === "Desert Island") {
      showIslandWinningMessage(scenario);
    } else if (scenario.name === "Forgotten Village") {
      showVillageWinningMessage(scenario);
    }
    return;
  }

  // Handle actions for each scenario. If the scenario is unrecognized (i.e., not one of the three), it calls invalidChoice() to notify the player of an invalid choice and retries the scenario selection. The Set passed as a parametere ensures that the items passed to respective functions are unique, preventing duplicates from being processed during gameplay. Eg, items could be an array like: ["Ancient Key", "Magic Amulet", "Ancient Key"] - by passing new Set(items), the array is converted to: {"Ancient Key", "Magic Amulet"}, removing duplicates.
  switch (scenario.name) {
    case "Echoing Castle":
      handleCastleActions(action, player, scenario, new Set(items));
      break;
    case "Desert Island":
      handleIslandActions(action, player, scenario, new Set(items));
      break;
    case "Forgotten Village":
      handleVillageActions(action, player, scenario, new Set(items));
      break;
    default:
      invalidChoice(() => playScenario(scenario, player)); // Invalid action fallback
  }

  // Display the list of items the player has collected so far for the current scenario.
  displayCollectedItems(player, scenario);
}

// Displays the available 4 actions for the current scenario and allows the player to choose an option.
function handleScenarioOptions(scenario) {
  console.log(chalk.yellow.bold("\nWhat do you want to do next?\n"));
  scenario.options.forEach((option, index) =>
    console.log(chalk.yellow(`  ${index + 1}. ${option}`))
  );
  console.log(chalk.hex("#FF8C00")("  0. Go back to the beginning\n"));

  return readlineSync.questionInt(chalk.blue.bold(`Choose an action 💬 `)); // The return statement returns the player's choice (the number they entered) to wherever the handleScenarioOptions() function was called: For eg, in const 'choice = handleScenarioOptions(scenario)', 'choice' will store the number corresponding to the option the player selected.
}

// Ends the game and displays a goodbye message.
function exitGame() {
  console.clear();
  showTitleAndRules();
  console.log(
    chalk.green.bold(`


                        ::::::::::::::::::::::::::::::::::::
                        :: See you next time! Goodbye! 👋 ::
                        ::::::::::::::::::::::::::::::::::::



  `)
  );
  shouldExit = true;
}

// ---------------------------------------------------------------------------------------------- 3. SUPPORTING FUNCTIONS

// Presents a riddle to the player, and if answered correctly, allows them to collect the associated item.
function solveRiddle(player, scenario, item, riddleIndex) {
  // Defensive programming check. This condition is never met during gameplay because there are no cases where a scenario is undefined or missing its name property. If, in the future, something changes in the codebase (e.g., a bug is introduced, or a new feature adds complexity), removing this check could make debugging harder.
  if (!scenario || !scenario.name) {
    console.log("Error: Scenario is not defined.");
    return;
  }

  const riddle = scenario.riddles[riddleIndex];

  console.clear();
  console.log(chalk.green.bold(scenario.asciiArt));
  console.log(chalk.green(scenario.description));

  if (challengeRiddle(riddle)) {
    // Handle item addition per scenario
    if (scenario.name === "Echoing Castle") {
      if (!player.castleItems.includes(item)) {
        console.clear();
        console.log(chalk.green.bold(scenario.asciiArt));
        console.log(chalk.green(scenario.description));
        console.log(chalk.yellow("\n🙂 Correct Answer 🙂"));
        player.castleItems.push(item);
      } else {
        console.log(chalk.yellow(`\nYou already have: ${item}`));
      }
    } else if (scenario.name === "Desert Island") {
      if (!player.islandItems.includes(item)) {
        console.clear();
        console.log(chalk.green.bold(scenario.asciiArt));
        console.log(chalk.green(scenario.description));
        console.log(chalk.yellow("\n🙂 Correct Answer 🙂"));
        player.islandItems.push(item);
      } else {
        console.log(chalk.yellow(`\nYou already have: ${item}`));
      }
    } else if (scenario.name === "Forgotten Village") {
      if (!player.villageItems.includes(item)) {
        console.clear();
        console.log(chalk.green.bold(scenario.asciiArt));
        console.log(chalk.green(scenario.description));
        console.log(chalk.yellow("\n🙂 Correct Answer 🙂"));
        player.villageItems.push(item);
      } else {
        console.log(chalk.yellow(`\nYou already have: ${item}`));
      }
    }
  } else {
    failureMessage(scenario); // Fail if the riddle is answered incorrectly
  }
}

// Checks whether the player has collected enough items (3 items) to open the treasure.
function openTreasure(player, scenario) {
  if (player.castleItems.length >= 3) {
    player.castleItems.forEach((item) => player.items.push(item)); // Takes each item from the player.castleItems array and adds it to the global inventory (player.items).
    player.castleTreasureOpened = true; // Mark that the treasure is opened, so player can't open it again.
  } else {
    console.clear();
    console.log(chalk.green.bold(scenario.asciiArt));
    console.log(chalk.green(scenario.description));
    console.log(
      chalk.red(
        "\nYou need 3 magic items to open the treasure! Keep exploring."
      )
    );
  }
}

// Checks whether the player has collected enough items (3 items) to leave the island.
function leaveIsland(player, scenario) {
  if (player.islandItems.length >= 3) {
    player.islandItems.forEach((item) => player.items.push(item)); // Takes each item from the player.islandItems array and adds it to the global inventory (player.items).
    player.islandEscapeAchieved = true; // Mark that the island has been escaped, so player can't escape it again.
  } else {
    console.clear();
    console.log(chalk.green.bold(scenario.asciiArt));
    console.log(chalk.green(scenario.description));
    console.log(
      chalk.red("\nYou need 3 map pieces to leave the island! Keep exploring.")
    );
  }
}

// Checks whether the player has collected enough items (3 items) to visit the Wise Elder.
function visitWiseElder(player, scenario) {
  if (player.villageItems.length >= 3) {
    player.villageItems.forEach((item) => player.items.push(item)); // Takes each item from the player.villageItems array and adds it to the global inventory (player.items).
    player.villageElderVisited = true; // Mark that the Wise Elder has been visited, so player can't visit him again.
  } else {
    console.clear();
    console.log(chalk.green.bold(scenario.asciiArt));
    console.log(chalk.green(scenario.description));
    console.log(
      chalk.red(
        "\nYou need all 3 sacred items to visit the Wise Elder! Keep exploring."
      )
    );
  }
}

// Displays the riddle options and checks if the player selects the correct answer.
function challengeRiddle(riddle) {
  console.log(chalk.magentaBright("\n", riddle.question));
  riddle.options.forEach((option, index) =>
    console.log(chalk.magentaBright(`   ${index + 1}. ${option}`))
  );
  const answer = readlineSync.questionInt(
    chalk.blue.bold(`\nChoose an answer 💬 `)
  );
  return answer - 1 === riddle.correctAnswer;
}

// Displays a list of items the player has collected in the current scenario. Each scenario (castle, island, village) has its own set of items, and this function dynamically checks which scenario the player is in and shows the relevant items they've collected so far.
function displayCollectedItems(player, scenario) {
  let items = [];

  if (scenario.name === "Echoing Castle") {
    items = player.castleItems;
  } else if (scenario.name === "Desert Island") {
    items = player.islandItems;
  } else if (scenario.name === "Forgotten Village") {
    items = player.villageItems;
  }

  if (items.length === 0) {
    console.log(chalk.hex("#FF8C00")("You have not collected any items yet."));
  } else {
    console.log(chalk.green.bold("\nYou have collected the following items:"));
    items.forEach((item) => {
      console.log(chalk.green(`   ${item} ${getItemEmoji(item)}`));
    });
  }
}

// Returns an emoji based on the item name for an interactive display of collected items.
function getItemEmoji(item) {
  const emojis = {
    "Ancient Key": "🗝️",
    "Magic Amulet": "🧿",
    "Crystal Ball": "🔮",
    "Map Piece 1": "🗺️",
    "Map Piece 2": "🗺️",
    "Map Piece 3": "🗺️",
    "Ancient Book of Secrets": "📖",
    "Golden Chalice": "🏆",
    "Crystal of Fate": "💎",
  };
  return emojis[item] || "";
}

/** Handles invalid inputs and, after showing the error message, call a function (the callback) to let the player retry or perform some other action. This approach is useful because it makes the 'invalidChoice' function flexible—you can decide what happens after an invalid choice based on the callback function passed in.
 * Examples of different callback uses:
 * invalidChoice(() => chooseScenario(scenarios, player)); ---> In the main menu, retry scenario selection after an invalid choice.
 * invalidChoice(() => playScenario(scenario, player)); ---> In a specific scenario, retry the current scenario.
 * invalidChoice(() => startGame()); ---> Restart the game.
 */
function invalidChoice(callback) {
  console.clear();
  showTitleAndRules();
  console.log(
    chalk.red.bold(`
                           ___________________________________
                          |                                   |
                          | Invalid choice. Please try again. |
                          |___________________________________|


  `)
  );
  callback();
}

// ---------------------------------------------------------------------------------------------- 4. SCENARIO-SPECIFIC FUNCTIONS

// Handles the actions for the castle scenario (managing exploration, collecting items, and opening the treasure).
function handleCastleActions(action, player, scenario, uniqueItems) {
  switch (action) {
    case 1: // player chooses action 1
      if (uniqueItems.has(castleObjects[0])) {
        // [0] = ancient key
        alreadyCollected(player, scenario, castleObjects[0]); // already collected ancient key
      } else {
        solveRiddle(player, scenario, castleObjects[0], 0); // , 0 = first riddle
      }
      break;
    case 2:
      if (uniqueItems.has(castleObjects[1])) {
        alreadyCollected(player, scenario, castleObjects[1]);
      } else {
        solveRiddle(player, scenario, castleObjects[1], 1);
      }
      break;
    case 3:
      if (uniqueItems.has(castleObjects[2])) {
        alreadyCollected(player, scenario, castleObjects[2]);
      } else {
        solveRiddle(player, scenario, castleObjects[2], 2);
      }
      break;
    case 4:
      openTreasure(player, scenario);
      break;
    case 0: // Going back to the beginning
      playScenario(scenario, player);
      break;
    default:
      invalidChoice(() => playScenario(scenario, player)); // If the player makes an invalid choice, you want to give them another opportunity to select a valid action. The callback playScenario() function allows you to re-run or restart the scenario after the invalid choice is handled.
  }
}

// Handles the actions for the island scenario (managing exploration, collecting map pieces, and escaping the island).
function handleIslandActions(action, player, scenario, uniqueItems) {
  switch (action) {
    case 1:
      if (uniqueItems.has(islandObjects[0])) {
        alreadyCollected(player, scenario, islandObjects[0]);
      } else {
        solveRiddle(player, scenario, islandObjects[0], 0);
      }
      break;
    case 2:
      if (uniqueItems.has(islandObjects[1])) {
        alreadyCollected(player, scenario, islandObjects[1]);
      } else {
        solveRiddle(player, scenario, islandObjects[1], 1);
      }
      break;
    case 3:
      if (uniqueItems.has(islandObjects[2])) {
        alreadyCollected(player, scenario, islandObjects[2]);
      } else {
        solveRiddle(player, scenario, islandObjects[2], 2);
      }
      break;
    case 4:
      leaveIsland(player, scenario);
      break;
    case 0: // Going back to the beginning
      playScenario(scenario, player);
      break;
    default:
      invalidChoice(() => playScenario(scenario, player));
  }
}

// Handles the actions for the village scenario (managing exploration, collecting items and visiting the Wise Elder).
function handleVillageActions(action, player, scenario, uniqueItems) {
  switch (action) {
    case 1:
      if (uniqueItems.has(villageObjects[0])) {
        alreadyCollected(player, scenario, villageObjects[0]);
      } else {
        solveRiddle(player, scenario, villageObjects[0], 0);
      }
      break;
    case 2:
      if (uniqueItems.has(villageObjects[1])) {
        alreadyCollected(player, scenario, villageObjects[1]);
      } else {
        solveRiddle(player, scenario, villageObjects[1], 1);
      }
      break;
    case 3:
      if (uniqueItems.has(villageObjects[2])) {
        alreadyCollected(player, scenario, villageObjects[2]);
      } else {
        solveRiddle(player, scenario, villageObjects[2], 2);
      }
      break;
    case 4:
      visitWiseElder(player, scenario);
      break;
    case 0: // Going back to the beginning
      playScenario(scenario, player);
      break;
    default:
      invalidChoice(() => playScenario(scenario, player));
  }
}

// ---------------------------------------------------------------------------------------------- 5. PROMPT & MESSAGE FUNCTIONS

// Displays the game's title, introductory message and rules.
function showTitleAndRules() {
  console.clear();
  console.log(
    chalk.green(`
       ▗▄▄▖    ▗▖ ▗▖    ▗▄▄▖      ▗▄▖     ▗▖  ▗▖    ▗▄▄▄▖     ▗▄▄▖    ▗▖       ▗▄▄▄▖     ▗▄▄▖             ▗▄▖     ▗▄▄▄▖            
      ▐▌       ▐▌ ▐▌    ▐▌ ▐▌    ▐▌ ▐▌    ▐▛▚▖▐▌      █      ▐▌       ▐▌       ▐▌       ▐▌               ▐▌ ▐▌    ▐▌               
      ▐▌       ▐▛▀▜▌    ▐▛▀▚▖    ▐▌ ▐▌    ▐▌ ▝▜▌      █      ▐▌       ▐▌       ▐▛▀▀▘     ▝▀▚▖            ▐▌ ▐▌    ▐▛▀▀▘            
      ▝▚▄▄▖    ▐▌ ▐▌    ▐▌ ▐▌    ▝▚▄▞▘    ▐▌  ▐▌    ▗▄█▄▖    ▝▚▄▄▖    ▐▙▄▄▖    ▐▙▄▄▖    ▗▄▄▞▘            ▝▚▄▞▘    ▐▌               
                                                                                                                                  
                                                                                                                                  
                                                                                                                                  
      ▗▄▄▄▖     ▗▄▖     ▗▄▄▖      ▗▄▄▖     ▗▄▖     ▗▄▄▄▖    ▗▄▄▄▖    ▗▄▄▄▖    ▗▖  ▗▖                                               
      ▐▌       ▐▌ ▐▌    ▐▌ ▐▌    ▐▌       ▐▌ ▐▌      █        █      ▐▌       ▐▛▚▖▐▌                                               
      ▐▛▀▀▘    ▐▌ ▐▌    ▐▛▀▚▖    ▐▌▝▜▌    ▐▌ ▐▌      █        █      ▐▛▀▀▘    ▐▌ ▝▜▌                                               
      ▐▌       ▝▚▄▞▘    ▐▌ ▐▌    ▝▚▄▞▘    ▝▚▄▞▘      █        █      ▐▙▄▄▖    ▐▌  ▐▌                                               
                                                                                                                                  
                                                                                                                                  
                                                                                                                                  
      ▗▖        ▗▄▖     ▗▖  ▗▖    ▗▄▄▄      ▗▄▄▖                                                                                   
      ▐▌       ▐▌ ▐▌    ▐▛▚▖▐▌    ▐▌  █    ▐▌                                                                                      
      ▐▌       ▐▛▀▜▌    ▐▌ ▝▜▌    ▐▌  █     ▝▀▚▖                                                                                   
      ▐▙▄▄▖    ▐▌ ▐▌    ▐▌  ▐▌    ▐▙▄▄▀    ▗▄▄▞▘                                                



      Welcome, brave traveler, to the Chronicles of Forgotten Lands.
  
      Your mission: gather three mystical artifacts hidden within these realms. 
      Solve ancient riddles, conquer dark challenges, and unlock the legendary 
      reward that binds these lands together.`)
  );

  console.log(
    chalk.green.bold(`  
      How to Play:`)
  );

  console.log(
    chalk.green(`
      1. Choose a realm to explore: venture into the castle, cross the island,
         or discover the village.
      2. Solve riddles and collect 3 enchanted items that unlock the path to 
         victory.`)
  );

  console.log(
    chalk.green.bold(`  
      Controls:`)
  );

  console.log(
    chalk.green(`
      •  Use the numbered options to make your decisions.
      •  At any time, you can choose to go back to the beginning by selecting '4' 
         or choose to exit the game by selecting '0' in the homepage.`)
  );

  console.log(
    chalk.green.bold(`  
      Are you ready to embark on this mystical adventure? ✨
      
      `)
  );
}

// Informs the player they can open the treasure once they have collected all three items.
function promptTreasureAllItemsCollected(player, scenario) {
  console.clear();
  console.log(chalk.green.bold(scenario.asciiArt));
  console.log(chalk.green(scenario.description));
  console.log(
    chalk.green.bold(`
    Congratulations!!!
    You have collected 3 magical items: 🗝️  🧿 🔮.
    You can now open the treasure. Choose action 4.
  `)
  );
  player.hasReceivedTreasureMessage = true; // Set the flag to true after showing the message. Tracks game state and ensures this message only happen once.
}

// Informs the player they can escapa the island once they have collected all three items.
function promptIslandAllItemsCollected(player, scenario) {
  console.clear();
  console.log(chalk.green.bold(scenario.asciiArt));
  console.log(chalk.green(scenario.description));
  console.log(
    chalk.green.bold(`
    Congratulations!!!
    You have collected 3 map pieces: 🗺️  🗺️  🗺️.
    You can now leave the island. Choose action 4 to escape.
  `)
  );
  player.hasReceivedIslandEscapeMessage = true; // Set the flag to true after showing the message. Tracks game state and ensures this message only happen once.
}

// Informs the player they can visit the Wise Elder once they have collected all three items.
function promptVillageAllItemsCollected(player, scenario) {
  console.clear();
  console.log(chalk.green.bold(scenario.asciiArt));
  console.log(chalk.green(scenario.description));
  console.log(
    chalk.green.bold(`
    Congratulations!!!
    You have collected 3 ancient items: 📖  🏆  💎.
    You can now visit the Wise Elder to seek his wisdom. Choose action 4.
  `)
  );
  player.hasReceivedVillageElderMessage = true; // Set the flag to true after showing the message. Tracks game state and ensures this message only happen once.
}

// Displays the winning message and ASCII art when the player opens the treasure in the castle.
function showCastleWinningMessage(scenario) {
  console.clear();
  console.log(chalk.green.bold(scenario.asciiArt));
  console.log(
    chalk.green.bold(`
                          You have collected all 3 magical items 
                                      🗝️  🧿 🔮 
                            and you just opened the treasure!

                                
                                              _.--.
                                          _.-'_:-'||
                                      _.-'_.-::::'||
                                _.-:'_.-::::::'   ||
                              .''-.-:::::::'      ||
                            /.'';|:::::::'        ||_
                            ||   ||::::::'     _.;._'-._
                            ||   ||:::::'  _.-!oo @.!-._'-.
                            \'.  ||:::::.-!()oo @!()@.-'_. |
                              '.'-;|:.-'.&$@.& ()$%-o.'\U ||
                                '>'-.!@%()@,@,_%-'. o  |'||
                                ||-._'-.@.-'_.-' _.-o  |'||
                                ||=[ '-._.-\U/.-'    o  |'||
                                || '-.]=|| |'|      o  |'||
                                ||      || |'|        _| ';
                                ||      || |'|    _.-'_.-'
                                |_'-.   || |'|_.-'_.-'
                                  '-.'-.|| |' '_.-'
                                    '-.||_/.-'


                                      
                  🎉 CONGRATULATIONS! YOU COMPLETED THE CASTLE QUEST!🎉
__________________________________________________________________________________________

  `)
  );
  console.log(
    chalk.hex("#FF8C00")(`                          
Please go back to the beginning.`)
  );
}

// Displays the winning message and ASCII art when the player escapes the island.
function showIslandWinningMessage(scenario) {
  console.clear();
  console.log(chalk.green.bold(scenario.asciiArt));
  console.log(
    chalk.green.bold(`
                          You have collected all 3 map pieces 
                                      🗺️  🗺️  🗺️  
                        and will now escape the island safely!

                    
                                      .
                                      .'|     .8
                                    .  |    .8:
                                    .   |   .8;:        .8
                                  .    |  .8;;:    |  .8;
                                  .     n .8;;;:    | .8;;;
                                .      M.8;;;;;:   |,8;;;;;
                                .    .,"n8;;;;;;:   |8;;;;;;
                              .   .',  n;;;;;;;:   M;;;;;;;;
                              .  ,' ,   n;;;;;;;;:  n;;;;;;;;;
                            . ,'  ,    N;;;;;;;;:  n;;;;;;;;;
                            . '   ,     N;;;;;;;;;: N;;;;;;;;;;
                          .,'   .      N;;;;;;;;;: N;;;;;;;;;;
                          ..    ,       N6666666666 N6666666666
                          I    ,        M           M
                        ---nnnnn_______M___________M______mmnnn
                              "-.                          /
          ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  "-_______________________/ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
            ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
                ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~


                  🎉 CONGRATULATIONS! YOU COMPLETED THE ISLAND QUEST!🎉
__________________________________________________________________________________________
    `)
  );
  console.log(
    chalk.hex("#FF8C00")(`                          
Please go back to the beginning.`)
  );
}

// Displays the winning message and ASCII art when the player visits the Wise Elder in the village.
function showVillageWinningMessage(scenario) {
  console.clear();
  console.log(chalk.green.bold(scenario.asciiArt));
  console.log(
    chalk.green.bold(`
                          You have collected all 3 ancient items 
                                      📖  🏆  💎 
                    and the Wise Elder has granted you his wisdom!

            
                            ⠀⠀⠀⠀⢤⣤⣄⠀⠀⠀⠀⠀⠀⣤⣤⣤⣤⠀⠀⠀⠀⠀⠀⣠⣤⡤⠀⠀⠀⠀
                            ⠀⠀⠀⠀⠈⢿⣿⣿⣶⣄⡀⠀⢰⣿⣿⣿⣿⡆⠀⢀⣠⣶⣿⣿⡿⠁⠀⠀⠀⠀
                            ⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀
                            ⠀⣤⣤⣤⣤⣀⣀⣻⣿⣿⣿⣿⠟⠉⠀⠀⠉⠻⣿⣿⣿⣿⣟⣀⣀⣤⣤⣤⣤⠀
                            ⠀⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠀
                            ⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀
                            ⠀⠀⢀⣠⣴⣿⣿⣿⣿⣿⣇⠀⠴⠶⠀⠀⠶⠦⠀⣸⣿⣿⣿⣿⣿⣦⣄⡀⠀⠀
                            ⠀⣾⣿⣿⣿⣿⣿⣿⣿⠉⠛⠀⣀⣤⡄⢠⣤⣀⠀⠛⠉⣿⣿⣿⣿⣿⣿⣿⣷⠀
                            ⠀⠉⠛⠛⠿⠿⢿⣿⣿⠀⠿⠟⠛⢉⣠⣄⡉⠛⠻⠿⠀⣿⣿⡿⠿⠿⠛⠛⠉⠀
                            ⠀⠀⠀⠀⠀⠀⢠⡼⠛⠀⢰⣶⣿⣿⣿⣿⣿⣿⣶⡆⠀⠛⢧⡄⠀⠀⠀⠀⠀⠀
                            ⠀⠀⠀⠀⠀⢰⡟⠁⠀⠀⠀⢋⣿⣿⣿⣿⣿⣿⡙⠀⠀⠀⠈⢻⡆⠀⠀⠀⠀⠀
                            ⠀⠀⠀⠀⠀⣿⠁⠀⠀⠀⠀⠘⠟⢹⣿⣿⡏⠻⠃⠀⠀⠀⠀⠈⣿⠀⠀⠀⠀⠀
                            ⠀⠀⠀⠀⢰⡿⠀⠀⠀⠀⠀⠀⠀⠈⠻⠟⠁⠀⠀⠀⠀⠀⠀⠀⢿⡆⠀⠀⠀⠀
                            ⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀
                            ⠀⠀⠀⠀⠘⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠃⠀⠀⠀⠀


                  🎉 CONGRATULATIONS! YOU COMPLETED THE VILLAGE QUEST! 🎉
__________________________________________________________________________________________

  `)
  );
  console.log(
    chalk.hex("#FF8C00")(`                          
Please go back to the beginning.`)
  );
}

// Informs the player if they’ve already collected a specific item and suggests choosing another action.
function alreadyCollected(player, scenario, item) {
  console.clear();
  console.log(chalk.green.bold(scenario.asciiArt));
  console.log(chalk.green(scenario.description));

  let message = "";

  // Castle items
  if (item === "Ancient Key") {
    message =
      "\nYou have already collected the 🗝️  while exploring the castle.\nChoose another action.";
  } else if (item === "Magic Amulet") {
    message =
      "\nYou have already collected the 🧿 while inspecting the throne.\nChoose another action.";
  } else if (item === "Crystal Ball") {
    message =
      "\nYou have already collected the 🔮 while examining the passages.\nChoose another action.";

    // Island items
  } else if (item === "Map Piece 1") {
    message =
      "\nYou have already collected 🗺️  (1) while exploring the jungle.\nChoose another action.";
  } else if (item === "Map Piece 2") {
    message =
      "\nYou have already collected 🗺️  (2) while investigating the cave.\nChoose another action.";
  } else if (item === "Map Piece 3") {
    message =
      "\nYou have already collected 🗺️  (3) while examining the shipwreck.\nChoose another action.";

    // Village items
  } else if (item === "Ancient Book of Secrets") {
    message =
      "\nYou have already collected the 📖 while exploring the library.\nChoose another action.";
  } else if (item === "Golden Chalice") {
    message =
      "\nYou have already collected the 🏆 while inspecting the well.\nChoose another action.";
  } else if (item === "Crystal of Fate") {
    message =
      "\nYou have already collected the 💎 while investigating the shop.\nChoose another action.";

    // Default message
  } else {
    message =
      "\nYou have already collected the required items.\nThere's nothing more to do here! Please choose another action or open the treasure.";
  }

  console.log(chalk.white.bold(message));
}

// Displays a message if the player answers a riddle incorrectly.
function failureMessage(scenario) {
  console.clear();
  console.log(chalk.green.bold(scenario.asciiArt));
  console.log(chalk.green(scenario.description));
  console.log(
    chalk.red.bold(
      "\n🛑 You failed the riddle and are back at the entrance. 🛑"
    )
  );
}

// ---------------------------------------------------------------------------------------------- 6. PLAYING GAME

startGame();
