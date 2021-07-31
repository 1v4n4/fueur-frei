import Phaser from 'phaser';
import ScrollBg from '../Entities/ScrollBg';
//import { getScoreBoard } from '../leaderboardCall';

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
      this.game.config.width * 0.1,
      this.game.config.height * 0.12,
      `HALL OF FAME`, {
        color: '#E09311',
        fontSize: '12vh',
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
      this.game.config.height * 0.75,
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
      this.game.config.height * 0.80,
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
      this.game.config.height * 0.85,
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

    // this.getScores = getScoreBoard();

    // this.getScores.then(scores => {
    //   this.config = {
    //     color: '#d0c600',
    //     fontFamily: 'sans-serif',
    //     fontSize: '3vw',
    //     lineHeight: 1.3,
    //     align: 'center',
    //   };

    //   const scrollMode = 0;
    //   this.rexUI.add.gridTable({
    //     x: this.game.config.width * 0.46,
    //     y: 320,
    //     width: 400,
    //     height: 420,
    //     scrollMode,
    //     table: {
    //       cellWidth: (scrollMode === 0) ? undefined : 60,
    //       cellHeight: (scrollMode === 0) ? 60 : undefined,
    //       columns: 3,
    //       mask: {
    //         padding: 2,
    //       },
    //       reuseCellContainer: true,
    //     },
    //     slider: {
    //       track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0xfcf8a2),
    //       thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x847d00),
    //     },
    //     createCellContainerCallback(cell, cellContainer) {
    //       const { scene } = cell;
    //       const { width } = cell;
    //       const { height } = cell;
    //       const { item } = cell;
    //       if (cellContainer === null) {
    //         cellContainer = scene.rexUI.add.label({
    //           width,
    //           height,
    //           align: 'center',
    //           orientation: scrollMode,
    //           text: scene.add.text(0, 0, '', {
    //             color: '#d0c600',
    //             fontFamily: 'sans-serif',
    //             fontSize: '2vw',
    //             lineHeight: 1.3,
    //           }),
    //         });
    //       }

    //       cellContainer.setMinSize(width, height);
    //       cellContainer.getElement('text').setText(item);
    //       return cellContainer;
    //     },
    //     items: this.getItems(20, scores),
    //   })
    //     .layout();
    // });

    // this.getItems = (count, score) => {
    //   const data = ['Rank', 'User', 'Score'];

    //   for (let i = 0; i < count; i += 1) {
    //     if (score[i]) {
    //       data.push(i + 1);
    //       data.push(score[i][1]);
    //       data.push(score[i][0]);
    //     }
    //   }
    //   return data;
    // };
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