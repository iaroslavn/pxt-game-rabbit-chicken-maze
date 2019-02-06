/**************************************
 *  Classes and Enums
 *************************************/
enum SpriteKind {
  Player,
  Food,
  Enemy,
  Projectile
}

enum ActionKind {
  Walking,
  Idle,
  Jumping
}

enum TileKind {
  FriendSpawn = 2,
  OpenTile = 5,
  FoodSpawn = 6,
  PlayerSpawn = 7,
  EnemySpawn = 11,
  Wall = 15
}

/**************************************
 *  Constants and Global Variables
 *************************************/
const COUNTDOWN_MAX = 60;
const MAP_SIZE_BLOCKS = 64;
let anim: animation.Animation = null;
let rabbit: Sprite = null;
let chicken: Sprite = null;
let pig: Sprite = null;
let carrot: Sprite = null;

/**************************************
 *  Functions
 *************************************/
function random(low: number, hi: number): number {
  return Math.floor(Math.random() * (hi - low + 1)) + low;
}

function mazeToImage(maze: boolean[][]): Image {
  const N = maze.length;
  const img = image.create(N, N);
  const npcOpenTiles = [TileKind.OpenTile, TileKind.FoodSpawn, TileKind.EnemySpawn];

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      let tileKind: TileKind;
      if (col === 0) {
        tileKind = TileKind.PlayerSpawn;
      } else if (col === N - 1) {
        tileKind = TileKind.FriendSpawn;
      } else {
        if (maze[row][col]) {
          tileKind = npcOpenTiles[random(0, npcOpenTiles.length - 1)];
        } else {
          tileKind = TileKind.Wall;
        }
      }
      img.setPixel(col, row, tileKind);
    }
  }

  return img;
}

function generateMaze(N: number): Image {
  const maze = MazeGenerator.generateMaze(N);
  Matrix.rotateCCW(maze);
  return mazeToImage(maze);
}

function initScene() {
  scene.setTileMap(generateMaze(MAP_SIZE_BLOCKS));

  scene.setTile(
    TileKind.Wall,
    img`
      4 4 d 4 4 4 d 4 4 4 d 4 4 4 d 4
      d d d d d d d d d d d d d d d d
      d 4 4 4 d 4 4 4 d 4 4 4 d 4 4 4
      d 4 4 4 d 4 4 4 d 4 4 4 d 4 4 4
      d 4 4 4 d 4 4 4 d 4 4 4 d 4 4 4
      d d d d d d d d d d d d d d d d
      4 4 d 4 4 4 d 4 4 4 d 4 4 4 d 4
      4 4 d 4 4 4 d 4 4 4 d 4 4 4 d 4
      4 4 d 4 4 4 d 4 4 4 d 4 4 4 d 4
      d d d d d d d d d d d d d d d d
      d 4 4 4 d 4 4 4 d 4 4 4 d 4 4 4
      d 4 4 4 d 4 4 4 d 4 4 4 d 4 4 4
      d 4 4 4 d 4 4 4 d 4 4 4 d 4 4 4
      d d d d d d d d d d d d d d d d
      4 4 d 4 4 4 d 4 4 4 d 4 4 4 d 4
      4 4 d 4 4 4 d 4 4 4 d 4 4 4 d 4
  `,
    true
  );
  scene.setTile(
    TileKind.PlayerSpawn,
    img`
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
  `
  );
  scene.setTile(
    TileKind.FriendSpawn,
    img`
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
  `
  );
  scene.setTile(
    TileKind.FoodSpawn,
    img`
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
  `
  );
  scene.setTile(
    TileKind.OpenTile,
    img`
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
      b b b b b b b b b b b b b b b b
  `
  );
}

