export class ToasterController {
  constructor(toasterRenderer) {
    this.renderer = toasterRenderer;
    this.isVisible = false;
    this.viewModel = null;
    this.snoozeTimeoutId = null;
    this.defaultSnoozeTime = 3000; // 3 seconds
  }

  showToaster(viewModel) {
    this.viewModel = viewModel;
    this.isVisible = true;
    return this.renderer.showToaster(this.viewModel);
  }

  hideToaster() {
    if (!this.isVisible) {
      console.warn('Toaster is already hidden. Use toggleToaster to change its state.');
      return;
    }
    this.isVisible = false;
    if (this.snoozeTimeoutId) {
      clearTimeout(this.snoozeTimeoutId);
      this.snoozeTimeoutId = null;
    }
    return this.renderer.hideToaster();
  }

  snoozeToaster(snoozeTime = this.defaultSnoozeTime) {
    if (!this.isVisible) {
      console.warn('Toaster is not visible. Cannot snooze.');
      return;
    }
    this.isVisible = false;
    this.renderer.hideToaster();
    this.snoozeTimeoutId = setTimeout(() => {
      this.isVisible = true;
      this.renderer.showToaster(this.viewModel);
      this.snoozeTimeoutId = null;
    }, snoozeTime);
  }

  toggleToaster(viewModel) {
    if (this.isVisible) {
      return this.hideToaster();
    }
    
    return this.showToaster(viewModel);
  }
}
