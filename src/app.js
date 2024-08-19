import { inject } from 'aurelia-framework';
import { MenuRenderer } from './resources/rederers/menu-renderer';
import { MenuService } from "./resources/services/menu-service";

@inject(MenuRenderer, MenuService)
export class App {
  message = 'Hello World!';

  constructor(contextMenuRenderer, menuService) {
    this.contextMenuRenderer = contextMenuRenderer;
    this.menuService = menuService;
  }

  attached() {
    const viewModel = {
      message: 'hello world',
      visible: true,
      itemsModel: [
        {
          "label": "Copy",
          "link": "https://copy.com"
        },
        {
          "label": "Cut",
          "link": "https://cut.com"
        },
        {
          "label": "Paste",
          "link": "https://paste.com"
        },
        {
          "label": "Delete",
          "link": "https://delete.com"
        }
      ],
    };
    this.menuService.renderMenu(viewModel);
  }

  closeMenuClick() {
    this.menuService.controller.closeMenu();
  }

  openMenuClick() {
    this.menuService.controller.openMenu();
  }
}
