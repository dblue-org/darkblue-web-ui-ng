import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './http/base-url.interceptor';
import {responseInterceptor} from "./http/response.interceptor";
import { TemplatePageTitleStrategy } from './platform/template-page-title-strategy';
import { provideAnimations } from '@angular/platform-browser/animations';

registerLocaleData(zh);


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzIcons(),
    provideAnimations(),
    provideNzI18n(zh_CN),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([baseUrlInterceptor, responseInterceptor])),
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
    /*{provide: RouteReuseStrategy, useClass: UrlMatcherRouteReuseStrategy},*/
  ]
};


