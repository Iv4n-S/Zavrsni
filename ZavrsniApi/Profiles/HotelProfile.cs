using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Profiles
{
    public class HotelProfile: Profile
    {
        public HotelProfile()
        {
            CreateMap<Hotel, HotelDto>();
            CreateMap<BookingHotelDto, BookHotelDto>();
            CreateMap<Hotel, AdminHotelDto>();
        }
    }
}
