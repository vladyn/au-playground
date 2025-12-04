import {
  inject,
  ViewSlot
}  from 'aurelia-framework';

@inject()
export class ToasterRenderer {
  toasterControllers = [];

  render(toastController) {
    toastController.slot = new ViewSlot(document.body, true);
    toastController.slot.add(toastController.view);

    toastController.show = () => {
      this.toasterControllers.push(toastController);
      toastController.slot.attached();
      return new Promise((resolve, reject) => {
        resolve(toastController);
      })
    }

    toastController.hide = () => {
      return new Promise((resolve, reject) => {
        const index = this.toasterControllers.indexOf(toastController);
        if (index > -1) {
          this.toasterControllers.splice(index, 1);
        }
        resolve(toastController);
      });
    }

    toastController.destroy = () => {
      toastController.slot.detached();
      toastController.slot.removeAll(true);
      return new Promise((resolve, reject) => {
        resolve(toastController);
      });
    }
    return Promise.resolve(toastController);
  }

  showToaster(toastController) {
    return toastController.show();
  }

  hideToaster(toastController) {
    return toastController.hide();
  }

  destroyHost(dialogController) {
    return dialogController.destroy();
  }
}
