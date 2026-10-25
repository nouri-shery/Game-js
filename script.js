const dropdown = document.getElementById('animations')
const canvas = document.getElementById("canvas1");

let gamespeed = 5
let playerState = 'fall'
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600 // عشان احط ديزاين
const CANVAS_HEIGHT = canvas.height = 600

const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0
const staggerFrames = 5;
const spriteAnimations = {}
//------//
const playerImage = new Image();
playerImage.src = 'shadow_dog.png' //عشان اجيب صوره 
//--------//
const backgroundLayer1 = new Image
backgroundLayer1.src = 'layer-1.png'

const backgroundLayer2 = new Image
backgroundLayer2.src = 'layer-2.png'

const backgroundLayer3 = new Image
backgroundLayer3.src = 'layer-3.png'

const backgroundLayer4 = new Image
backgroundLayer4.src = 'layer-4.png'

const backgroundLayer5 = new Image
backgroundLayer5.src = 'layer-5.png'
//-----//
dropdown.addEventListener('change'/*مستشغر */, function (e) {
    playerState = e.target.value
})

class Layer {
    constructor(image, speedModifier) {
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 700
        this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gamespeed * this.speedModifier
    }

    update() {
        this.speed = gamespeed * this.speedModifier
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed
        }
        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
}
const layer1 = new Layer(backgroundLayer1, 0.5);

const layer2 = new Layer(backgroundLayer2, 0.5);

const layer3 = new Layer(backgroundLayer3, 0.5);

const layer4 = new Layer(backgroundLayer4, 0.5);

const layer5 = new Layer(backgroundLayer5, 0.5);

const gameObjects = [layer1, layer2, layer3, layer4, layer5]
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 9,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    },
];

animationStates.forEach((state, index) => {
    let frames = { loc: [], }
    for (let i = 0; i < state.frames; i++) {
        let positionX = i * spriteWidth
        let positionY = index * spriteHeight
        frames.loc.push({ x: positionX, y: positionY })
    }
    spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations)

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
 gameObjects.forEach(object =>{
object.update()
object.draw()
 })

    //ctx.fillRect(100,50,100,100);
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length
    let frameX = spriteWidth * position
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++
    requestAnimationFrame(animate)
}

animate();


