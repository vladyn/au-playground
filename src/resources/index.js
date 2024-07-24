import {PLATFORM} from 'aurelia-pal';

export function configure(config) {
  config.globalResources(
    PLATFORM.moduleName('./elements/skills/skills')
  );

  config.globalResources(
    PLATFORM.moduleName('./elements/account-details/account-details')
  );

  config.globalResources(
    PLATFORM.moduleName('./elements/my-profile/my-profile')
  );

  config.globalResources(
    PLATFORM.moduleName('./elements/tabs/tabs')
  );
}
