import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  imports: [
    HttpClientModule // Para habilitar llamadas HTTP en toda la app
  ],
  providers: [
  ]
})
export class CoreModule {
  // Protege de que CoreModule se importe más de una vez
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule ya fue cargado. Solo debe importarse en AppModule.'
      );
    }
  }
}
