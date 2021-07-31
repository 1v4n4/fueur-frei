import Phaser from 'phaser';
import Menu from './Scenes/Menu';
import Main from './Scenes/Main';
import Intro from './Scenes/Intro';
import Credits from './Scenes/Credits';
import GameOver from './Scenes/GameOver';
import Options from './Scenes/Options';
import HighScores from './Scenes/HighScores';
import { createGame } from './api';
// import SceneLeaderBoard from './scenes/SceneLeaderBoard';

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

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
