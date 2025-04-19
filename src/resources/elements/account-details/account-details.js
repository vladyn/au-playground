import { inject, customElement, bindable, processContent } from 'aurelia-framework';
@processContent((compiler, resources, node, instruction) => {
  const contentTemplate = document.createElement("template");
  contentTemplate.setAttribute("replace-part", "content");
  const content = document.createElement("div");
  content.innerHTML = '<h1>${message}</h1>';
  contentTemplate.content.appendChild(content);
  node.append(contentTemplate);
  return true;
})

@customElement('account-details')
@inject(Element)
export class AccountDetails {
  @bindable message = "No details yet.";
  @bindable firstName = "Bob";
  @bindable lastName = "Brown";

  constructor(element) {
    this.element = element
    this.element.className += ' .custom-panel'
  }
}
