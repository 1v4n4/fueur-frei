import Phaser from 'phaser';
import Menu from '../src/Scenes/Menu';
import Main from '../src/Scenes/Main';
import Intro from '../src/Scenes/Intro';
import Credits from '../src/Scenes/Credits';
import GameOver from '../src/Scenes/GameOver';
import Options from '../src/Scenes/Options';
import HighScores from '../src/Scenes/HighScores';

function fakeRun() {
  const config = {
    type: Phaser.WEBGL,
    parent: 'divld',
    width: 600,
    height: 800,
    backgroundColor: 'black',
    dom: {
      createContainer: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
      },
    },
    scene: [
      Intro,
      Menu,
      Options,
      Credits,
      Main,
      GameOver,
      HighScores,
    ],
    pixelArt: true,
    roundPixels: true,
  };

  const game = new Phaser.Game(config);

  return game;
}

export default fakeRun;