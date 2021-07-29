import Entity from './Entity';

class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserPlayer');
    this.body.velocity.y = -600;
  }
}

export default PlayerLaser;