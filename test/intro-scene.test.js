/**
 * @jest-environment jsdom
 */

import Intro from '../src/Scenes/Intro';

require('jest-canvas-mock');

jest.mock('../src/Scenes/Intro');

beforeEach(() => {
  Intro.mockClear();
});

test('Intro Scene test', () => {
  expect(new Intro()).toBeInstanceOf(Intro);
});