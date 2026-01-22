import { invokeLifecycle } from "../utils/lifecycle";

export class ToasterController {
  constructor(toasterRenderer, _resolve, _reject) {
    this.renderer = toasterRenderer;
    this._resolve = _resolve;
    this._reject = _reject;
    this.timeOutId = null;
  }

  ok(result) {
    return this.close(true, result);
  }

  cancel(result) {
    return this.close(false, result);
  }

  closeWithDelay(ok, result, delay) {
    return new Promise((resolve, reject) => {
      this.timeOutId = setTimeout(() => {
        this.close(ok, result)
          .then(res => resolve(res))
          .catch(err => reject(err));
      }, delay);
    });
  }

  close(ok, result) {
    return invokeLifecycle(this.viewModel, 'canDeactivate').then(canDeactivate => {
      if (!canDeactivate) {
        return Promise.reject('Cannot close toaster');
      }

      return invokeLifecycle(this.viewModel, 'deactivate').then(() => {
          return this.renderer.hideToaster(this).then(() => {
            return this.renderer.destroyHost(this).then(() => {
              this.controller.unbind();
              this._resolve({ wasCancelled: !ok, output: result });
              clearTimeout(this.timeOutId);
              return Promise.resolve({ wasCancelled: !ok, output: result });
            });
          });
        });
    });
  }
}
