/**
 * @jest-environment jsdom
 */
import Credits from '../src/Scenes/Credits';

require('jest-canvas-mock');

jest.mock('../src/Scenes/Credits');

beforeEach(() => {
  Credits.mockClear();
});

test('Credits scene test', () => {
  expect(new Credits()).toBeInstanceOf(Credits);
});