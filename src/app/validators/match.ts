import { Injectable } from '@angular/core';
import { FormGroup,Validator } from '@angular/forms'
@Injectable({
    providedIn:'root'
})
export class Match implements Validator {
    validate(formcontrol:FormGroup){
        const {password,confirmpassword}=formcontrol.value;
        if(password===confirmpassword){
            return null;
        }
        else
        {
            return { passwordsDontMatch: true};
        }
    }

}
