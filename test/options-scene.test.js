/**
 * @jest-environment jsdom
 */
 import Options from '../src/Scenes/Options';

 require('jest-canvas-mock');

 jest.mock('../src/Scenes/Options');

 beforeEach(() => {
   Options.mockClear();
 });

 test('Options scene test', () => {
   expect(new Options()).toBeInstanceOf(Options);
 });