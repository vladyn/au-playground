// mock local Storage

export class LocalStorage {
  constructor() {
    this.storage = {};
  }

  getItem(key) {
    return this.storage[key] || null;
  }

  setItem(key, value) {
    this.storage[key] = value;
  }

  removeItem(key) {
    delete this.storage[key];
  }

  clear() {
    this.storage = {};
  }
}

/**
 *  Usage example
 *  const localStorageMock = new LocalStorage();
 *  localStorageMock.setItem('key', 'value');
 *  console.log(localStorageMock.getItem('key')); // Output: 'value'
 *   localStorageMock.removeItem('key');
 *   console.log(localStorageMock.getItem('key')); // Output: null
 *   localStorageMock.clear();
 * */
