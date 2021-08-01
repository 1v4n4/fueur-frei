/**
 * @jest-environment jsdom
 */
 import Main from '../src/Scenes/Main';

 require('jest-canvas-mock');

 jest.mock('../src/Scenes/Main');

 beforeEach(() => {
   Main.mockClear();
 });

 test('Main scene test', () => {
   expect(new Main()).toBeInstanceOf(Main);
 });