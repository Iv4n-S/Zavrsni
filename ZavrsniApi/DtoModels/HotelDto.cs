using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class HotelDto
    {
        public int Idhotelroom { get; set; }
        public string Hotelname { get; set; }
        public int Hotelroomcapacity { get; set; }
        public string Hotelroomdesc { get; set; }
        public int Stars { get; set; }
        public int IdLocation { get; set; }
        public string Location { get; set; }
        public GetImagesDto image { get; set; }

    }
}
