using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class UsersBookingsDto
    {
        public IEnumerable<TransportBookingDto> TransportBookings { get; set; }

        public IEnumerable<HotelBookingDto> HotelBookings { get; set; }
    }
}
