using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class BookHotelDto
    {
        public int IdHotelRoom { get; set; }
        public int IdHotel { get; set; }
        public List<DateTime> SelectedDates { get; set; }
        public int IdUser { get; set; }
    }
}
