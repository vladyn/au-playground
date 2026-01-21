import { inject } from "aurelia-framework";
import { MenuRenderer } from "../renderers/menu-renderer";
import { MenuController } from "../controllers/menu-controller";

@inject(MenuRenderer)
export class MenuService {
  constructor(menuRenderer) {
    this.menuRenderer = menuRenderer;
    this.controller = new MenuController(menuRenderer);
  }

  renderMenu(viewModel) {
    return this.controller.renderMenu(viewModel);
  }

  closeMenu() {
    return this.controller.closeMenu();
  }

  openMenu(viewModel) {
    return this.controller.openMenu(viewModel);
  }
}
