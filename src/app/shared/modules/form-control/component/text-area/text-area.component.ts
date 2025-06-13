import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidatorService } from '../../services/validator-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControlModel } from '../../interface/form-control.interface';
@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css'
})
export class TextAreaComponent {
  @Input() formControlModel!: FormControlModel;
  @Input() form!: FormGroup;
  @Input() class = '';
  @Input() rows: number | null = null;
  @Output() inputChange = new EventEmitter<string>();
  @Output() iconClick = new EventEmitter<Event>();

  constructor(public _validator: ValidatorService) {}

  onIconClick(event: Event) {
    this.iconClick.emit(event);
  }

  onChange(event: Event) {
    const data = event.target as HTMLTextAreaElement;
    this.inputChange.emit(data.value);
  }
}
