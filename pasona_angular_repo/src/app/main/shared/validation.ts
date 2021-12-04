import { AbstractControl, ValidatorFn, FormGroup } from "@angular/forms";

export class CustomValidator {
   // Validates URL

   static passwordMatchValidator(control: AbstractControl) {
      if (control.get('password') != null) {
         var password: string = control.get('password').value; // get password from our password form control
         var confirmPassword: string = control.get('confirm').value; // get password from our confirmPassword form control
         // compare is the password math
         if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirm').setErrors({ NoPassswordMatch: true });
         }
      }
   }

   static urlValidator(url): any {
      if (url.pristine) {
         return null;
      }
      //  const URL_REGEXP = /^(http?|ftp|https):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
      const URL_REGEXP = /^([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
      url.markAsTouched();
      if (URL_REGEXP.test(url.value)) {
         return null;
      }
      return {
         invalidUrl: true
      };
   }
   // Validates passwords
   static matchPassword(group): any {
      const password = group.controls.password;
      const confirm = group.controls.confirm;
      if (password.pristine || confirm.pristine) {
         return null;
      }
      group.markAsTouched();
      if (password.value == confirm.value) {
         return null;
      }
      return {
         invalidPassword: true
      };
   }

   
   // Validates numbers

   static emailValidator(email): any {

      if (email.pristine) {
         return null;
      }
      const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      email.markAsTouched();
      if (EMAIL_REGEXP.test(email.value)) {
         return null;
      }
      return {
         invalidEmail: true
      };
   }


   static numberValidator(number): any {

      if (number.pristine) {
         return null;
      }
      const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
      number.markAsTouched();
      if (NUMBER_REGEXP.test(number.value)) {
         return null;
      }
      return {
         invalidNumber: true
      };
   }

   static alphaNumeric(value): any {
    
      if (value.pristine) {
         return null;
      }
//let regEx = new RegExp(/^[a-zA-Z0-9]*$/);
      //const NUMBER_REGEXP = /^[a-zA-Z0-9]*$/;
      const NUMBER_REGEXP = /^[a-zA-Z0-9._ ]*$/;
      value.markAsTouched();
      if (NUMBER_REGEXP.test(value.value)) {
         return null;
      }
      return {
         alphanumeric: true
      };
   }

   static alphaNumeric1(value): any {
      if (value.pristine) {
         return null;
      }
      
//let regEx = new RegExp(/^[a-zA-Z0-9]*$/);
      const NUMBER_REGEXP = /^[a-zA-Z0-9]*$/;
      //const NUMBER_REGEXP = /^[a-zA-Z0-9._ ]*$/;
      value.markAsTouched();
      if (NUMBER_REGEXP.test(value.value)) {
         return null;
      }
      return {
         alphanumeric: true
      };
   }
   static NumericAndFloating(value): any {
      if (value.pristine) {
         return null;
      }
      //let NUMBER_REGEXP = new RegExp(/^(99|\d)(\.\d{1,2})?$/);
      const NUMBER_REGEXP = /^\d{1,2}(\.\d{1,2})?$/;
      value.markAsTouched();
      if (NUMBER_REGEXP.test(value.value)) {
         return null;
      }
      return {
         alphanumeric: true
      };
   }
  

   // Validates US SSN
   static ssnValidator(ssn): any {
      if (ssn.pristine) {
         return null;
      }
      const SSN_REGEXP = /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;
      ssn.markAsTouched();
      if (SSN_REGEXP.test(ssn.value)) {
         return null;
      }
      return {
         invalidSsn: true
      };
   }
   // Validates US phone numbers
   static phoneValidator(number): any {
      if (number.pristine) {
         return null;
      }
      const PHONE_REGEXP = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
      number.markAsTouched();
      if (PHONE_REGEXP.test(number.value)) {
         return null;
      }
      return {
         invalidNumber: true
      };
   }
   // Validates zip codes
   static zipCodeValidator(zip): any {
      if (zip.pristine) {
         return null;
      }
      const ZIP_REGEXP = /^[0-9]{5}(?:-[0-9]{4})?$/;
      zip.markAsTouched();
      if (ZIP_REGEXP.test(zip.value)) {
         return null;
      }
      return {
         invalidZip: true
      };
   }
   // re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

   // if(form.startdate.value != '' && !form.startdate.value.match(re)) {
   //   alert("Invalid date format: " + form.startdate.value);
   //   form.startdate.focus();
   //   return false;
   // }
   // Validates for date
   static dateValidator(date): any {
      if (date.pristine) {
         return null;
      }
      const DATE_REGEXP = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      date.markAsTouched();
      if (DATE_REGEXP.test(date.value)) {
         return null;
      }
      return {
         invalidDate: true
      };
   }

   static minMaxValidator(num, min, max): any {

      if (num.pristine) {
         return null;
      }
      const DATE_REGEXP = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      num.markAsTouched();
      if (DATE_REGEXP.test(num.value)) {
         return null;
      }
      return {
         invalidDate: true
      };
   }
   static ageRangeValidator(min: number, max: number): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
         if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
            return { 'ageRange': true };
         }
         return null;
      };
   }
   //   static rsnRangeValidator(min:any): ValidatorFn {
   //    return (control: AbstractControl): { [key: string]: boolean } | null => {
   //     
   //       var range;
   //       if(min)
   //       {
   //        range=min.rsnFrom;
   //       }
   //        if (control.value !== undefined && (isNaN(control.value) || control.value < range)) {
   //            return { 'rsnRange': true };
   //        }
   //        return null;
   //    };
   // }
   static rsnRangeValidator(group: FormGroup): any {
      if (group) {
         if (group.get("rsnFrom").value >= group.get("rsnTo").value) {
            return { notMatching: true };
         }
      }

      return null;
   }
   static rsnRangeValidator1(group: FormGroup): any {
      if (group) {
         if (group.get("rsnFrom").value > group.get("rsnTo").value) {
            return { notMatching: true };
         }
      }

      return null;
   }
   static repeatedValueCheckValidator(form1: any, form2: any, form3: any): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
         //  if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
         //      return { 'ageRange': true };
         //  }
         var filterArray = new Array();
         if (form1 != undefined) {
            filterArray[0] = form1.value.receiveRangeCoupon;
            //filterArray[1] = form2.value.missingRangeCoupon;
            filterArray[3] = form1.value.receiveCoupon;
         }
         if (form2 != undefined) {
            filterArray[1] = form2.value.missingRangeCoupon;
            filterArray[4] = form2.value.missingCoupon;
            //   filterArray[2] = form3.value.damageRangeCoupon;
            //  filterArray[3] = form1.value.receiveCoupon;
         }
         if (form3 != undefined) {
            //filterArray[4] = form2.value.missingCoupon;
            filterArray[2] = form3.value.damageRangeCoupon;
            filterArray[5] = form3.value.damageCoupon;
         }
         var temp = [];
         for (var i = 0; i < filterArray.length; i++) {
            temp = [];
            if (i < 3) {

               temp = filterArray[i].filter(function (number) {
                  if (number.rsnFrom != '' && number.rsnTo != '') {
                     return number.rsnFrom <= control.value && number.rsnTo >= control.value;
                  }
               });
               if (temp.length != 0) {

                  break;
               }
            }
            else {
               temp = filterArray[i].filter(function (number) {

                  if (number.rsnNo != '') {
                     return number.rsnNo == control.value;
                  }

               });
               if (temp.length != 0) {
                  break;
               }
            }
            // }
            if (temp.length == 0) {

               return { 'repeatedValueCheck': true };
            }
         }

         return null;
      };
   }
}