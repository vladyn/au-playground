import { inject, bindable, customElement } from 'aurelia-framework';
import { ToasterController } from "../../controllers/toaster-controller";

@inject(Element, ToasterController)
@customElement('toaster')
export class Toaster {
  @bindable title = 'Toaster';
  @bindable message = 'This is a toaster message';

  constructor(element, toasterController) {
    this.element = element;
    this.toasterController = toasterController;
  }

  attached() {
    this.element.focus();
    console.log('Toaster attached');
  }

  bind(bindingContext, overrideContext) {
    this.title = bindingContext?.title || this.title;
    this.message = bindingContext?.message || this.message;
  }

  hide() {
    this.toasterController.close(true, { result: 'Toaster closed' })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }
}
