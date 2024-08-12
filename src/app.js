import { inject } from 'aurelia-framework';
import { MenuRenderer } from './resources/rederers/menu-renderer';
import { MenuService } from "./resources/services/menu-service";

@inject(MenuRenderer, MenuService)
export class App {
  visible = false;
  message = 'Hello World!';

  constructor(contextMenuRenderer, menuService) {
    this.contextMenuRenderer = contextMenuRenderer;
    this.menuService = menuService;
  }

  attached() {
    const viewModel = {
      message: 'hello world',
      visible: true
    };
    this.compose = this.menuService.renderMenu(viewModel);
  }

  closeMenuClick() {
    this.menuService.controller.closeMenu();
  }

  openMenuClick() {
    this.menuService.controller.openMenu();
  }
}
