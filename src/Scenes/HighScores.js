import Phaser from 'phaser';
import ScrollBg from '../Entities/ScrollBg';
import { getApiScores } from '../api';
//import { displayScores } from '../helper';

class HighScores extends Phaser.Scene {
  constructor() {
    super({ key: 'HighScores' });
  }

  preload() {
    this.load.audio('song', 'assets/credits.mp3');

    this.load.image('menuBTN', 'assets/menuBTN.png');
    this.load.image('menuBTNhover', 'assets/menuBTNhover.png');

  }

  create() {
    this.highScoresTxt = this.add.text(
      this.game.config.width * 0.001,
      this.game.config.height * 0.12,
      `HALL OF FAME`, {
        color: '#E09311',
        fontSize: '10vh',
        fontWeight: 'bold',
      },
    );

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.1 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.1 }),
    };

    this.song = this.sound.add('song', { volume: 0.2 });
    this.song.play();

    this.btnPlayAgain = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.80,
      'playAgainBTN',
    );

    this.btnPlayAgain.setInteractive();
    this.createButton(this.btnPlayAgain, 'playAgainBTN', 'playAgainBTNhover', 'playAgainBTN');
    this.btnPlayAgain.on('pointerup', () => {
      this.btnPlayAgain.setTexture('playAgainBTN');
      this.song.stop();
      this.scene.start('Main');
    }, this);


    this.menuBTN = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.85,
      'menuBTN',
    );

    this.menuBTN.setInteractive();
    this.createButton(this.menuBTN, 'menuBTN', 'menuBTNhover', 'menuBTN');
    this.menuBTN.on('pointerup', () => {
      this.menuBTN.setTexture('menuBTN');
      this.song.stop();
      this.scene.start('Menu');
    }, this);


    this.creditsBTN = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.90,
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

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollBg(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    const scoresContainer = document.createElement('article');
    scoresContainer.innerHTML = `<p style="text-align: center;"> Loading...</p>`
    this.add.dom(280, 225, scoresContainer);

    async function displayScores() {
    const best = await getApiScores();

    console.log(best)
    scoresContainer.innerHTML=''
    best.forEach((score, index) => {
      scoresContainer.innerHTML+=`<p class="p">${index + 1}. PLAYER: ${score.user}, SCORE: ${score.score}</p>` })
    }


    displayScores()
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

export default HighScores;