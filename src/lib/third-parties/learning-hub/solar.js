export class Solar {
  message = "Hola from solar";
  
  constructor(state = {}) {
    this.state = state;
  }

  create() {
    return customElements.define('solar-element', class extends HTMLElement {
      constructor(message = "Hola from solar") {
        super();
        this.message = message;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<p>${this.message}</p>`;
      }
    });
  }

  render() {
    this.create();
    const solarElement = document.createElement('solar-element');
    return solarElement;
  }
}
