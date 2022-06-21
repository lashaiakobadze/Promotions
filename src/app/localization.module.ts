import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class TranslateBrowserLoader implements TranslateLoader {
  constructor(
    private prefix: string,
    private suffix: string,
    private http: HttpClient
  ) {}

  getTranslation(lang: string): Observable<any> {
    return new TranslateHttpLoader(
      this.http,
      this.prefix,
      this.suffix
    ).getTranslation(lang);
  }
}

export function translateFactory(http: HttpClient): TranslateLoader {
  return new TranslateBrowserLoader('./config/locales/', '.json', http);
}

export const translateProviders = {
  loader: {
    provide: TranslateLoader,
    useFactory: translateFactory,
    deps: [HttpClient]
  }
};
