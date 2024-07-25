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
    document.addEventListener('mouseup', (e) => {
      if (e.button === 2) {
        this.visible = !this.visible;
        switch (this.visible) {
          case true:
            this.contextMenu.classList.remove('context-menu--hidden');
            this.contextMenu.classList.add('context-menu--visible');
            break;
          case false:
            this.contextMenu.classList.remove('context-menu--visible');
            this.contextMenu.classList.add('context-menu--hidden');
            break
        }
      }
    });
  }

  detached() {
    this.element.removeEventListener('click', () => 'noop');
    document.removeEventListener('mouseup', () => 'noop');
  }
}
