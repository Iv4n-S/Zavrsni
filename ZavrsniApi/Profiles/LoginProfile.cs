using AutoMapper;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Profiles
{
    public class LoginProfile : Profile
    {
        public LoginProfile()
        {
            CreateMap<Userdata, UserDataDto>();
        }
    }
}
