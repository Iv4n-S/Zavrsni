using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Profiles
{
    public class UserBookingsProfile: Profile
    {
        public UserBookingsProfile()
        {
            CreateMap<Hotel, HotelBookingDto>();
            CreateMap<Transport, TransportBookingDto>();
        }
    }
}
