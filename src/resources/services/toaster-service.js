import { Origin, Container, CompositionEngine, inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ToasterRenderer } from '../renderers/toaster-renderer';
import { ToasterController } from '../controllers/toaster-controller';
import { invokeLifecycle } from '../utils/lifecycle';
import { ShowToasterEvent } from "../events/tosater-event";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Toaster } from "../elements/toaster/toaster";

@inject(ToasterRenderer, I18N, CompositionEngine, Container, EventAggregator)
export class ToasterService {
  constructor(toasterRenderer, i18n, compositionEngine, container, eventAggregator) {
    this.toasterRenderer = toasterRenderer;
    this.i18n = i18n;
    this.compositionEngine = compositionEngine;
    this.container = container;
    this.eventAggregator = eventAggregator;
  }

  showToaster(model) {
    this.eventAggregator.publish(new ShowToasterEvent());

    return new Promise((resolve, reject) => {
      let childContainer = this.container.createChild();
      let toasterController = new ToasterController(this.toasterRenderer, resolve, reject);

      let instruction = {
        viewModel: Toaster,
        container: this.container,
        childContainer: childContainer
      }

      childContainer.registerInstance(ToasterController, toasterController);

      return this.#getViewModel(instruction).then(returnedInstruction => {
        toasterController.viewModel = returnedInstruction.viewModel;

        return invokeLifecycle(returnedInstruction.viewModel, 'canActivate', model).then(canActivate => {
          if (canActivate) {
            return this.compositionEngine.createController(returnedInstruction).then(controller => {
              toasterController.controller = controller;
              toasterController.view = controller.view;
              controller.automate();

              return this.toasterRenderer.render(toasterController)
            });
          }
        });
      });
    })
  }

  hideAllToasters() {
    let toasterControllers = this.toasterRenderer.toasterControllers;
    if (toasterControllers.length > 0) {
      toasterControllers.forEach(dc => {
        dc.cancel();
      });
    }
  }

  #getViewModel(instruction) {
    if (typeof instruction.viewModel === 'function') {
      instruction.viewModel = Origin.get(instruction.viewModel).moduleId;
    }

    if (typeof instruction.viewModel === 'string') {
      return this.compositionEngine.ensureViewModel(instruction);
    }

    return Promise.resolve(instruction);
  }
}
