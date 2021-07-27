import Phaser from 'phaser';
import ScrollBg from '../Entities/ScrollBg';
import { getLocalScores } from '../localStorage';

class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }

  preload() {
    this.load.image('sprBg0', 'assets/sprBg0.png');
    this.load.image('sprBg1', 'assets/sprBg1.png');

    this.load.image('startBTN', 'assets/startBTN.png');
    this.load.image('startBTNhover', 'assets/startBTNhover.png');

    this.load.image('restartBTN', 'assets/restartBTN.png');
    this.load.image('restartBTNnover', 'assets/restartBTNnover.png');

    this.load.image('scoresBTN', 'assets/scoresBTN.png');
    this.load.image('scoresBTNhover', 'assets/scoresBTNhover.png');

    this.load.image('aboutBTN', 'assets/aboutBTN.png');
    this.load.image('aboutBTNhover', 'assets/aboutBTNhover.png');

    this.load.image('logo', 'assets/logo.png');
    this.load.image('arrowKeys', 'assets/arrows.png');
    this.load.image('spaceKey', 'assets/space-key.png');

    this.load.audio('sndBtnOver', 'assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'assets/sndBtnDown.wav');
    this.load.audio('soundtrack', 'assets/RammsteinFeuerFrei.mp3');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.1 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.1 }),
    };

    this.logo = this.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.3,
      'logo',
    );

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.65,
      'startBTN',
    );

    this.btnPlay.setInteractive();
    this.createButton(this.btnPlay, 'startBTN', 'startBTNhover', 'startBTN');
    this.btnPlay.on('pointerup', () => {
      this.btnPlay.setTexture('startBTN');
      this.song.stop();
      this.scene.start('SceneMain');
    }, this);

    this.btnRecord = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.75,
      'scoresBTN',
    );

    this.btnRecord.setInteractive();
    this.createButton(this.btnRecord, 'scoresBTN', 'scoresBTNhover', 'scoresBTN');
    this.btnRecord.on('pointerup', () => {
      this.btnRecord.setTexture('scoresBTN');
      this.song.stop();
      this.scene.start('LeaderBoard');
    }, this);

    this.btnAbout = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.55,
      'aboutBTN',
    );

    this.btnAbout.setInteractive();
    this.createButton(this.btnAbout, 'aboutBTN', 'aboutBTNhover', 'aboutBTN');
    this.btnAbout.on('pointerup', () => {
      this.btnAbout.setTexture('aboutBTN');
      this.song.stop();
      this.scene.start('About');
    }, this);


    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollBg(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    this.song = this.sound.add('soundtrack', { volume: 0.1 });
    this.song.play();
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

export default Menu;