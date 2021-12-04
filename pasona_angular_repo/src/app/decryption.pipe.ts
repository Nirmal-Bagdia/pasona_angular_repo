// capitalize.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import * as CryptoJS from 'crypto-js';
//import * as CryptoJS from 'crypto-js';

@Pipe({name: 'decryption'})
export class DecryptionPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;
    var keys='0uKyf#t2#bw)*fB@';
    var ivstr = "ADVANTALPASONAAM";
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(ivstr);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var dcrpt = decrypted.toString();

    if (dcrpt == '') {
        return value;
    } else {
      try
      {
        return decrypted.toString(CryptoJS.enc.Utf8);
      }
      catch(e)
      {
         return value;
      }
    }
  }
}