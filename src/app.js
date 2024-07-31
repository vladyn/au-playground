import { inject } from 'aurelia-framework';
import { ViewFactory } from './resources/rederers/view-factory';
import { MenuRenderer } from './resources/rederers/menu-renderer';
@inject(ViewFactory, MenuRenderer)
export class App {
  visible = false;
  message = 'Hello World!';

  viewHtml =
`<template>
  <account-details></account-details>
  <h1>\${message}</h1>
</template>`;

contextMenu = `
<template>
  <context-menu visible.bind="visible"></context-menu>
</template>`;

  viewModelJs = 
`{ 
  message: 'hello world',
  visible: true
}`;
  
  constructor(viewFactory, contextMenuRenderer) {
    this.viewFactory = viewFactory;
    this.contextMenuRenderer = contextMenuRenderer;
  }
  
  submit() {
    let viewModel = null;
    this.remove();
    try {
      eval('viewModel = ' + this.viewModelJs);
    }
    catch(e) {
      this.container.innerHTML = '<em style="color:red">Error parsing view model.</em>';
      return;
    }
    // this.dispose = this.viewFactory.insert(this.container, this.viewHtml, viewModel);
    this.compose = this.contextMenuRenderer.render(this.container, this.contextMenu);
  }
  
  remove() {
    if (this.dispose) {
      // this.dispose();
      this.compose();
      this.dispose = null;
    }
  }
  
}
