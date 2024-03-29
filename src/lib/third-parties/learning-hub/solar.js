export class Solar {
  message = "Hola from solar";
  
  constructor(state = {}) {
    this.state = state;
  }

  createElement() {
    customElements.define('solar-element', class extends HTMLElement {
      constructor(message = "Hola from solar") {
        super();
        this.message = message;
        this.attachShadow({mode: 'open'});
        console.log(this.shadowRoot);
      }
    });
  }

  addStyles() {
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = 'http://localhost:8000/styles.css';
    document.head.appendChild(styles);
  }

  createScripts() {
    // create the scripts elements 
    const main = document.createElement('script');
    main.src = 'http://localhost:8000/main.js';
    main.type = 'module';
    main.onload = () => {
      console.log('Solar loaded');
    };
    
    const polyfill = document.createElement('script');
    polyfill.src = 'http://localhost:8000/polyfills.js';
    polyfill.onload = () => {
      console.log('Polyfill loaded');
    };

    document.body.appendChild(polyfill);
    document.body.appendChild(main);
  }

  render() {
    this.addStyles();
    this.createElement();
    this.createScripts();
    const solarElement = document.createElement('app-root');
    return solarElement;
  }
}
