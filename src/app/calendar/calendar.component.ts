import { Component, OnInit} from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

export interface sheduleData {
  date: Date;
  time: string;
  header: string;
  description: string;
  event: string;
  newDate: Date;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  openAF = false;
  openSF = false;
  hourList: any = [];
  selectedDate: Date = new Date();
  date: Date = this.selectedDate;
  header!: string;
  description!: string;
  time!: Date;
  listOfDailyActivities: any = [];
  sheduledActivities: any = [];
  now = new Date();
  currentItem: any = {};

  constructor() { }

  ngOnInit(): void {
    this.getBoard();
  }

  onSelect(event: any) {
    this.selectedDate = event;
    this.date = this.selectedDate;
    this.getBoard();
  }
  getBoard(): void {
    this.hourList = [];
    this.listOfDailyActivities = [];
    for (let hour = 0; hour < 24; hour++) {
      this.hourList.push(hour);
      this.listOfDailyActivities.push([]);
    }
    this.getSheduledActivities();
  }

  addItem(data: any) {
    this.openSF = false;
    if (data.event == 'add') {
      data.date.setHours(Number(data.time.slice(0, 2)));
      data.date.setMinutes(Number(data.time.slice(3, 5)));
      this.sheduledActivities.push({
        date: data.date,
        header: data.header,
        description: data.description
      })
      this.getSheduledActivities()
    }
  }
  openSheduleForm() {
    this.openSF = true;
  }
  changeItem(data: any) {
    this.openAF = false;
    if (data.close == true) {
      let index = 0;
      switch (data.event) {
        case 'reshedule':
          for (let item of this.sheduledActivities) {
            if (item.date === data.date && item.description === data.description && item.header === data.header) {
              this.sheduledActivities[index].date = data.newDate;
            }
            index++;
          }
          break;
        case 'delete':
          for (let item of this.sheduledActivities) {
            if (item.date === data.date && item.description === data.description && item.header === data.header) {
              this.sheduledActivities.splice(index, 1)
            }
            index++;
          }
          break;
      }
      this.getSheduledActivities();
    }
  }
  openActivityForm(item: any) {
    this.currentItem = item;

    this.openAF = true;
  }
  getSheduledActivities() {
    this.listOfDailyActivities = [];
    for (let index = 0; index < 24; index++) {

      this.listOfDailyActivities.push([]);
    }
    for (let activity of this.sheduledActivities) {
      if (activity.date.toDateString() === this.selectedDate.toDateString()) {
        for (let index = 0; index < 24; index++) {
          if (activity.date.getHours() == index) {
            this.listOfDailyActivities[index].push({
              date: activity.date,
              header: activity.header,
              description: activity.description
            });
          }
        }

      }
    }
  }


  dropItem(event: CdkDragDrop<string[]>) {

    transferArrayItem(this.listOfDailyActivities[event.previousIndex],
      this.listOfDailyActivities[event.currentIndex],
      event.previousIndex,
      event.currentIndex);

    for (let item of this.listOfDailyActivities[event.currentIndex]) {
      item.date.setHours(event.currentIndex);
    }
  }

}
