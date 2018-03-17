<template>
  <div id="home" :class="currentPage">
    <img src="../assets/greg.png" alt="logo" />
    <div id="dial" class="dialog-box">
        <img src="../assets/sprites/dialogBox.png" alt="dialog box"/>
        <div>
          <div id="dial-txt"></div>
          <div class="action"></div>
        </div>
    </div>
    <div id="fire-camp"></div>
    <div id="crono"></div>
  </div>
</template>

<script>
/* eslint-disable */
import json from './dialog.json'

export default {
  name: 'Homepage',
  data () {
    return {
      currentPage: 'Homepage transition',
      frameNumber: 6,
      microphoneActivated: false,
      dialog: json.greeting,
      dialogStep: 0,
      dialogAction: json.instructions
    }
  },
  mounted () {
    let that = this
    navigator.mediaDevices.getUserMedia({audio: true}).then(function () {
      console.log('permission granted')
      that.microphoneActivated = true
    }).catch(function () {
      console.log('permission refused')
      that.microphoneActivated = false
    })

    setTimeout(function () {
      that.currentPage = 'Homepage'
    }, 100)

    const crono = document.querySelector('#crono')
    const firecamp = document.querySelector('#fire-camp')
    let cronoWLeft = new Motio(crono, {fps: 7, frames: this.frameNumber})
    let firecampAnimated = new Motio(firecamp, {fps: 7, frames: 4})

    firecampAnimated.play()
    cronoWLeft.play()

    setTimeout(function () {
      crono.classList.add('walkToLeft')
      setTimeout(function () {
        crono.classList.remove('walkToLeft')
        crono.classList.add('a-stop')
        cronoWLeft.pause()
        cronoWLeft.on('pause', that.turnAndBlink(crono, cronoWLeft, that))
      }, 5000)
    }, 2000)
  },
  methods: {
    turnAndBlink: function (crono, cronoWLeft, that) {
      crono.classList.add('turn')
      setTimeout(function () {
        crono.classList.remove('turn')
        crono.classList.add('turn--complete')
        setTimeout(function () {
          crono.classList.remove('turn--complete')
          crono.classList.add('thinking')
          cronoWLeft = new Motio(crono, {fps: 2, frames: 2})
          cronoWLeft.play()
          that.sayHello()
        }, 1000)
      }, 2000)
    },
    sayHello: function () {
      let that = this
      setTimeout(function () {
        const dialogBoxContainer = document.getElementsByClassName('dialog-box')[0]
        const dialogBox = document.getElementById('dial-txt')
        dialogBoxContainer.classList.add('opened')

        let greetingHello = that.dialog[that.dialogStep].split('')
        let counter = 0
        let timer = setInterval(function () {
          addLetter(greetingHello[counter])
          counter++
          if (counter === greetingHello.length) {
            clearInterval(timer)
            that.showOrHideDialInstruction(1)
            that.callNextAction()
          }
        }, 100)

        function addLetter (letter) {
          dialogBox.innerHTML += letter
        }
      }, 2000)
    },
    showOrHideDialInstruction: function (display) {
      let that = this
      let actionTxT = document.getElementsByClassName('action')[0]
      that.microphoneActivated ? actionTxT.innerHTML = that.dialogAction.say[that.dialogStep] : actionTxT.innerHTML = that.dialogAction.press[that.dialogStep]
      if (display === 0) {
        actionTxT.style.transition = '.1s'
      } else {
        actionTxT.style.transition = '.8s'
      }
      actionTxT.style.opacity = display
    },
    callNextAction: function () {
      let that = this
      const dialogBox = document.getElementById('dial-txt')
      let commands = {}
      if (that.microphoneActivated) {
        console.log(that.dialogStep)
        switch (that.dialogStep) {
          case 0:
            commands = {
              'hello': function () {
                that.showOrHideDialInstruction(0)
                dialogBox.innerHTML = ''
                that.sayHello(that.dialogStep)
              }
            }
            break;
          case 1:
            annyang.removeCommands();
            commands = {
              'next': function () {
                that.showOrHideDialInstruction(0)
                dialogBox.innerHTML = ''
                that.sayHello(that.dialogStep)
              }
            }
          default:
            break;
        }
        annyang.addCommands(commands)
        annyang.start()
      } else {
        let keyPressed = function (event) {
          if (event.keyCode === 13) {
            that.showOrHideDialInstruction(0)
            dialogBox.innerHTML = ''
            that.sayHello(that.dialogStep)
            document.removeEventListener('keydown', keyPressed)
          }
        }
        document.addEventListener('keydown', keyPressed)
      }
      that.dialogStep++
    }
  },
  beforeRouteLeave (to, from, next) {
    this.currentPage += ' transition'
    setTimeout(function () {
      next()
    }, 100)
  }
}
</script>

<style lang="scss">
  @import 'variables.scss';

  .Homepage {
    background: url('../assets/background.jpg');
    background-position: 50%;
    background-size: cover;
    border: 1px solid $theme-color;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    transition: 0.1s;
    .transition {
      height: calc(100% - 20px);
      border: 1px solid transparent;
      box-shadow: inset 0px 0px 0px 10px $theme-color;
    }
    &>img {
      background-color: transparent;
      filter: invert(100%) drop-shadow(1px 1px black);
      height: 65px;
      margin-left: 50%;
      padding: 0 15px;
      transform: translate(-50%, -32px);
      @media (max-width: 767px) {
        height: 50px;
        transform: translate(-50%, -30px);
      }
    }
  }

  .dialog-box {
    align-items: center;
    color: $white;
    font-family: $font-crono;
    display: none;
    min-height: 80px;
    justify-content: center;
    left: 50%;
    letter-spacing: 1.5px;
    padding: 20px 40px;
    position: absolute;
    top: 40%;
    transform: translateX(-50%);
    transition: 0.2s;
    min-width: 200px;
    max-width: 80%;
    img {
      height: 100%;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }
    div {
      text-align: center;
      line-height: 35px;
      font-size: 31px;
      z-index: 2;
      .action {
        position: absolute;
        bottom: 5px;
        right: 10px;
        text-transform: uppercase;
        font-size: 18px;
        font-style: oblique;
        color: #b0c4de;
        opacity: 0;
      }
    }
    &.opened {
      display: flex;
    }
  }

  #fire-camp {
    background: url('../assets/sprites/firecamp.png');
    width: 68px;
    height: 88px;
    position: absolute;
    left: 48%;
    top: 57%;
    transform: scale(1.7);
    z-index: 0;
  }

  #crono {
    width: 48px;
    height: 73px;
    position: absolute;
    bottom: 20%;
    right: -10%;
    background: url('../assets/sprites/crono-w-left.png');
    transform: scale(2);
    &.walkToLeft {
      animation: walkLeft 5s linear forwards;
    }
    &.a-stop {
      right: 50%;
    }
    &.turn {
      background: url('../assets/sprites/crono-turn-front.png');
      background-position: 0px 0px !important;
      width: 32px;
    }
    &.turn--complete {
      background: url('../assets/sprites/crono-face.gif');
      background-position: 0px 0px !important;
      width: 32px;
      height: 70px;
    }
    &.thinking {
      background: url('../assets/sprites/crono-hm.png');
      height: 70px;
      width: 32px;
    }
  }

  @keyframes walkLeft {
    0%   {right: -10%;}
    100% {right: 50%;}
  }
</style>
