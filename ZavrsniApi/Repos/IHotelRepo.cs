using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Repos
{
    public interface IHotelRepo
    {
        bool SaveChanges();
        IEnumerable<Hotel> GetTenMostBookedHotelsLastWeek();
        string GetHotelNameById(int idhotelroom);
        void InsertImages(Hotelroomimages image);
        int GetLastImageId();
        IEnumerable<Hotelroomimages> GetImagesForHotelRoom(int idHotelRoom);
        string GetLocation(int idLocation);
        IEnumerable<Hotel> GetSearchedHotels(HotelSearchFiltersDto filters);
        IEnumerable<Hotel> GetHotel(HotelRoomsInHotelDto hotelSelected);
        int GetLastBookingId();
        bool BookHotelRoom(BookHotelDto booking);
        IEnumerable<Hotel> GetAdminHotels(string location);
        bool DeleteHotelRoom(int idHotelRoom);
        int AddHotelRoom(AddHotelDto addHotel);
    }
}
