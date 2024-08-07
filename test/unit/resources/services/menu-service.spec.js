import {MenuService} from "../../../../src/resources/services/menu-service";
import {MenuRenderer} from "../../../../src/resources/rederers/menu-renderer";
import {MenuController} from "../../../../src/resources/controllers/menu-controller";

xdescribe('MenuService', () => {
  let menuService;
  let menuRenderer;
  let menuController;

  beforeEach(() => {
    menuRenderer = new MenuRenderer();
    menuController = new MenuController(menuRenderer);
    menuService = new MenuService(menuRenderer, menuController);
  });

  it('should be created', () => {
    expect(menuService).toBeTruthy();
  });

  it('should render menu', () => {
    let viewModel = {
      message: 'hello world',
      visible: true
    };
    let result = menuService.renderMenu(viewModel);
    expect(result).toBeTruthy();
  });
});
