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
    let viewModel = {
      message: 'hello world',
      visible: false
    };
    this.remove();
    this.compose = this.menuService.renderMenu(viewModel);
  }

  valueChanged(newValue, oldValue) {
    console.log('value changed', newValue, oldValue);
  }

  closeMenuClick() {
    this.menuService.controller.closeMenu();
  }

  openMenuClick() {
    this.menuService.controller.openMenu();
  }

  remove() {
    if (this.compose) {
      this.compose();
      this.compose = null;
    }
  }
}
