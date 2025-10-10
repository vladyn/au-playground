import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ToasterRenderer } from '../renderers/toaster-renderer';
import { ToasterController } from '../controllers/toaster-controller';

@inject(ToasterRenderer, I18N)
export class ToasterService {
  constructor(toasterRenderer, i18n) {
    this.toasterRenderer = toasterRenderer;
    this.i18n = i18n;
    this.controller = new ToasterController(toasterRenderer);
  }

  showToaster(viewModel) {
    return this.controller.showToaster(viewModel);
  }

  hideToaster() {
    return this.controller.hideToaster();
  }

  snoozeToaster() {
    return this.controller.snoozeToaster();
  }
  
  toggleToaster(viewModel) {
    return this.controller.toggleToaster(viewModel);
  }
}
