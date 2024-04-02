export class Solar {
  constructor() {
    this.appRoot = this.create();
  }

  create() {
    customElements.define('app-root', class extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        console.log('Connected');
      }
    });
  }

  container() {
      // Create a new div
      let div = document.createElement('div');
      div.id = 'learning-hub';

      // Attach a shadow root to the div
      let shadowRoot = div.attachShadow({mode: 'open'});

      const root = document.createElement('app-root');
      shadowRoot.appendChild(root);

      return shadowRoot;
  }

  addStyles() {
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = 'http://localhost:8000/styles.css';
    document.head.appendChild(styles);
  }

  createScripts() {
    const main = document.createElement('script');
    main.src = 'http://localhost:8000/main.js';
    main.type = 'module';
    main.onload = () => {
      console.log('Main loaded');
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
    this.createScripts();
    return this.container();
  }
}
