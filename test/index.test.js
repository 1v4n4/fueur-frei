/**
 * @jest-environment jsdom
 */

import fakeRun from './game_mock';

describe('Testing mocked game', () => {
  const game = fakeRun();
  test('Return object call game started', () => {
    expect(typeof game).toBe('object');
  });

  test('Expect object to contains game scenes', () => {
    expect(typeof game.scene.scenes).toBe('object');
  });
});