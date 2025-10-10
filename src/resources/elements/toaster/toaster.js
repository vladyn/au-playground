import { inject, bindable, customElement } from 'aurelia-framework';

@inject(Element)
@customElement('toaster')
export class Toaster {
  @bindable title = 'Toaster';
  @bindable message = 'This is a toaster message';

  constructor(element) {
    this.element = element;
    console.log('toaster element: ', this.element);
  }

  bind(bindingContext, overrideContext) {
    console.log('toaster bind');
    this.title = bindingContext?.title || this.title;
    this.message = bindingContext?.message || this.message;
    this.visible = bindingContext?.visible || this.visible;
  }

  attached() {
    console.log('toaster attached');
  }

  detached() {
    console.log('toaster detached');
  }
}
