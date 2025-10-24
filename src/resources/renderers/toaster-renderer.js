import {
  inject,
  ViewCompiler,
  Container,
  ViewSlot,
  createOverrideContext
}  from 'aurelia-framework';

@inject(ViewCompiler, Container)
export class ToasterRenderer {
  toasterControllers = [];

  constructor(viewCompiler, container) {
    this.viewCompiler = viewCompiler;
    this.container = container;
  }

  render(toastController) {
    // const template = `
    //     <template>
    //       <toaster></toaster>
    //     </template>`;
    // const viewFactory = this.viewCompiler.compile(template);
    // const view = viewFactory.create(this.container);
    toastController.slot = new ViewSlot(document.body, true);
    toastController.slot.add(toastController.view);

    toastController.show = () => {
      toastController.attached();
      toastController.bind(toastController, createOverrideContext(toastController));
      this.toasterControllers.push(toastController);
      return new Promise((resolve, reject) => {
        resolve(toastController);
      })
    }

    toastController.hide = () => {
      toastController.slot.removeAll();
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
      toastController.unbind();
      return new Promise((resolve, reject) => {
        resolve();
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
