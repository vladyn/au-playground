import { MenuRenderer} from "../../../../src/resources/rederers/menu-renderer";

describe('MenuRenderer', () => {
  let renderer;
  let compileSpy;

  beforeEach(() => {
    // mock using jest
    compileSpy = jest.fn();
    compileSpy.compile = jest.fn(() => ({create: jest.fn()}));
    const container = document.createElement('div');
    compileSpy.compile();
    renderer = new MenuRenderer(compileSpy, container);
  });
  it('should render a menu', () => {
    const viewModel = {
      message: 'hello world',
      visible: true
    };
    renderer.render(viewModel);
    expect(compileSpy.compile).toHaveBeenCalled();
  });
});
