import Phaser from 'phaser';
import Entity from './Entity';

class Ship1 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'Ship1', 'Ship1');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.play('Ship1');
    this.setData('health', 3);
    this.setData('score', 500);
  }

  updateHealth() {
    if (this.getData('health') > 0) {
      this.scene.sfx.explosions[0].play();
      this.setData('health', this.getData('health') - 1);
      this.body.velocity.y = Phaser.Math.Between(50, 100);
      return false;
    }

    return true;
  }
}

export default Ship1;