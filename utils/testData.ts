// Centralized test data — all test inputs live here
// If anything changes, update once here — not in every test file

export const AdminCredentials = {

  // Valid admin login
  valid: {
    username: 'admin',
    password: 'password'
  },

  // Wrong credentials — negative login test
  invalid: {
    username: 'wronguser',
    password: 'wrongpassword'
  },

  // Empty fields — form validation test
  empty: {
    username: '',
    password: ''
  }

};

export const RoomData = {

  // All room types on homepage
  types: ['Single', 'Double', 'Suite'] as const,

  // Expected prices — price validation tests
  prices: {
    Single: '100',
    Double: '150',
    Suite: '225'
  },

  // Expected amenities per room
  amenities: {
    Single: ['TV', 'WiFi'],
    Double: ['TV', 'Radio', 'Safe'],
    Suite: ['Radio', 'WiFi', 'Safe']
  }

};

export const BookingData = {

  // Valid booking payload — API tests
  valid: {
    firstname: 'Jai',
    lastname: 'Tester',ice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-08-01',
      checkout: '2026-08-05'
    },
    additionalneeds: 'Breakfast'
  }

};
