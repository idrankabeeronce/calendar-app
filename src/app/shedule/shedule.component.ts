import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface sheduleData {
  date: Date;
  time: string;
  header: string;
  description: string;
  close: boolean;
  event: string;
}

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.css']
})
export class SheduleComponent {
  constructor() {}
  @Output() newDataEvent = new EventEmitter<any>();
  pass: boolean = true;
  addNewItem() {
    if (this.dateForm.valid && this.headerForm.valid && this.descriptionForm.valid) {
      this.data.event = 'add';
      this.newDataEvent.emit(this.data);
    }
    else {
      this.timeForm.markAsTouched();
      this.dateForm.markAsTouched();
      this.headerForm.markAsTouched();
      this.descriptionForm.markAsTouched();
      this.pass = false;
    }
    
  }

  data: sheduleData = {
    date: new Date,
    time: '',
    header: '',
    description: '',
    close: true,
    event: ''
  };
  dateForm = new FormControl('', [Validators.required]);
  timeForm = new FormControl('', [Validators.required]);
  headerForm = new FormControl('', [Validators.required, Validators.minLength(4)]);
  descriptionForm = new FormControl('', [Validators.required, Validators.minLength(4)]);

  closeForm(): void {
    this.newDataEvent.emit(this.data);
  }
}
