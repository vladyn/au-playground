import { MenuController } from "../../../../src/resources/controllers/menu-controller";
import { MenuRenderer } from "../../../../src/resources/rederers/menu-renderer";
import { AureliaViewSlotMock } from "../../mock";
describe('MenuController', () => {
  let menuController;
  let menuRenderer;
  let compileSpy;
  let container;
  let aureliaViewSlotMock;

  beforeEach(() => {
    menuRenderer = new MenuRenderer();
    menuController = new MenuController(menuRenderer);
    compileSpy = jest.fn();
    compileSpy.compile = jest.fn(() => ({create: jest.fn()}));
    container = document.createElement('div');
    compileSpy.compile();
    aureliaViewSlotMock = new AureliaViewSlotMock(container);
    menuRenderer.viewSlot = aureliaViewSlotMock;
    menuController.menuRenderer = menuRenderer;
  });

  it('should be created', () => {
    expect(menuController).toBeTruthy();
  });

  it('should set the menu renderer', () => {
    const newRenderer = new MenuRenderer();
    menuController.renderMenu(newRenderer);
    expect(menuController.menuRenderer).toBe(newRenderer);
  });

  it('should call the menu renderer to close the menu', () => {
    const closeSpy = jest.spyOn(menuRenderer, 'closeMenu');
    menuController.closeMenu();
    expect(closeSpy).toHaveBeenCalled();
  });
  it('should call the menu renderer to open the menu', () => {
    const viewModel = { message: 'hello world' };
    const openSpy = jest.spyOn(menuRenderer, 'openMenu');
    menuController.openMenu(viewModel);
    expect(openSpy).toHaveBeenCalledWith(viewModel);
  });
});
