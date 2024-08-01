import { inject } from "aurelia-framework";
import { MenuRenderer } from "../rederers/menu-renderer";
import { MenuController } from "../controllers/menu-controller";

@inject(MenuRenderer, MenuController)
export class MenuService {
  constructor(menuRenderer, menuController) {
    this.menuRenderer = menuRenderer;
    this.controller = menuController;
    console.log("MenuService constructor");
    console.log(menuRenderer);
    console.log(this.menuRenderer);
    console.log(menuController);
    console.log(this.controller);
  }

  renderMenu(viewModel) {
    this.menuRenderer.render(viewModel);
  }
}
