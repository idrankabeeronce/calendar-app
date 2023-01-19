import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface sheduleData {
  date: Date;
  time: string;
  header: string;
  description: string;
  close: boolean;
  event: string;
  newDate: Date;
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() item:any; // decorate the property with @Input()
  @Output() changeDataEvent = new EventEmitter<any>();


  data: sheduleData = {
    date: new Date,
    time: '',
    header: '',
    description: '',
    close: true,
    event: '',
    newDate: new Date
  };


  constructor() { }


  dateForm = new FormControl('', [Validators.required])
  timeForm = new FormControl('', [Validators.required])

  newDate = this.data.date;
  clicked = false;
  time: string = this.data.time;

  ngOnInit():void {
    this.data.header = this.item.header;
    this.data.description = this.item.description;
    this.data.date = this.item.date;
    
  }
  changeItem() {
    if (this.timeForm.valid && this.dateForm.valid) {
      this.data.newDate = this.newDate;
      this.data.newDate.setHours(Number(this.time.slice(0, 2)));
      this.data.newDate.setMinutes(Number(this.time.slice(3, 5)));
      this.data.event = "reshedule";
      this.changeDataEvent.emit(this.data);
    }
    else {
      
      this.timeForm.markAsTouched();
      this.dateForm.markAsTouched();
    }
    
  }

  deleteItem() {
      this.data.event = "delete";
      this.changeDataEvent.emit(this.data);
  }
  closeForm(): void {
    this.changeDataEvent.emit(this.data);
  }
  reshedule() {
    this.clicked = true;
  }
}
