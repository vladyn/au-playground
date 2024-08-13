import { bindable, inject, customElement } from 'aurelia-framework';

@inject(Element)
@customElement('context-menu')
export class ContextMenu {
  @bindable items = [];
  @bindable message = '';
  visible = false;
  constructor(element, replaceNativeContextMenu = true) {
    this.element = element;
    this.replaceNativeContextMenu = replaceNativeContextMenu;
  }

  bind(bindingContext) {
    console.log('bound', bindingContext);
    this.message = bindingContext?.message;
    this.visible = bindingContext?.visible;

    if (!this.visible) {
      return;
    }

    document.addEventListener('mouseup', (e) => {
      console.log('binding context visible is: ', bindingContext?.visible);
      const anchor = this.element.querySelector('.anchor');
      if (e.button === 2) {
        anchor.style.left = `${e.clientX}px`;
        anchor.style.top = `${e.clientY}px`;
        this.visible ? this.open() : this.toggle();
      }

      if(e.button === 0 && this.visible && !e.target.closest('.context-menu')) {
        this.toggle();
      }
    });
  }

  attached() {
    this.contextMenu = this.element.querySelector('.context-menu');
    this.element.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  toggle() {
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

  open() {
    this.visible = true;
    this.contextMenu.classList.remove('context-menu--hidden');
    this.contextMenu.classList.add('context-menu--visible');
  }

  close() {
    this.visible = false;
    this.contextMenu.classList.remove('context-menu--visible');
    this.contextMenu.classList.add('context-menu--hidden');
  }

  detached() {
    this.element.removeEventListener('click', () => 'noop');
    document.removeEventListener('mouseup', () => 'noop');
    document.removeEventListener('contextmenu', () => 'noop');
  }
}
