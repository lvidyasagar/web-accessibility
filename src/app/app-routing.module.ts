import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { RoomBookingComponent } from './room-booking/room-booking.component';

const routes: Routes = [
  { path: 'room', component: RoomBookingComponent },
  { path: 'bookings', component: MyBookingsComponent },
  { path: '', redirectTo: 'room', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
