import {StageComponent, ComponentTester, CompileSpy, ViewSpy} from 'aurelia-testing';
import { MenuRenderer} from "../../../../src/resources/rederers/menu-renderer";
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('MenuRenderer', () => {
  let renderer;
  let compileSpy;
  let viewSpy;

  beforeEach(() => {
    // mock using jest
    compileSpy = jest.fn();
    compileSpy.compile = jest.fn(() => ({create: jest.fn()}));
    const container = document.createElement('div');
    compileSpy.compile();
    renderer = new MenuRenderer(compileSpy, container);
    console.log(renderer);
  });
  it('should render a menu', () => {
    const viewModel = {
      message: 'hello world',
      visible: false
    };
    renderer.render(viewModel);
    expect(compileSpy).toHaveBeenCalled();
  });

  afterEach(() => renderer.dispose());
});
