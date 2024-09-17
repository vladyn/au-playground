export class MenuController {
  constructor(menuRenderer) {

    this.renderer = menuRenderer;
  }

  renderMenu(viewModel) {
    return this.renderer.render(viewModel);
  }

  closeMenu() {
    return this.renderer.closeMenu();
  }

  openMenu(viewModel) {
    return this.renderer.openMenu(viewModel);
  }
}
