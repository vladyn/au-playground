import { inject, bindable, customElement } from 'aurelia-framework';
import { ToasterController } from "../../controllers/toaster-controller";
import { toastSizes } from '../../enums/toaster-sizes';

@inject(Element, ToasterController)
@customElement('toaster')
export class Toaster {
  count = null;

  constructor(element, toasterController) {
    this.element = element;
    this.controller = toasterController;
  }

  bind(bindingContext) {
    this.title = this.controller.viewModel?.title;
    this.message = this.controller.viewModel?.message;
    this.toastType = this.controller.viewModel?.type || 'info';
    this.count = bindingContext.controller.renderer.toasterControllers.length;
    this.title += ` (${this.count})`;
    if (this.count > 0) {
      const toastMessages = Array.from(this.element.querySelectorAll('.toaster'));
        toastMessages.forEach((toastMessage, index) => {
          toastMessage.style.top = `${(index * toastSizes.get('medium').height) + toastSizes.get('medium').height}px`;
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
