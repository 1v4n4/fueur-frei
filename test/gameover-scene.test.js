/**
 * @jest-environment jsdom
 */
 import GameOver from '../src/Scenes/GameOver';

 require('jest-canvas-mock');

 jest.mock('../src/Scenes/GameOver');

 beforeEach(() => {
   GameOver.mockClear();
 });

 test('GameOver scene test', () => {
   expect(new GameOver()).toBeInstanceOf(GameOver);
 });