using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Profiles
{
    public class LocationProfile : Profile
    {
        public LocationProfile() {
            CreateMap<Location, LocationDto>();
        }
    }
}
