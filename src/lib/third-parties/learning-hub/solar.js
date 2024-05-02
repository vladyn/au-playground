export class Solar {
  constructor() {
    this.iframe = this.createIframe();
    this.appRoot = this.create();
  }

  create() {
    /**
     * Check is the element is not already defined and if so, return it's constructor call
     */
    const Container = customElements.get('solar-element');
    if (Container) return new Container();

    const frame = this.iframe;

    /**
     * Define a custom element and add it to the  Shadow DOM
     */
    customElements.define(
      'solar-element',
      class extends HTMLElement {
        constructor() {
          super();
        }

        connectedCallback() {
          this.id = 'solar-element';
          this.appendChild(frame);
        }
      }
    );

    const appRoot = document.createElement('solar-element');
    return appRoot;
  }

  render() {
    return this.appRoot;
  }

  createIframe() {
    const iframe = document.createElement('iframe');
    iframe.src = 'solar-element.html';
    iframe.width = '100%';
    iframe.height = '920px';
    iframe.allow = 'fullscreen';
    iframe.id = 'learning-frame';
    return iframe;
  }
}
