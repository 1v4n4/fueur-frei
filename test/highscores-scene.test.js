/**
 * @jest-environment jsdom
 */
import HighScores from '../src/Scenes/HighScores';

require('jest-canvas-mock');

jest.mock('../src/Scenes/HighScores');

beforeEach(() => {
  HighScores.mockClear();
});

test('HighScores scene test', () => {
  expect(new HighScores()).toBeInstanceOf(HighScores);
});