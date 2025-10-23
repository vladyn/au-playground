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

    toastController.showToast = () => {
      toastController.attached();
      toastController.bind(toastController, createOverrideContext(toastController));
      this.toasterControllers.push(toastController);
      return new Promise((resolve, reject) => {
        resolve(toastController);
      })
    }

    toastController.hideToast = () => {
      toastController.slot.removeAll();
    }
    return Promise.resolve(toastController);
  }

  showToaster(toastController) {
    return toastController.showToast();
  }

  hideToaster(toastController) {
    return toastController.hideToast();
  }
}
