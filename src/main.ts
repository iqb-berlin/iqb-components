import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { name, version, repository } from '../package.json';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([
  {
    provide: "APP_VERSION",
    useValue: version
  },
  {
    provide: "APP_NAME",
    useValue: name
  },
  {
    provide: "GITHUB_DATA",
    useValue: {
      token: environment.gitHubToken,
      user: environment.gitHubUser,
      repositoryUrls: {
        'default': repository.url,
        'dummy': "https://github.com/iqb-berlin/non-existing-repo",
      },
    }
  }
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
