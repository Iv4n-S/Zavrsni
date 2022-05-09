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
        void InsertImages(Hotelroomimages image);
        int GetLastImageId();
        IEnumerable<Hotelroomimages> GetImagesForHotelRoom(int idHotelRoom);
    }
}
