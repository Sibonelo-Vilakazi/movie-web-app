import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GenericHttpService } from './services/generic-http.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],

};
