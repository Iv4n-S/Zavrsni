using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Repos
{
    public interface ILoginRepo
    {
        public Userdata loginUser(LoginUserDto user);
        public bool logoutUser();
    }
}