function initFood() {
  carrot = sprites.create(
    img`
      . . . . . . . . . . . 7 6 . . 7
      . . . . . . . . . . . 7 6 . 7 6
      . . . . . . . . . . . 7 6 7 6 .
      . . . . . . . . e 4 4 7 6 6 . .
      . . . . . . . 4 4 e 4 4 7 7 7 7
      . . . . . . e 4 4 4 4 4 6 6 6 6
      . . . . . . 4 e 4 4 4 4 4 . . .
      . . . . . 4 4 4 4 4 e 4 4 . . .
      . . . . 4 4 4 4 4 4 4 e . . . .
      . . . . e 4 4 e 4 4 . . . . . .
      . . . 4 4 4 4 4 e . . . . . . .
      . . e 4 4 4 4 . . . . . . . . .
      . 4 4 4 4 e . . . . . . . . . .
      . 4 4 4 4 . . . . . . . . . . .
      4 4 e . . . . . . . . . . . . .
      e . . . . . . . . . . . . . . .
  `,
    SpriteKind.Food
  );
  scene.placeOnRandomTile(carrot, TileKind.FoodSpawn);
}

function initEnemy() {
  pig = sprites.create(
    img`
      . f f f f . . . . . . . . f f .
      f f 3 3 f f f f f f f f f 3 3 f
      f 3 3 f 3 3 3 3 3 3 3 3 f 3 3 f
      f 3 f 3 3 3 3 3 3 3 3 3 f f 3 f
      f f 3 3 3 3 3 3 3 3 3 3 3 f 3 f
      . f 3 c 3 3 3 3 3 3 3 c 3 f f f
      . f 3 f 3 3 f f f 3 3 f 3 3 f .
      f 3 3 3 3 f 3 3 3 f 3 3 3 3 f .
      f c a 3 f 3 f 3 f 3 f 3 a a 3 f
      f 3 3 3 f 3 3 3 3 3 f 3 3 3 3 f
      f 3 3 3 f 3 f f f 3 f 3 3 3 3 f
      f 3 3 3 3 f c 3 c f 3 3 3 3 3 f
      f 3 3 3 3 3 3 c 3 3 3 3 3 3 3 f
      f 3 3 3 3 3 3 3 3 3 3 3 3 3 f .
      . f 3 3 3 3 3 3 3 3 3 3 3 f . .
      . . f f f f f f f f f f f . . .
  `,
    SpriteKind.Enemy
  );
  scene.placeOnRandomTile(pig, TileKind.EnemySpawn);
  pig.setVelocity(50, 40);
  pig.setFlag(SpriteFlag.BounceOnWall, true);
}

function initFriend() {
  chicken = sprites.create(
    img`
      . . . . . . . . . . . . . . . .
      . . . . f f f . . . . . . . . .
      . . . f 5 5 5 f . . . . . . . .
      . . f 5 5 5 5 5 f . . . . . . .
      . . f 5 5 5 5 5 f . . . . f . .
      . f 5 5 f 5 5 5 f . . . f f . .
      f 2 f 5 5 5 5 5 f f f f 5 f . .
      . f 5 5 5 5 5 f 5 5 5 5 5 f . .
      . . f 5 5 5 5 5 5 5 5 5 5 f . .
      . . f 5 5 5 5 f f 5 f 5 5 f . .
      . . . f 5 f 5 5 5 f 5 5 f . . .
      . . . f 5 5 f f f 5 5 f . . . .
      . . . . f 5 5 5 5 f f . . . . .
      . . . . . f f f f . . . . . . .
      . . . . . . f . f . . . . . . .
      . . . . . . f . f . . . . . . .
  `,
    SpriteKind.Player
  );
  scene.placeOnRandomTile(chicken, TileKind.FriendSpawn);
}

