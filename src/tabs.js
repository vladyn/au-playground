import { bindable, BindingEngine, Container, processContent } from "aurelia-framework";
  
  function processTabs(compiler, resources, node, instruction) {
    // first create 2 templates for the replaceable parts
    const headerTemplate = document.createElement("template");
    headerTemplate.setAttribute("replace-part", "header");
    const contentTemplate = document.createElement("template");
    contentTemplate.setAttribute("replace-part", "content");
  
    // process all tabs
    const tabs = Array.from(node.querySelectorAll("tab"));
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
  
      // add header
      const header = document.createElement("button");
      header.classList.add("btn", "btn-link");
      header.setAttribute("click.delegate", `showTab('${i}')`);
      header.innerText = tab.getAttribute("header");
      headerTemplate.content.appendChild(header);
  
      // add content
      const content = document.createElement("div");
      content.setAttribute("show.bind", `activeTabId=='${i}'`);
      content.append(...Array.from(tab.childNodes));
      contentTemplate.content.appendChild(content);
  
      node.removeChild(tab);
    }
  
    // Activate the first tab
    const bindingEngine = Container.instance.get(BindingEngine);
    instruction.attributes = {
      ...instruction.attributes,
      "active-tab-id": bindingEngine.createBindingExpression("activeTabId", "'0'")
    };
  
    node.append(headerTemplate, contentTemplate);
    return true;
  }
  
  @processContent(processTabs)
  export class Tabs {
    @bindable activeTabId;
    showTab(tabId) {
      this.activeTabId = tabId;
    }
  }
  