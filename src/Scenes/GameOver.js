import Phaser from 'phaser';
import ScrollBg from '../Entities/ScrollBg';
import { getLocalScores, getName } from '../localStorage';
import { setApiScore } from '../api';

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

    this.load.image('submitBTN', 'assets/submitBTN.png');
    this.load.image('submitBTNhover', 'assets/submitBTNhover.png');

    this.load.image('mBTN', 'assets/mBTN.png');
    this.load.image('mBTNhover', 'assets/mBTNhover.png');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.1 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.1 }),
    };

    this.gameOverTxt = this.add.text(
      this.game.config.width * 0.04,
      this.game.config.height * 0.12,
      'GAME OVER', {
        color: '#E09311',
        fontSize: '12vh',
        fontWeight: 'bold',
      },
    );

    this.scores = getLocalScores();

    this.gameOverScore = this.add.text(
      this.game.config.width * 0.20,
      this.game.config.height * 0.400,
      `Score: ${this.scores}`, {
        color: '#E09311',
        fontSize: '5vh',
      },
    );

    this.name = getName();

    this.gameOverName = this.add.text(
      this.game.config.width * 0.20,
      this.game.config.height * 0.330,
      `Name: ${this.name}`, {
        color: '#E09311',
        fontSize: '5vh',
      },
    );

    this.btnSubmitScore = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.50,
      'submitBTN',
    );

    this.btnSubmitScore.setInteractive();
    this.createButton(this.btnSubmitScore, 'submitBTN', 'submitBTNhover', 'submitBTN');
    this.btnSubmitScore.on('pointerup', () => {
      const name = getName();
      this.btnSubmitScore.setTexture('submitBTN');
      this.submit = setApiScore(name, this.scores);
      this.submit.then(() => {
        this.song.stop();
        this.scene.start('HighScores');
      }, this);
    });

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

    this.menuBTNn = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.70,
      'mBTN',
    );

    this.menuBTNn.setInteractive();
    this.createButton(this.menuBTNn, 'mBTN', 'mBTNhover', 'mBTN');
    this.menuBTNn.on('pointerup', () => {
      this.menuBTNn.setTexture('mBTN');
      this.song.stop();
      this.scene.start('Menu');
    }, this);

    this.btnHighScores = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.75,
      'scoresBTN',
    );

    this.btnHighScores.setInteractive();
    this.createButton(this.btnHighScores, 'scoresBTN', 'scoresBTNhover', 'scoresBTN');
    this.btnHighScores.on('pointerup', () => {
      this.btnHighScores.setTexture('scoresBTN');
      this.song.stop();
      this.scene.start('HighScores');
    }, this);

    this.creditsBTN = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.80,
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

    this.song = this.sound.add('intro', { volume: 0.1 });
    if (typeof this.song.loop === 'boolean') {
      this.song.loop = true;
    } else {
      this.song.addEventListener('ended', () => {
        this.currentTime = 0;
        this.play();
      }, false);
    }
    this.song.play();

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollBg(this, key, i * 10);
      this.backgrounds.push(bg);
    }
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