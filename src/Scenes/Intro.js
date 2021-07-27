import Phaser from 'phaser';

class Intro extends Phaser.Scene {
  constructor() {
    super({ key: 'Intro' });
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.logo = this.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'logo',
    );

    this.tweens.add({
      targets: this.logo,
      alpha: { from: 0, to: 1 },
      ease: 'Linear',
      duration: 3000,
      repeat: 0,
      yoyo: true,
      onComplete: () => {
        this.scene.start('Menu');
      },
    });

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('Menu');
    }
  }
}

export default Intro;