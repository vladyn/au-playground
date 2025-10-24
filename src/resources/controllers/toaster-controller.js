import {invokeLifecycle} from "../utils/lifecycle";

export class ToasterController {
  constructor(toasterRenderer, settings, _resolve, _reject) {
    this.renderer = toasterRenderer;
    this.settings = settings;
    this._resolve = _resolve;
    this._reject = _reject;
  }

  ok(result) {
    return this.close(true, result);
  }

  cancel(result) {
    return this.close(false, result);
  }

  close(ok, result) {
    return invokeLifecycle(this.viewModel, 'canDeactivate').then(canDeactivate => {
      if (canDeactivate) {
        return invokeLifecycle(this.viewModel, 'deactivate').then(() => {
          return this.renderer.hideToaster(this).then(() => {
            return this.renderer.destroyHost(this).then(() => {
              this.controller.unbind();
              this._resolve({wasCancelled: !ok, output: result});
            });
          });
        });
      }
    });
  }
}
