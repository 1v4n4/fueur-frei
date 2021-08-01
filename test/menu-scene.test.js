/**
 * @jest-environment jsdom
 */
 import Menu from '../src/Scenes/Menu';

 require('jest-canvas-mock');

 jest.mock('../src/Scenes/Menu');

 beforeEach(() => {
   Menu.mockClear();
 });

 test('Menu scene test', () => {
   expect(new Menu()).toBeInstanceOf(Menu);
 });