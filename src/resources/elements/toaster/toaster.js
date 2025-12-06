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
    
    if (this.count > 0) {
      this.title += ` (${this.count})`;
      const toastMessages = this.element.querySelectorAll('.toaster');
      if (toastMessages?.length > 1) {
        /// query this element and update the the top position with offset 160px per toast message
        toastMessages.forEach((toastMessage, index) => {
          toastMessage.style.top = `${index * 160 + 20}px`;
        });
      }
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
