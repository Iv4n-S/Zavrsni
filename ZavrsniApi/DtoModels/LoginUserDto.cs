using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class LoginUserDto
    {
        public string UsernameOrEmail { get; set; }
        public string Password { get; set; }

    }
}
