import { MenuRenderer } from "../../../../src/resources/rederers/menu-renderer";
describe('MenuRenderer', () => {
  let renderer;
  let compileSpy;
  let viewSpy;

  beforeEach(() => {
    // mock using jest
    compileSpy = jest.fn();
    viewSpy = jest.fn();
    compileSpy.compile = jest.fn(() => ({create: viewSpy}));
    // compileSpy.compile = jest.fn(() => ({create: jest.fn()}));
    const container = document.createElement('div');
    compileSpy.compile();
    renderer = new MenuRenderer(compileSpy, container);
  });
  it('should render a menu', () => {
    const viewModel = {
      message: 'hello world',
      visible: false
    };
    renderer.render(viewModel);
    expect(compileSpy).toHaveBeenCalled();
  });
});
