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

/**************************************
 *  Constants and Global Variables
 *************************************/
const COUNTDOWN_MAX = 20
let anim: animation.Animation = null
let rabbit: Sprite = null
let chicken: Sprite = null
let pig: Sprite = null
let carrot: Sprite = null

/**************************************
 *  Functions
 *************************************/
function initScene() {
    scene.setTileMap(img`
    7 5 f 6 b b b f f 5 2 f 5 5 5 f
    7 f 5 f f b b f 6 5 f 5 5 f 5 2
    7 5 5 b b b f 5 f 5 5 5 b f 5 f
    7 5 5 f b f b b f 5 5 f b f 5 6
    7 f f b b b b b f f b b b b b b
    7 5 5 b b f b b b b f b f b f f
    7 5 5 b f 6 f 5 f b f b b b b 2
    7 5 f b b b b f b b b b f f f 5
    7 f b b b f b f b b f b b f 5 5
    7 f b b f b b b f b 6 f b b 5 f
    7 f b b b b f b b b f 2 f b 5 f
    7 5 f b f b f b f b f 2 f f 5 5
    7 5 5 b b b f b 6 f 2 5 5 2 f 5
    7 f f b f b b f f 6 f 6 5 f 5 5
    7 5 6 f b b b b f 5 5 f 5 5 5 2
    7 5 f f f 5 f 5 5 5 f 2 5 f 2 2
    `)
    scene.setTile(15, img`
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
    `, true)
    scene.setTile(7, img`
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
    `)
    scene.setTile(2, img`
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
    `)
    scene.setTile(6, img`
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
    `)
    scene.setTile(5, img`
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
    `)
}

function initFood() {
    carrot = sprites.create(img`
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
    `, SpriteKind.Food)
    scene.placeOnRandomTile(carrot, 6)
}

function initEnemy() {
    pig = sprites.create(img`
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
    `, SpriteKind.Enemy)
    scene.placeOnRandomTile(pig, 11)
    pig.setVelocity(50, 40)
    pig.setFlag(SpriteFlag.BounceOnWall, true)
}

function initFriend() {
    chicken = sprites.create(img`
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
    `, SpriteKind.Player)
    scene.placeOnRandomTile(chicken, 2)
}

function initPlayer() {
    rabbit = sprites.create(img`
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
    `, SpriteKind.Player)

    controller.moveSprite(rabbit)

    anim = animation.createAnimation(ActionKind.Walking, 250)
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
    `)
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
    `)
    animation.attachAnimation(rabbit, anim)
    scene.cameraFollowSprite(rabbit)
    scene.placeOnRandomTile(rabbit, 7)
}

/**************************************
 *  Event Handlers
 *************************************/
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite == rabbit) {
        game.splash("pig ate you")
    } else {
        game.splash("pig ate chicken")
    }
    game.over(false, effects.dissolve)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    game.over(true, effects.hearts)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    carrot.destroy(effects.bubbles)
})

sprites.onDestroyed(SpriteKind.Food, function (sprite) {
    music.magicWand.play()
    info.setScore(info.score() + 20)
    info.startCountdown(Math.min(COUNTDOWN_MAX, Math.max(COUNTDOWN_MAX, info.score())))
    initFood()
})

controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.setAction(rabbit, ActionKind.Walking)
})

info.onCountdownEnd(function () {
    game.splash("time's up!")
    game.over(false, effects.melt)
})

game.onUpdateInterval(1000, function () {
    info.setScore(info.score() - 1)
})

game.onUpdate(function () {
    if (rabbit.vx == 0 && rabbit.vy == 0) {
        animation.setAction(rabbit, ActionKind.Idle)
    }
})

/**************************************
 *  Main
 *************************************/
initScene()
initFood()
initFriend()
initEnemy()
initPlayer()

info.startCountdown(COUNTDOWN_MAX)
info.setScore(COUNTDOWN_MAX)
