export class ConfigDefaults {
}

ConfigDefaults._defaults = {
  locale: 'en-US'
};

ConfigDefaults.defaults = function () {
  let defaults = {};
  Object.assign(defaults, ConfigDefaults._defaults);
  return defaults;
};

export class Config {
  constructor(innerConfig) {
    this.innerConfig = innerConfig;
    this.values = this.innerConfig ? {} : ConfigDefaults.defaults();
    this.changedHandlers = new Map();
  }

  getValue(identifier) {
    if (this.values.hasOwnProperty(identifier) !== null && this.values[identifier] !== undefined) {
      return this.values[identifier];
    }
    if (this.innerConfig !== null) {
      return this.innerConfig.getValue(identifier);
    }
    throw Error('Config not found: ' + identifier);
  }

  setValue(identifier, value) {
    this.values[identifier] = value;
    return this; //fluent API
  }

  getDependencies() {
    return this.getValue('dependencies');
  }

  setHttpService(httpOpts) {
    Config.httpOpts = httpOpts;
  }

  setLoggerService(loggerOpts) {
    Config.loggerOpts = loggerOpts;
  }

  useLocale(localeIdentifier) {
    this.setValue('locale', localeIdentifier);
    let callbacks = Array.from(this.changedHandlers.values());
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
    return this;
  }

  locale() {
    return this.getValue('locale')
  }
}

Config.uniqueListenerId = 0;
