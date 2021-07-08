import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  myBookings;

  constructor(private router: Router) {
    this.myBookings = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit(): void {}
}
