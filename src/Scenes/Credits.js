import Phaser from 'phaser';

import ScrollBg from '../Entities/ScrollBg';

class Credits extends Phaser.Scene {
  constructor() {
    super({ key: 'Credits' });
  }

  preload() {
    this.load.audio('creditsMusic', 'assets/credits.mp3');
    this.load.image('logo', 'assets/logo.png');

    this.load.image('york', 'assets/york.png');
    this.load.image('phaser', 'assets/phaserLogo.png');
    this.load.image('gitHub', 'assets/gitHubIcon.png');
    this.load.image('linkedIn', 'assets/linkedIn.png');

    this.load.image('menuBTN', 'assets/menuBTN.png');
    this.load.image('menuBTNhover', 'assets/menuBTNhover.png');
  }

  create() {
    this.logo = this.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.3,
      'logo',
    );

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.1 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.1 }),
    };

    this.song = this.sound.add('creditsMusic', { volume: 0.2 });
    // to loop the music
    if (typeof this.song.loop === 'boolean') {
      this.song.loop = true;
    } else {
      this.song.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
      },
      false);
    }
    this.song.play();

    this.menuBTN = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.55,
      'menuBTN',
    );

    this.menuBTN.setInteractive();
    this.createButton(this.menuBTN, 'menuBTN', 'menuBTNhover', 'menuBTN');
    this.menuBTN.on('pointerup', () => {
      this.menuBTN.setTexture('menuBTN');
      this.song.stop();
      this.scene.start('Menu');
    }, this);

    this.message = [];
    this.message.push('This game is made using the Phaser framework, with the help of Jared York\'s tutorial.');
    this.message.push('Soundtrack is the song \'Fueuer frei!\' by Rammstein, and the intro image is a picture from the band\'s concert. Sounds are from Freesound website');

    this.textConfig = {
      color: ' #E09311',
      fontSize: '17px',
      lineHeight: '20px',
      align: 'center',
      fontWeight: 'bold',
      wordWrap: {
        width: this.game.config.width * 0.6,
        useAdvancedWrap: true,
      },
    };

    this.add.text(
      this.game.config.width * 0.2,
      this.game.config.height * 0.61,
      this.message[0],
      this.textConfig,
    );

    this.link = this.createIcon(
      this.phaserIcon,
      this.game.config.width * 0.40,
      this.game.config.height * 0.72,
      'https://phaser.io/',
      'phaser',
      'phaser',
    );

    this.link = this.createIcon(
      this.yorkIcon,
      this.game.config.width * 0.65,
      this.game.config.height * 0.72,
      'https://learn.yorkcs.com/category/tutorials/gamedev/phaser-3/build-a-space-shooter-with-phaser-3/',
      'york',
      'york',
    );

    this.add.text(
      this.game.config.width * 0.2,
      this.game.config.height * 0.76,
      this.message[1],
      this.textConfig,
    );

    this.githubIcon = this.createIcon(
      this.githubIcon,
      this.game.config.width * 0.4,
      this.game.config.height * 0.94,
      'https://github.com/1v4n4',
      'gitHub',
      'gitHub',
    );

    this.linkedinIcon = this.createIcon(
      this.linkedinIcon,
      this.game.config.width * 0.6,
      this.game.config.height * 0.94,
      'https://www.linkedin.com/in/1v4n4/',
      'linkedIn',
      'linkedIn',
    );

    this.creditTxt = this.add.text(
      this.game.config.width * 0.35,
      this.game.config.height * 0.97,
      'Made by 1v4n4 © 2021', {
        color: '#E09311',
        fontSize: '15px',

        fontWeight: 'bold',
      },
    );

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

  createIcon(icon, x, y, link, spr, sprHover) {
    icon = this.add.image(x, y, spr);
    icon.setInteractive();

    icon.on('pointerup', () => {
      window.open(link, '_blank');
    }, this);

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

export default Credits;