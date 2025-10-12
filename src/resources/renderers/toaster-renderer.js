import { 
  inject, 
  ViewCompiler, 
  Container,
  ViewSlot,
  createOverrideContext
}  from 'aurelia-framework';

@inject(ViewCompiler, Container)
export class ToasterRenderer {
  viewSlot;

  constructor(viewCompiler, container) {
    this.viewCompiler = viewCompiler;
    this.container = container;
  }

  render(viewModel) {
    const template = `
        <template>
          <toaster></toaster>
        </template>`;
    const viewFactory = this.viewCompiler.compile(template);
    const view = viewFactory.create(this.container);
    const anchorIsContainer = true;
    this.viewSlot = new ViewSlot(document.body, anchorIsContainer);
    this.viewSlot.add(view);
    this.viewSlot.attached();
    this.viewSlot.bind(viewModel, createOverrideContext(viewModel));
  }

  showToaster(viewModel) {
    this.render(viewModel);
  }

  hideToaster() {
    this.viewSlot.removeAll();
  }

  toggleToaster(viewModel) {
    if (this.viewSlot.children.length > 0) {
      this.hideToaster();
    } else {
      this.showToaster(viewModel);
    }
  }
}
