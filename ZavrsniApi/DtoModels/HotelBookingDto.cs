using System;
using System.Collections.Generic;

namespace ZavrsniApi.DtoModels
{
    public class HotelBookingDto
    {
        public int Idbooking { get; set; }
        public int Idhotelroom { get; set; }
        public DateTime Timecreated { get; set; }
        public int Idbookingtype { get; set; }
        public int Idtimeslot { get; set; }
        public string Hotelname { get; set; }
        public string Hotelroomdesc { get; set; }
        public int Stars { get; set; }
        public int IdLocation { get; set; }
        public int IdHotel { get; set; }
        public string TimeSlot { get; set; }
        public string Location { get; set; }
        public IEnumerable<ReturnImage> Image { get; set; }
        public bool Active { get; set; }
    }
}
