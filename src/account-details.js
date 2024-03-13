import { inject, customElement, bindable, useView, processContent } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
@processContent((compiler, resources, node, instruction) => {
  const contentTemplate = document.createElement("template");
  contentTemplate.setAttribute("replace-part", "content");
  const content = document.createElement("div");
  content.innerHTML = `<h1>\${message}</h1>`;
  contentTemplate.content.appendChild(content);
  node.append(contentTemplate);
  return true;
})
@useView(PLATFORM.moduleName('./account-details.jade'))
@customElement('account-details')
@inject(Element)
export class AccountDetails {
  @bindable message = "No details yet.";

  constructor(element) {
    this.element = element
    this.element.className += ' .custom-panel'
  }
}
