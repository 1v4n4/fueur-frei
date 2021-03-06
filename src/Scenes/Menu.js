import Phaser from 'phaser';
import ScrollBg from '../Entities/ScrollBg';
import {
  getMusic, getSound, setName, getName,
} from '../localStorage';

class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }

  preload() {
    this.load.image('sprBg0', 'assets/sprBg0.png');
    this.load.image('sprBg1', 'assets/sprBg1.png');

    this.load.image('startBTN', 'assets/startBTN.png');
    this.load.image('startBTNhover', 'assets/startBTNhover.png');

    this.load.image('playAgainBTN', 'assets/playAgainBTN.png');
    this.load.image('playAgainBTNhover', 'assets/playAgainBTNhover.png');

    this.load.image('scoresBTN', 'assets/HighScoresBTN.png');
    this.load.image('scoresBTNhover', 'assets/highScoresBTNhover.png');

    this.load.image('creditsBTN', 'assets/creditsBTN.png');
    this.load.image('creditsBTNhover', 'assets/creditsBTNhover.png');

    this.load.image('optionsBTN', 'assets/optionsBTN.png');
    this.load.image('optionsBTNhover', 'assets/optionsBTNhover.png');

    this.load.image('logo', 'assets/logo.png');

    this.load.audio('sndBtnOver', 'assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'assets/sndBtnDown.wav');
    this.load.audio('intro', 'assets/introSong.mp3');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.2 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.2 }),
    };

    this.logo = this.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.3,
      'logo',
    );

    let name = 'Player One';
    if (getName()) {
      name = getName();
    }

    this.sceneName = this.add.text(
      this.game.config.width * 0.21,
      this.game.config.height * 0.52,
      `Player: ${name}`, {
        color: '#E09311',
        fontSize: '2vw',
      },
    );

    const div = document.createElement('div');
    div.innerHTML = `
    <input type="text" id="nameInput" placeholder="     Enter your name" style="width: 166px; border: 2px solid black; border-radius: 5px; background: #E09311; margin-top: 420px; margin-right: 20px; height: 28px;">
    <button type="submit" name="submitBTN" id="submitBTN" value="SUBMIT" style="width: 166px; font-size: 18px; color: #212529; margin-top: 4px; background: #E09311; border: 1px solid black; border-radius: 5px; height: 32px;" onMouseOver="this.style.background='#860105'" onMouseOut="this.style.background='#E09311'">CHANGE NAME</button>`;

    this.add.dom(300, 280, div);

    const el = document.getElementById('submitBTN');
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.name === 'submitBTN') {
        const inputText = document.getElementById('nameInput');
        if (inputText.value !== '') {
          name = inputText.value;
        }
        setName(name);
        inputText.value = '';
        this.song.stop();
        this.scene.start('Menu');
      }
    });

    this.startBTN = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.75,
      'startBTN',
    );

    this.startBTN.setInteractive();
    this.createButton(this.startBTN, 'startBTN', 'startBTNhover', 'startBTN');
    this.startBTN.on('pointerup', () => {
      if (!getName()) {
        setName('Player One');
      }
      this.startBTN.setTexture('startBTN');
      this.song.stop();
      this.scene.start('Main');
    }, this);

    this.optionsBTN = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.80,
      'optionsBTN',
    );

    this.optionsBTN.setInteractive();
    this.createButton(this.optionsBTN, 'optionsBTN', 'optionsBTNhover', 'optionsBTN');
    this.optionsBTN.on('pointerup', () => {
      this.optionsBTN.setTexture('optionsBTN');
      this.song.stop();
      this.scene.start('Options');
    }, this);

    this.scoresBTN = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.85,
      'scoresBTN',
    );

    this.scoresBTN.setInteractive();
    this.createButton(this.scoresBTN, 'scoresBTN', 'scoresBTNhover', 'scoresBTN');
    this.scoresBTN.on('pointerup', () => {
      this.scoresBTN.setTexture('scoresBTN');
      this.song.stop();
      this.scene.start('HighScores');
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

    this.song = this.sound.add('intro', { volume: 0.1 });

    if (typeof this.song.loop === 'boolean') {
      this.song.loop = true;
    } else {
      this.song.addEventListener('ended', () => {
        this.currentTime = 0;
        this.play();
      },
      false);
    }

    const musicOn = getMusic();
    // eslint-disable-next-line
    musicOn ? this.song.play() : this.song.stop();
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }

    if (this.keySpace.isDown) {
      this.song.stop();
      this.scene.start('Main');
    }
  }

  createButton(btn, spr, sprHover, sprDown) {
    btn.on('pointerover', () => {
      btn.setTexture(sprHover);
      const soundOn = getSound();
      if (soundOn) {
        this.sfx.btnOver.play();
      }
    }, this);

    btn.on('pointerout', () => {
      btn.setTexture(spr);
    });

    btn.on('pointerdown', () => {
      btn.setTexture(sprDown);
      const soundOn = getSound();
      if (soundOn) {
        this.sfx.btnDown.play();
      }
    }, this);
  }
}

export default Menu;