import { bindable, inject, customElement } from 'aurelia-framework';

@inject(Element)
@customElement('context-menu')
export class ContextMenu {
  @bindable visible = false;
  @bindable items = [];
  constructor(element) {
    this.element = element;
  }
  attached() {
    this.contextMenu = this.element.querySelector('.context-menu');
    this.element.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    document.addEventListener('click', (e) => {
      console.log(this.contextMenu);
      this.visible = !this.visible;
      switch (this.visible) {
        case true:
          this.contextMenu.classList.add('context-menu--visible');
          this.contextMenu.classList.remove('context-menu--hidden');
          break;
        case false:
          this.contextMenu.classList.add('context-menu--hidden');
          this.contextMenu.classList.remove('context-menu--visible');
          break
      }
    });
  }
}
