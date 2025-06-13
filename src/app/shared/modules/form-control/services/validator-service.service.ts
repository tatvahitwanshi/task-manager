import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlModel } from '../interface/form-control.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  getError(form: FormGroup, controlName: string, controlModel?: FormControlModel): string {
    const control = form.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return `${controlModel?.label || controlName} is required.`;
    if (control.errors['minlength']) return `Minimum length not met.`;
    if (control.errors['maxlength']) return `Maximum length exceeded.`;
    return 'Invalid input';
  }
}
