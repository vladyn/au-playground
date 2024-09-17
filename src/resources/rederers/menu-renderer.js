import {
  inject,
  ViewCompiler,
  Container,
  ViewSlot,
  createOverrideContext
} from 'aurelia-framework';
@inject(ViewCompiler, Container)
export class MenuRenderer {
  viewSlot;

  constructor(viewCompiler, container) {
    this.viewCompiler = viewCompiler;
    this.container = container;
  }

  render(viewModel) {
    const template = `
        <template>
          <context-menu></context-menu>
        </template>`;
    const viewFactory = this.viewCompiler.compile(template);
    const view = viewFactory.create(this.container);
    const anchorIsContainer = true;
    this.viewSlot = new ViewSlot(document.body, anchorIsContainer);
    this.viewSlot.add(view);
    this.viewSlot.attached();
    this.viewSlot.bind(viewModel, createOverrideContext(viewModel));
  }

  closeMenu() {
    console.log(this.viewSlot);
    this.viewSlot.removeAll();
  }

  openMenu(viewModel) {
    this.render(viewModel);
  }
}
