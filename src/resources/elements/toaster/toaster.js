import { inject, bindable, customElement } from 'aurelia-framework';
import { ToasterService } from '../../services/toaster-service';

@inject(Element, ToasterService)
@customElement('toaster')
export class Toaster {
  @bindable title = 'Toaster';
  @bindable message = 'This is a toaster message';

  constructor(element, toasterService) {
    this.element = element;
    this.toasterService = toasterService;
  }

  bind(bindingContext, overrideContext) {
    this.title = bindingContext?.title || this.title;
    this.message = bindingContext?.message || this.message;
  }

  hide() {
    this.toasterService.hideToaster();
  }
}