function initPlayer() {
  rabbit = sprites.create(
    img`
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . f . . . .
      . . . . . . . . . . f 1 f . . .
      . . . . . . . . . . f 1 f . . .
      . . . . . . . . . . f 1 1 f . .
      f . . . . . . . . . . f 1 f . .
      1 f . f f f f f . . . f 1 1 f .
      1 1 f 1 1 1 1 1 f . . . f 1 f .
      1 f 1 1 1 1 1 1 1 f . f 1 1 1 f
      f 1 1 1 1 1 1 1 1 1 f 1 1 1 1 1
      f 1 1 1 1 1 1 1 1 1 1 1 1 1 c 1
      f 1 1 1 1 f 1 1 1 1 1 1 1 1 1 1
      f 1 1 1 1 f 1 1 1 1 1 f 1 1 1 f
      f 1 1 1 f . f 1 1 1 f . f f f .
      . f 1 1 f f f 1 1 f . . . . . .
      . . f 1 1 1 1 f 1 1 f f . . . .
  `,
    SpriteKind.Player
  );

  controller.moveSprite(rabbit);

  anim = animation.createAnimation(ActionKind.Walking, 250);
  anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . f . . . .
    . . . . . . . . . . f 1 f . . .
    . . . . . . . . . . f 1 f . . .
    . . . . . . . . . . f 1 1 f . .
    f . . . . . . . . . . f 1 f . .
    1 f . f f f f f . . . f 1 1 f .
    1 1 f 1 1 1 1 1 f . . . f 1 f .
    1 f 1 1 1 1 1 1 1 f . f 1 1 1 f
    f 1 1 1 1 1 1 1 1 1 f 1 1 1 1 1
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 c 1
    f 1 1 1 1 f 1 1 1 1 1 1 1 1 1 1
    f 1 1 1 1 f 1 1 1 1 1 f 1 1 1 f
    f 1 1 1 f . f 1 1 1 f . f f f .
    . f 1 1 f f f 1 1 f . . . . . .
    . . f 1 1 1 1 f 1 1 f f . . . .
`);
  anim.addAnimationFrame(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . f f f . . . . .
    . . . . . . . . f 1 1 f . . . .
    . . . . . . . . . f 1 1 f . . .
    f . . . . . . . . . f 1 1 f . .
    1 f . . . . . . . . . f 1 f . .
    1 1 f f f f f f . . . . 1 1 f .
    f 1 f 1 1 1 1 1 f . . f 1 1 1 f
    . f 1 1 1 1 1 1 1 f f 1 1 1 1 1
    f 1 1 1 1 1 1 1 1 1 f 1 1 1 c 1
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    f 1 1 1 1 1 1 1 1 1 1 1 f 1 1 f
    f 1 1 1 1 f 1 1 1 1 f f . f f .
    1 1 f f f . f f f 1 1 f . . . .
    1 1 f . . . . . . f 1 1 f f . .
    f 1 1 f . . . . . . f 1 1 f . .
`);
  animation.attachAnimation(rabbit, anim);
  scene.cameraFollowSprite(rabbit);
  scene.placeOnRandomTile(rabbit, TileKind.PlayerSpawn);
}

/**************************************
 *  Event Handlers
 *************************************/
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite, otherSprite) {
  if (sprite == rabbit) {
    game.splash('pig ate you');
  } else {
    game.splash('pig ate chicken');
  }
  game.over(false, effects.dissolve);
});

sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function(sprite, otherSprite) {
  game.over(true, effects.hearts);
});

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite, otherSprite) {
  carrot.destroy(effects.bubbles);
});

sprites.onDestroyed(SpriteKind.Food, function(sprite) {
  music.magicWand.play();
  info.setScore(info.score() + 20);
  info.startCountdown(Math.min(COUNTDOWN_MAX, Math.max(COUNTDOWN_MAX, info.score())));
  initFood();
});

controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function() {
  animation.setAction(rabbit, ActionKind.Walking);
});

info.onCountdownEnd(function() {
  game.splash("time's up!");
  game.over(false, effects.melt);
});

game.onUpdateInterval(1000, function() {
  info.setScore(info.score() - 1);
});

game.onUpdate(function() {
  if (rabbit.vx == 0 && rabbit.vy == 0) {
    animation.setAction(rabbit, ActionKind.Idle);
  }
});

/**************************************
 *  Main
 *************************************/
initScene();
initFood();
initFriend();
initEnemy();
initPlayer();

info.startCountdown(COUNTDOWN_MAX);
info.setScore(COUNTDOWN_MAX);
