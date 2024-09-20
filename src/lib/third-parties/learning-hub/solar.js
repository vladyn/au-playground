export class Solar {
  constructor() {
    this.appRoot = this.create();
  }

  create() {
    let template = document.createElement("template");
    template.innerHTML = `
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
        :host {
          display: block;
          padding: 10px;
          color: var(--x-foo-text-color, black);
          background-color: var(--x-foo-background-color, white);
        }
        h1 {
          color: red;
        }
      </style>
      <link rel="stylesheets" href="http://localhost:8080/lib/styles.css"></style>
      <h1>Hello, Shadow DOM!</h1>
    `;

    customElements.define(
      "learning-hub",
      class extends HTMLElement {
        constructor() {
          super(); 
          const shadowRoot = this.attachShadow({ mode: 'open' });
          shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
          this.id = "learning-hub";
          const s1 = document.createElement('script');
          s1.type = 'module'
          s1.src = 'http://localhost:8080/lib/main.js'
          this.shadowRoot.appendChild(s1);
        }
      }
    );

    const appRoot = document.createElement("learning-hub");
    return appRoot;
  }

  render() {
    return this.appRoot;
  }
}
