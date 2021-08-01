import Phaser from 'phaser';
import ScrollBg from '../Entities/ScrollBg';
import {
  setMusic, getMusic, getSound, setSound,
} from '../localStorage';

export default class Options extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  preload() {
    this.load.image('sprBg0', 'assets/sprBg0.png');
    this.load.image('sprBg1', 'assets/sprBg1.png');

    this.load.image('startBTN', 'assets/startBTN.png');
    this.load.image('startBTNhover', 'assets/startBTNhover.png');

    this.load.image('menuBTN', 'assets/menuBTN.png');
    this.load.image('menuBTNhover', 'assets/menuBTNhover.png');

    this.load.image('sound', 'assets/sound.png');
    this.load.image('soundOff', 'assets/soundOff.png');

    this.load.image('music', 'assets/music.png');
    this.load.image('musicOff', 'assets/musicOff.png');

    this.load.image('sprBg0', 'assets/sprBg0.png');
    this.load.image('sprBg1', 'assets/sprBg1.png');

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

    this.optionsTxt = this.add.text(
      this.game.config.width * 0.18,
      this.game.config.height * 0.12,
      'OPTIONS', {
        color: '#E09311',
        fontSize: '12vh',

        fontWeight: 'bold',
      },
    );

    this.musicButton = this.createIcon(
      this.musicButton,
      220,
      290,
      'music',
      'music',
    );

    this.soundButton = this.createIcon(
      this.soundButton,
      220,
      370,
      'sound',
      'sound',
    );

    this.musicText = this.add.text(270, 270, 'Music', { fontSize: 24, color: '#E09311', fontWeight: 'bold' });

    this.soundText = this.add.text(270, 360, 'Sound', { fontSize: 24, color: '#E09311', fontWeight: 'bold' });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.startBTN = this.add.sprite(
      this.game.config.width * 0.47,
      this.game.config.height * 0.65,
      'startBTN',
    );

    this.startBTN.setInteractive();
    this.createButton(this.startBTN, 'startBTN', 'startBTNhover', 'startBTN');
    this.startBTN.on('pointerup', () => {
      this.startBTN.setTexture('startBTN');
      this.song.stop();
      this.scene.start('Main');
    }, this);

    this.menuBTN = this.add.sprite(
      this.game.config.width * 0.47,
      this.game.config.height * 0.70,
      'menuBTN',
    );

    this.menuBTN.setInteractive();
    this.createButton(this.menuBTN, 'menuBTN', 'menuBTNhover', 'menuBTN');
    this.menuBTN.on('pointerup', () => {
      this.menuBTN.setTexture('menuBTN');
      this.song.stop();
      this.scene.start('Menu');
    }, this);

    this.scoresBTN = this.add.sprite(
      this.game.config.width * 0.47,
      this.game.config.height * 0.75,
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
      this.game.config.width * 0.47,
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

    const playMusic = () => {
      const musicOn = getMusic();
      if (musicOn) {
        this.song.play();
      } else {
        this.song.stop();
      }
    };

    playMusic();

    this.musicButton.on('pointerdown', () => {
      const musicOn = getMusic();
      if (musicOn) {
        setMusic(false);
      } else {
        setMusic(true);
      }

      playMusic();
    });

    this.soundButton.on('pointerdown', () => {
      const soundOn = getSound();
      if (soundOn) {
        setSound(false);
        alert('Sounds off');
      } else {
        setSound(true);
        alert('Sounds on');
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

  createIcon(icon, x, y, spr, sprHover) {
    icon = this.add.image(x, y, spr);

    icon.on('pointerover', () => {
      icon.setScale(1.1);
      icon.setTexture(sprHover);
    }, this);

    icon.on('pointerout', () => {
      icon.setTexture(spr);
      icon.setScale(0.91);
    });

    return icon;
  }
}