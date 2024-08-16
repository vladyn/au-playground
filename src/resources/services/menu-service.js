import { inject } from "aurelia-framework";
import { I18N } from 'aurelia-i18n';
import { MenuRenderer } from "../rederers/menu-renderer";
import { MenuController } from "../controllers/menu-controller";

@inject(MenuRenderer, I18N)
export class MenuService {
  constructor(menuRenderer, i18n) {
    this.menuRenderer = menuRenderer;
    this.i18n = i18n;
    console.log(this.i18n.tr('score'));
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
