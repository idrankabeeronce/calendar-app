import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './event/event.component';
import { SheduleComponent } from './shedule/shedule.component';

const routes: Routes = [
  {
    path: '', title: "Calendar", component: CalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
