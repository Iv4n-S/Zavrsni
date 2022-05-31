using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Profiles
{
    public class TransportProfile : Profile
    {
        public TransportProfile()
        {
            CreateMap<Transporttypes, TransportTypesDto>();
            CreateMap<Transport, TransportsDto>();
            CreateMap<BookingTransportDto, BookTransportDto>();
            CreateMap<Transport, AdminTransportsDto>();
        }

    }
}
