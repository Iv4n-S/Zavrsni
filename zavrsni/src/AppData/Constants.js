const NETWORK_CONFIG = {
    apiHost: "https://localhost",
    apiPort: "5001",
    apiFullHost: "https://localhost:5001",
}

const API_CONFIG = {
    userEndpoint: "/api/user",
    loginEndpoint: "/api/login",
    postImage: "/api/hotel/imagePost/",
    searchTransports: "/api/transport/filteredTransports",
    topTenHotels: "/api/hotel/topTen/",
    searchHotels: "/api/hotel/filteredHotels/",
    getHotel: "/api/hotel/getHotel/",
    currentUser: "/api/user/currentUser/",
    locationEndpoint: "/api/location/",
    bookHotel: "/api/hotel/bookHotelRoom/",
    bookTransport: "/api/transport/bookTransport/",
  };
  
  export { NETWORK_CONFIG, API_CONFIG };