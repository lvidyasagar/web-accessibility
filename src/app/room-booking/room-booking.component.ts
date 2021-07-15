import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CheckInDetails, Guest } from '../models/guest';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss'],
})
export class RoomBookingComponent implements OnInit {
  isGuestsTab = false;
  isPaymentTab = false;
  isDialogOpen = false;
  heading = 'Guest info';
  checkInForm: FormGroup;
  guestForm: FormGroup;
  paymentForm: FormGroup;
  upiForm: FormGroup;
  guestList: Guest[] = [];
  checkInDetails: CheckInDetails;
  paymentType = 'card';
  paymentDialogConf = false;
  aggreement = false;
  @ViewChild('guest_list') guestlist:ElementRef;

  constructor(private router: Router) {
    this.checkInForm = new FormGroup({
      checkin: new FormControl('', [
        Validators.required,
        this.dateRangeValidator,
      ]),
      checkout: new FormControl('', [
        Validators.required,
        this.dateRangeValidator,
      ]),
      roomType: new FormControl('', Validators.required),
      persons: new FormControl('', [Validators.required]),
      foodService: new FormGroup(
        {
          breakfast: new FormControl(false),
          lunch: new FormControl(false),
          dinner: new FormControl(false),
        },
        this.requireCheckboxesToBeCheckedValidator()
      ),
      pickup: new FormControl('', Validators.required),
    });

    this.guestForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });

    this.paymentForm = new FormGroup({
      cardHolderName: new FormControl('', Validators.required),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(16),
        Validators.maxLength(16),
      ]),
      expirationDate: new FormControl('', Validators.required),
      cvv: new FormControl('', [
        Validators.required,
        Validators.min(100),
        Validators.max(999),
      ]),
    });

    this.upiForm = new FormGroup({
      upiAddress: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  get checkin(): AbstractControl | null {
    return this.checkInForm.get('checkin');
  }
  get checkout(): AbstractControl | null {
    return this.checkInForm.get('checkout');
  }
  get roomType(): AbstractControl | null {
    return this.checkInForm.get('roomType');
  }
  get persons(): AbstractControl | null {
    return this.checkInForm.get('persons');
  }
  get pickup(): AbstractControl | null {
    return this.checkInForm.get('pickup');
  }

  nextTab(currentTab: string): void {
    if (currentTab === 'stay') {
      this.isGuestsTab = true;
    } else {
      this.isGuestsTab = false;
      this.isPaymentTab = true;
    }
  }

  prevTab(currentTab: string): void {
    if (currentTab === 'guest') {
      this.isGuestsTab = false;
    } else {
      this.isPaymentTab = false;
      this.isGuestsTab = true;
      this.heading = 'Guest info';
    }
  }

  private dateRangeValidator: ValidatorFn = () => {
    let invalid = false;
    const from = this.checkInForm && this.checkInForm.get('checkin').value;
    const to = this.checkInForm && this.checkInForm.get('checkout').value;
    if (from && to) {
      invalid = new Date(from).valueOf() > new Date(to).valueOf();
    }
    return invalid ? { invalidRange: { from, to } } : null;
  }

  private requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return function validate(formGroup: FormGroup): object {
      let checked = 0;

      Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.controls[key];

        if (control.value === true) {
          checked++;
        }
      });

      if (checked < minRequired) {
        return {
          requireOneCheckboxToBeChecked: true,
        };
      }

      return null;
    };
  }

  saveDetails(): void {
    if (this.checkInForm.valid) {
      this.checkInDetails = this.checkInForm.value;
      this.nextTab('stay');
    }
  }

  addGuest(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    if (this.isDialogOpen) {
      this.isDialogOpen = false;
      this.guestForm.reset();
      this.guestlist.nativeElement.focus();
    } else if (this.paymentDialogConf) {
      this.paymentDialogConf = false;
    }
  }

  get firstName(): AbstractControl | null {
    return this.guestForm.get('firstName');
  }
  get lastName(): AbstractControl | null {
    return this.guestForm.get('lastName');
  }
  get gender(): AbstractControl | null {
    return this.guestForm.get('gender');
  }
  get phone(): AbstractControl | null {
    return this.guestForm.get('phone');
  }
  get email(): AbstractControl | null {
    return this.guestForm.get('email');
  }
  get address(): AbstractControl | null {
    return this.guestForm.get('address');
  }
  get age(): AbstractControl | null {
    return this.guestForm.get('age');
  }

  saveGuestDetails(): void {
    if (this.guestForm.valid) {
      this.guestList.push(this.guestForm.value);
      this.isDialogOpen = false;
      this.guestForm.reset();
      this.guestlist.nativeElement.focus();
    }
  }

  setPaymentType(payment: string): void {
    this.paymentType = payment;
  }

  get cardHolderName(): AbstractControl | null {
    return this.paymentForm.get('cardHolderName');
  }
  get cardNumber(): AbstractControl | null {
    return this.paymentForm.get('cardNumber');
  }
  get expirationDate(): AbstractControl | null {
    return this.paymentForm.get('expirationDate');
  }
  get cvv(): AbstractControl | null {
    return this.paymentForm.get('cvv');
  }

  get upiAddress(): AbstractControl | null {
    return this.upiForm.get('upiAddress');
  }

  processPayment(): void {
    this.heading = 'Booking Confirmation';
    if (this.paymentType === 'card') {
      if (this.paymentForm.valid) {
        this.paymentDialogConf = true;
      }
    } else {
      if (this.upiForm.valid) {
        this.paymentDialogConf = true;
      }
    }
  }

  checkAgrrement(value: boolean): void {
    this.aggreement = value;
  }

  redirectToBookings(): void {
    this.router.navigateByUrl('/bookings', {
      state: {
        checkInDetails: this.checkInDetails,
        guests: this.guestList,
        paymentInfo:
          this.paymentType === 'card'
            ? this.paymentForm.value
            : this.upiForm.value,
      },
    });
  }
}
