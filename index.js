// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com

import runServer from './server.js';

// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "kbullard1",       // TODO: Your Battlesnake Username
    color: "#6B8A9C", // TODO: Choose color
    head: "default",  // TODO: Choose head
    tail: "default",  // TODO: Choose tail
  };
}

// start is called when your Battlesnake begins a game
function start(gameState) {
  console.log("GAME START");
}

// end is called when your Battlesnake finishes a game
function end(gameState) {
  console.log("GAME OVER\n");
}

// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data
function move(gameState) {

  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  // We've included code to prevent your Battlesnake from moving backwards
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
    isMoveSafe.left = false;

  } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
    isMoveSafe.right = false;

  } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
    isMoveSafe.down = false;

  } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
    isMoveSafe.up = false;
  }

  // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  //left wall -> x = 0
  //righht wall -> x = boardWidth - 1
  //top wall -> y = boardHeight - 1
  //bottom wall -> y = 0

   if (myHead.x == 0) { //If my head is next to the left wall don't move left
    isMoveSafe.left = false; 
  }
  else if (myHead.x == boardWidth - 1) { 
    isMoveSafe.right = false;
  }
  else if (myHead.y == 0) {
    isMoveSafe.down = false;
  }
  else if (myHead.y == boardHeight - 1){
    isMoveSafe.up = false;
  }


  // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
  const myBody = gameState.you.body;

  //myHead.y vertical position of snake
  //myHead.x horizontal position of snake
  //segment.y vertical position of body segment
  //segment.x horizontal position of body segment

  if(myBody.length > 1){ //if the snake has more than just a head
    for (let i = 1; i < myBody.length; i++){ 
      const segment = myBody[i]; // each segment is one square of the body
    if ((myHead.y - segment.y) === 1) {  //if the head is one square above a body segment
      isMoveSafe.down = false;
    }
    if ((segment.y - myHead.y) === 1) { //if the head is one square below a body segment
      isMoveSafe.up = false;
    }
    if ((myHead.x - segment.x) === 1) { //if the head is one square to the right of a body segment
      isMoveSafe.left = false;
    }
    if ((segment.x - myHead.x) === 1) { //if the head is one square to the left of a body segment
      isMoveSafe.right = false;
       }
    }
  }

  // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
  const opponents = gameState.board.snakes;

  for (let i = 0; i < opponents.length; i++){
    const opponent = opponents[i]; // each opponent is a snake
    for (let j = 0; j < opponent.body.length; j++){
      const segment = opponent.body[j]; // each segment is one square of the body
      if ((myHead.y - segment.y) === 1) {  //if the head is one square above a body segment
        isMoveSafe.down = false;
      }
      if ((segment.y - myHead.y) === 1) { //if the head is one square below a body segment
        isMoveSafe.up = false;
      }
      if ((myHead.x - segment.x) === 1) { //if the head is one square to the right of a body segment
        isMoveSafe.left = false;
      }
      if ((segment.x - myHead.x) === 1) { //if the head is one square to the left of a body segment
        isMoveSafe.right = false;
      }
    }
  }

  // Choose a random move from the safe moves
  // const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    // Are there any safe moves left?
    //Use this as fallback
    // const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
    // if (safeMoves.length == 0) {
    //   console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    //   return { move: "down" };
    // }

  // TODO: Step 4 - Use A* Pathfinding instead of random move
  const food = gameState.board.food;

  
  
  console.log(`MOVE ${gameState.turn}: ${nextMove}`)
//  return { move: nextMove };
}

function aStarPathfinding(start, end, board){
  
}

runServer({
  info: info,
  start: start,
  move: move,
  end: end
});
