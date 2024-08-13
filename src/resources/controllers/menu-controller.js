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

  openMenu(viewModel) {
    this.visible = true;
    const mergedViewModel = {message: 'BLIAS!!!',  visible: this.visible };
    return this.renderer.openMenu(mergedViewModel);
  }
}
