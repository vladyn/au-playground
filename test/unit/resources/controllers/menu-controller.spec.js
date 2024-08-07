import { MenuController } from "../../../../src/resources/controllers/menu-controller";
import { MenuRenderer } from "../../../../src/resources/rederers/menu-renderer";

describe('MenuController', () => {
  let menuController;
  let menuRenderer;

  beforeEach(() => {
    menuRenderer = new MenuRenderer();
    menuController = new MenuController(menuRenderer);
  });

  it('should be created', () => {
    expect(menuController).toBeTruthy();
  });

  it('should render menu', () => {
    let viewModel = {
      message: 'hello world',
      visible: true
    };
    let result = menuController.renderMenu(viewModel);
    expect(result).toBeTruthy();
  });
});
