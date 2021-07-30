import Phaser from 'phaser';
import Player from '../Entities/Player';
import ScrollBg from '../Entities/ScrollBg';
import Ship1 from '../Entities/Ship1';
import Ship3 from '../Entities/Ship3';
import Ship2 from '../Entities/Ship2';

class Main extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
  }

  preload() {
    this.load.image('sprBg0', 'assets/sprBg0.png');
    this.load.image('sprBg1', 'assets/sprBg1.png');
    this.load.spritesheet('explosion', 'assets/explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('Ship1', 'assets/ship1.png', {
      frameWidth: 34,
      frameHeight: 30,
    });

    this.load.spritesheet('Ship2', 'assets/ship2.png', {
      frameWidth: 32,
      frameHeight: 27,
    });

    // this.load.image('bomb', 'assets/sprEnemy1.png');

    this.load.spritesheet('Ship3', 'assets/ship3.png', {
      frameWidth: 43,
      frameHeight: 29,
    });

    this.load.image('sprLaserEnemy0', 'assets/sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', 'assets/sprLaserPlayer.png');
    this.load.spritesheet('sprPlayer', 'assets/myShip.png', {
      frameWidth: 55,
      frameHeight: 44,
    });

    this.load.audio('sndExplode0', 'assets/sndExplode0.wav');
    this.load.audio('sndExplode1', 'assets/sndExplode1.wav');
    this.load.audio('sndLaser', 'assets/blaster-firing.wav');
    this.load.audio('gameSong', 'assets/gameSong.mp3');
    this.load.audio('spaceShipSound', 'assets/spaceShipSound.wav');
    this.load.audio('spaceSound', 'assets/spaceSound.wav');
    this.load.audio('spaceShoot', 'assets/spaceShoot.mp3');

    this.load.image('health0', 'assets/health0.png');
    this.load.image('health1', 'assets/health1.png');
    this.load.image('health2', 'assets/health2.png');
    this.load.image('health3', 'assets/health3.png');
    this.load.image('health4', 'assets/health4.png');
    this.load.image('health5', 'assets/health5.png');
  }

  create() {
    this.anims.create({
      key: 'Ship1',
      frames: this.anims.generateFrameNumbers('Ship1'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'Ship2',
      frames: this.anims.generateFrameNumbers('Ship2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'Ship3',
      frames: this.anims.generateFrameNumbers('Ship3'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0', { volume: 0.1 }),
        this.sound.add('sndExplode1', { volume: 0.1 }),
      ],
      laser: this.sound.add('sndLaser', { volume: 0.1 }),
      spaceShipSound: this.sound.add('spaceShipSound', { volume: 0.1 }),
      spaceSound: this.sound.add('spaceSound', { volume: 0.3 }),
      spaceShoot: this.sound.add('spaceShoot', { volume: 0.1 }),
    };

    this.song = this.sound.add('gameSong', { volume: 0.1 });
    if (typeof this.song.loop === 'boolean') {
      this.song.loop = true;
    } else {
      this.song.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
      }, false);
    }
    this.song.play();

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollBg(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      'sprPlayer',
    );

    this.hpBar = [
      'health0', 'health1', 'health2', 'health3', 'health4', 'health5',
    ];

    this.sceneScore = this.add.text(
      this.game.config.width * 0.025,
      this.game.config.height * 0.925,
      `Score: ${this.player.getData('score')}`, {
        color: '#E09311',
        fontSize: '2vw',
      },
    );

    this.updateHPBar(this.player);

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy && !this.player.getData('isDead')) {
        if (enemy.updateHealth()) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          this.player.setScore(enemy.getData('score'));
          enemy.explode(true);
        }
        playerLaser.destroy();
      }
    });

    this.physics.add.collider(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
          && !laser.getData('isDead')) {
        if (player.updateHealth()) {
          player.explode(false);
          laser.destroy();
          this.song.stop();
          player.onDestroy();
        } else {
          laser.destroy();
          this.updateHPBar(this.player);
        }
      }
    });

    this.physics.add.collider(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
          && !enemy.getData('isDead')) {
        if (player.updateHealth()) {
          player.explode(false);

          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          player.setScore(enemy.getData('score'));
          enemy.destroy();

          this.song.stop();
          player.onDestroy();
        } else {
          if (enemy.onDestroy !== undefined) {
            player.setScore(enemy.getData('score'));
            enemy.onDestroy();
          }
          enemy.destroy();
          this.updateHPBar(this.player);
        }
      }
    });

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new Ship3(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else {
          enemy = new Ship1(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },

      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 30000,
      callback() {
        let enemy = null;
        enemy = new Ship2(
          this,
          this.player.x,
          0,
        );
        if (enemy !== null) {
          enemy.setScale(2);
          this.sfx.spaceShoot.play();
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.player.update();

    this.sceneScore.text = `Score: ${this.player.getData('score')}`;

    if (!this.player.getData('isDead')) {
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      } else if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();

      if (enemy.x < -enemy.displayWidth
          || enemy.x > this.game.config.width + enemy.displayWidth
          || enemy.y < -enemy.displayHeight * 4
          || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
          || laser.x > this.game.config.width + laser.displayWidth
          || laser.y < -laser.displayHeight * 4
          || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
          || laser.x > this.game.config.width + laser.displayWidth
          || laser.y < -laser.displayHeight * 4
          || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  updateHPBar(player) {
    this.sceneHPBar = this.add.image(
      this.game.config.width * 0.3,
      this.game.config.height * 0.05,
      this.hpBar[player.getData('health')],
    );
  }
}

export default Main;