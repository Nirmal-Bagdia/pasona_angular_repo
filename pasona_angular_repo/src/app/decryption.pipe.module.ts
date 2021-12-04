// application-pipes.module.ts
// other imports
import { NgModule} from '@angular/core';
import { DecryptionPipe } from './decryption.pipe';


@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    DecryptionPipe
  ],
  exports: [
    DecryptionPipe
  ]
})
export class DecryptionPipesModule {}