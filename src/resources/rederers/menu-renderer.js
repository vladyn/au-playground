import {
  inject,
  ViewCompiler,
  ViewResources,
  Container,
  ViewSlot,
  createOverrideContext
} from 'aurelia-framework';
@inject(ViewCompiler, ViewResources, Container)
export class MenuRenderer {
  constructor(viewCompiler, resources, container) {
    this.viewCompiler = viewCompiler;
    this.resources = resources;
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
}
