// application-pipes.module.ts
// other imports
import { NgModule} from '@angular/core';
import { EllipsifyMeDirective } from './ellipsify-me.directive';


@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    EllipsifyMeDirective
  ],
  exports: [
    EllipsifyMeDirective
  ]
})
export class EllipsifyModule {}