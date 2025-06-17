import toastr from 'toastr';
import { Config } from './config';

const defaults = {
  source: 'app',
  title: '',
  message: 'no message provided',
  data: '',
  showToast: true,
  type: 'info',
  timeout: '60000'
};

function log(options) {
  let opts = Object.assign({}, defaults, options);

  if (opts.showToast) {
    let last = toastr[opts.type](opts.message, opts.title);
    return last;
  }
}

function sanitize(options, messageType) {
  if (typeof options === 'string' || options instanceof String) {
    return {
      message: options,
      type: messageType
    };
  }

  options.type = messageType;
  return options;
}

export class Logger {
  constructor() {
    let defOpts = {
      closeButton: true,
      positionClass: 'toast-bottom-right',
      fadeOut: 1000
    };

    let configOptions = Config.loggerOpts || {};
    let options = Object.assign(toastr.options, defOpts, configOptions);
    toastr.options = options;
  }

  warn(options) {
    this.options({
      'timeOut': defaults.timeout / 12
    });
    log(sanitize(options, 'warning'));

    this.restore();
  }

  info(options) {
    this.options({
      'timeOut': options.timeout || defaults.timeout,
      'closeHtml': options.closeHtml || '<button type="button" class="toast-close-button" id="close-button" aria-label="Close">×</button>'
    });
    log(sanitize(options, 'info'));

    this.restore();
  }

  error(options) {
    log(sanitize(options, 'error'));
  }

  success(options) {
    this.options({
      'timeOut': defaults.timeout / 12
    });
    log(sanitize(options, 'success'));

    this.restore();
  }

  options(options) {
    let newOptions = Object.assign(toastr.options, options);
    toastr.options = newOptions;
  }

  restore() {
    this.options({
      'timeOut': defaults.timeout
    });
  }

  clear(log) {
    toastr.clear(log);
  }
}
