import { inject } from "aurelia-framework";
import { I18N } from 'aurelia-i18n';
import { MenuRenderer } from "../rederers/menu-renderer";
import { MenuController } from "../controllers/menu-controller";

@inject(MenuRenderer, MenuController, I18N)
export class MenuService {
  constructor(menuRenderer, menuController, i18n) {
    this.menuRenderer = menuRenderer;
    this.controller = menuController;
    this.i18n = i18n;
  }

  renderMenu(viewModel) {
    return this.controller.renderMenu(viewModel);
  }
}
