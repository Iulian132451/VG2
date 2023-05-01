import platform from './img/Platform1.png'
import hills from './img/hills.png'
import background from './img/background.png'
import standFire from './img/Fireball.png'
import leftFire from './img/leftFire.png'
import runningRight from './img/runningRight.png'
import runningLeft from './img/runningLeft.png'
import movingPlatform from './img/movingPlatform.png'
import React, { useRef, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7_w1uhC_slf5MpweGKL-zewquOkZMilA",
  authDomain: "iulian2d-c9ad4.firebaseapp.com",
  projectId: "iulian2d-c9ad4",
  storageBucket: "iulian2d-c9ad4.appspot.com",
  messagingSenderId: "386751784357",
  appId: "1:386751784357:web:c9b7a861d3102c4237344c",
  measurementId: "G-RNE898F2X5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

  canvas.width = 1280
  canvas.height = 720

  const gravity = 1.5
  class Player {
    constructor() {
      this.speed = 10
      this.position = {
        x: 500,
        y: 5
      }
      this.velocity = {
        x: 0,
        y: 1
      }
      this.width = 75
      this.height = 75
      this.image = createImage(standFire)
      this.frames = 0
      this.sprites = {
        stand: {
          right: createImage(standFire),
          left: createImage(leftFire),
          cropWidth: 75,
          frame: 60,
        },
        run: {
          right: createImage(runningRight),
          left: createImage(runningLeft),
          cropWidth: 75,
          frame: 36,
          heightRun: -12
        }
      }
      this.currentSpirte = this.sprites.stand.right
      this.currentCropWidth = 75
      this.currentFrame = 65
      this.currentHeightRun = 0
    }

    draw() {
      ctx.drawImage(this.currentSpirte, this.currentCropWidth * this.frames, this.currentHeightRun, 75, this.currentCropWidth, this.position.x, this.position.y, this.width, this.height)
    }
    update() {
      this.frames++
      if (this.frames > this.currentFrame) this.frames = 0
      this.draw()
      this.position.y += this.velocity.y
      this.position.x += this.velocity.x


      if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity

    }
  }
  class Platform {
    constructor({ x, y, image }) {
      this.position = {
        x,
        y
      }

      this.image = image

      this.width = image.width
      this.height = image.height


    }
    draw() {
      ctx.drawImage(this.image, this.position.x, this.position.y)
    }
  }
  class GenericObject {
    constructor({ x, y, image }) {
      this.position = {
        x,
        y
      }

      this.image = image

      this.width = image.width
      this.height = image.height


    }
    draw() {
      ctx.drawImage(this.image, this.position.x, this.position.y)
    }
  }
  function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
  }

  let platformImage = createImage(platform)

  let player = new Player()
  let platforms = [
  ]
  let GenericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background)
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills)
    })
  ]
  const keys = {
    right: {
      presssed: false
    },
    left: {
      presssed: false


    }
  }

  let scrollOfset = 0


  function init() {

    platformImage = createImage(platform)

    player = new Player()
    platforms = [
      new Platform({ x: 0, y: 470, image: platformImage }),
      new Platform({ x: 500, y: 470, image: platformImage }),
      new Platform({ x: 1000, y: 470, image: platformImage }),
      new Platform({ x: 1700, y: 470, image: platformImage }),
      new Platform({ x: 2400, y: 470, image: platformImage }),
      
    ]
    GenericObjects = [
      new GenericObject({
        x: -1,
        y: -1,
        image: createImage(background)
      }),
      new GenericObject({
        x: -1,
        y: -1,
        image: createImage(hills)
      })
    ]

    scrollOfset = 0

  }

  function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    GenericObjects.forEach(genericObject => {
      genericObject.draw()
    })

    platforms.forEach(platform => {
      platform.draw()
    })
    player.update()


    if (keys.right.presssed && player.position.x < 500) {
      player.velocity.x = player.speed
    } else if ((keys.left.presssed && player.position.x > 350 || keys.left.presssed && scrollOfset === 0 && player.position.x > 0)) {
      player.velocity.x = -player.speed
    } else {
      player.velocity.x = 0

      if (keys.right.presssed) {
        scrollOfset += player.speed
        platforms.forEach(platform => {
          platform.position.x -= player.speed
        })
        GenericObjects.forEach(genericObject => {
          genericObject.position.x -= player.speed * 0.66
        })
      } else if (keys.left.presssed && scrollOfset > 0) {
        scrollOfset -= player.speed
        platforms.forEach(platform => {
          platform.position.x += player.speed
        })
        GenericObjects.forEach(genericObject => {
          genericObject.position.x += player.speed * 0.66
        })
      }
    }
    console.log(scrollOfset)
    platforms.forEach(platform => {
      if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0
        player.onground = true
      }
    })
    if (scrollOfset > 1000) {
      
    }
    if (player.position.y > canvas.height) {
      init()
    }
  }
  init()
  animate()

  window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 65:
        console.log('left')
        keys.left.presssed = true
        player.currentFrame = player.sprites.run.frame
        player.currentSpirte = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.currentHeightRun = player.sprites.run.heightRun


        break

      case 83:
        console.log('down')
        player.velocity.y += 10
        break
      case 68:
        console.log('right')
        keys.right.presssed = true
        player.currentFrame = player.sprites.run.frame
        player.currentSpirte = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.currentHeightRun = player.sprites.run.heightRun
        break
      case 87:
        console.log('up')
        if (player.onground == true) {
          player.velocity.y -= 20
          player.onground = false
        }

        break
    }
  })

  window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
      case 65:
        console.log('left')
        keys.left.presssed = false
        player.currentSpirte = player.sprites.stand.left
        player.currentHeightRun = 0
        break

      case 83:
        console.log('down')
        break
      case 68:
        console.log('right')
        keys.right.presssed = false
        player.currentSpirte = player.sprites.stand.right
        player.currentHeightRun = 0
        break
      case 87:
        console.log('up')
        break
    }
    console.log(keys.right.presssed)
  })

}
   
  , []);

  return <canvas ref={canvasRef} width={500} height={500} />;
}

export default App
