export interface Guest {
  firstName: string;
  lastName: string;
  gender: string;
  phone: number;
  email: string;
  address: string;
  age: number;
}

export interface CheckInDetails {
  checkin: string;
  checkout: string;
  foodService: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  persons: number;
  pickup: string;
  roomType: string;
}
