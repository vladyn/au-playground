import { inject, bindable, customElement } from 'aurelia-framework';
import { ToasterController } from "../../controllers/toaster-controller";

@inject(Element, ToasterController)
@customElement('toaster')
export class Toaster {
  @bindable title = 'Toaster';
  @bindable message = 'This is a toaster message';

  count = null;

  constructor(element, toasterController) {
    this.element = element;
    this.controller = toasterController;
  }

  bind(bindingContext, overrideContext) {
    this.title = bindingContext?.title || this.title;
    this.message = bindingContext?.message || this.message;
    this.count = overrideContext.bindingContext.controller.renderer.toasterControllers.length;
    this.title += ` (${this.count})`;
    if (this.count > 0) {
      const toastMessages = Array.from(this.element.querySelectorAll('.toaster'));
        toastMessages.forEach((toastMessage, index) => {
          toastMessage.style.top = `${(index * 160) + 160}px`;
        });
    }
  }

  hide() {
    this.controller.ok(true, { result: 'Toaster closed' })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      });
  }
}
