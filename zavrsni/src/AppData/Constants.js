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
    cancelBooking: "/api/bookings/cancelBooking/",
    searchAdminHotels: "/api/hotel/getAdminHotels/",
    searchAdminTransports: "/api/transport/getAdminTransports/",
    deleteTransport: "/api/transport/deleteTransport/",
    deleteHotel: "/api/hotel/deleteHotelRoom/",
    addTransport:"/api/transport/addTransport",
    addHotel: "/api/hotel/addHotel",

  };
  
  export { NETWORK_CONFIG, API_CONFIG };