import {
  inject,
  ViewCompiler,
  Container,
  ViewSlot,
  createOverrideContext
} from 'aurelia-framework';
@inject(ViewCompiler, Container)
export class MenuRenderer {
  constructor(viewCompiler, container) {
    this.viewCompiler = viewCompiler;
    this.container = container;
  }

  render(viewModel) {
    const template = `
        <template>
          <context-menu visible.bind="visible"></context-menu>
        </template>`;
    let viewFactory = this.viewCompiler.compile(template);
    let view = viewFactory.create(this.container);
    let anchorIsContainer = true;
    let viewSlot = new ViewSlot(document.body, anchorIsContainer);
    viewSlot.add(view);
    viewSlot.attached();
    viewSlot.bind(viewModel, createOverrideContext(viewModel));
    return () => {
      viewSlot.remove(view);
    };
  }

  closeMenu() {
    const contextMenu = document.querySelector('context-menu');
    contextMenu.visible = false;
    return contextMenu;
  }

  openMenu() {
    const contextMenu = document.querySelector('context-menu');
    // change attribute visible = true;
    contextMenu.visible = false;

    return contextMenu;
  }
}
