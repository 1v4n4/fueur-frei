import Phaser from 'phaser';
import ScrollBg from '../Entities/ScrollBg';
import { getLocal } from '../localStorage';
//import { submitHighScore } from '../leaderboardCall';

class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  preload() {
    this.load.audio('intro', 'assets/introSong.mp3');
    this.load.image('gameOverImg', 'assets/gameOverImg.png');
    this.load.audio('sndBtnOver', 'assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'assets/sndBtnDown.wav');

    this.load.image('playAgainBTN', 'assets/playAgainBTN.png');
    this.load.image('playAgainBTNhover', 'assets/playAgainBTNhover.png');

    this.load.image('scoresBTN', 'assets/scoresBTN.png');
    this.load.image('scoresBTNhover', 'assets/scoresBTNhover.png');

    this.load.image('creditsBTN', 'assets/creditsBTN.png');
    this.load.image('creditsBTNhover', 'assets/creditsBTNhover.png');
  }

  create() {

    this.gameOverTxt = this.add.text(
      this.game.config.width * 0.04,
      this.game.config.height * 0.12,
      `GAME OVER`, {
        color: '#E09311',
        fontSize: '12vh',

        fontWeight: 'bold',
      },
    );

    this.scores = getLocal();
    this.gameOverSceneScore = this.add.text(
      this.game.config.width * 0.30,
      this.game.config.height * 0.25,
      `Score: ${this.scores[0]}`, {
        color: '#E09311',
        fontSize: '5vh',
      },
    );

    this.gameOverImage = this.add.image(
    this.game.config.width * 0.5,
    this.game.config.height * 0.45,
    'gameOverImg',
     );



    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.1 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.1 }),
    };

    this.song = this.sound.add('intro', { volume: 0.1 });
    if (typeof this.song.loop == 'boolean')
{
  this.song.loop = true;
}
else
{
  this.song.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
    this.song.play();

    this.btnPlayAgain = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.65,
      'playAgainBTN',
    );

    this.btnPlayAgain.setInteractive();
    this.createButton(this.btnPlayAgain, 'playAgainBTN', 'playAgainBTNhover', 'playAgainBTN');
    this.btnPlayAgain.on('pointerup', () => {
      this.btnPlayAgain.setTexture('playAgainBTN');
      this.song.stop();
      this.scene.start('Main');
    }, this);

    this.btnHighScores = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.70,
      'scoresBTN',
    );

    this.btnHighScores.setInteractive();
    this.createButton(this.btnHighScores, 'scoresBTN', 'scoresBTNhover', 'scoresBTN');
    this.btnHighScores.on('pointerup', () => {
      this.btnHighScores.setTexture('scoresBTN');
      this.song.stop();
      this.scene.start('SceneLeaderBoard');
    }, this);

    this.creditsBTN = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.75,
      'creditsBTN',
    );

    this.creditsBTN.setInteractive();
    this.createButton(this.creditsBTN, 'creditsBTN', 'creditsBTNhover', 'creditsBTN');
    this.creditsBTN.on('pointerup', () => {
      this.creditsBTN.setTexture('creditsBTN');
      this.song.stop();
      this.scene.start('Credits');
    }, this);

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.userName = '';

    const div = document.createElement('div');
    div.innerHTML = `
    <input type="text" id="nameField" placeholder="     Enter your name" style="width: 166px; border: 2px solid black; border-radius: 5px; background: #E09311; margin-top: 420px; margin-right: 20px; height: 28px;">
    <button type="button" name="submitBTN" value="SUBMIT" style="width: 166px; font-size: 18px; color: #212529; margin-top: 4px; background: #E09311; border: 1px solid black; border-radius: 5px; height: 32px;" onMouseOver="this.style.background='#860105'" onMouseOut="this.style.background='#E09311'">SUBMIT</button>`;

    const element = this.add.dom(280, 480, div);
    element.addListener('click');

    element.on('click', (event) => {
      if (event.target.name === 'submitBTN') {
        const inputText = document.getElementById('nameField');
        if (inputText.value !== '') {
          element.removeListener('click');
          element.setVisible(false);
          this.userName = inputText.value;
          this.submit = submitHighScore(this.userName, this.scores[0]);
          this.submit.then(() => {
            this.scene.scene.song.stop();
            this.scene.start('SceneLeaderBoard');
          });
        }
      }
    });
  }

  update() {
    if (this.keySpace.isDown) {
      this.song.stop();
      this.scene.start('Main');
    }
  }

  createButton(btn, spr, sprHover, sprDown) {
    btn.on('pointerover', () => {
      btn.setTexture(sprHover);
      this.sfx.btnOver.play();
    }, this);

    btn.on('pointerout', () => {
      btn.setTexture(spr);
    });

    btn.on('pointerdown', () => {
      btn.setTexture(sprDown);
      this.sfx.btnDown.play();
    }, this);
  }
}

export default GameOver;