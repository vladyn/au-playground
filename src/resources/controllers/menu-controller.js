export class MenuController {
  constructor(menuRenderer) {
    this.visible = true;
    this.renderer = menuRenderer;
  }

  renderMenu(viewModel) {
    const mergedViewModel = {...viewModel,  visible: this.visible };
    return this.renderer.render(mergedViewModel);
  }

  closeMenu() {
    this.visible = false;
    return this.renderer.closeMenu();
  }

  openMenu() {
    this.visible = true;
    return this.renderer.openMenu();
  }
}
