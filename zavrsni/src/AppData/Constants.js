const NETWORK_CONFIG = {
    apiHost: "https://localhost",
    apiPort: "5001",
    apiFullHost: "https://localhost:5001",
}

const API_CONFIG = {
    userEndpoint: "/api/user",
    loginEndpoint: "/api/login",
    postImage: "/api/hotel/imagePost/",
    getTransportTypes: "/api/transport/transportTypes",
    searchTransports: "/api/transport/filteredTransports",
    topTenHotels: "/api/hotel/topTen/",
    searchHotels: "/api/hotel/filteredHotels/",
    getHotel: "/api/hotel/getHotel/",
    currentUser: "/api/user/currentUser/",
    locationEndpoint: "/api/location/",
    bookHotel: "/api/hotel/bookHotelRoom/",
    bookTransport: "/api/transport/bookTransport/",
    usersBookings: "/api/bookings/getUsersBookings",
    cancelBooking: "/api/bookings/cancelBooking/"
  };
  
  export { NETWORK_CONFIG, API_CONFIG };