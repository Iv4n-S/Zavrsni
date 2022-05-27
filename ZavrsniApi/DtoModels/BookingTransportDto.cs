using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class BookingTransportDto
    {
        public int IdTransport { get; set; }
        public DateTime SelectedDate { get; set; }
    }
}
