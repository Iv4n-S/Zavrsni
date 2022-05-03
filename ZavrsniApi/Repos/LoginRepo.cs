using AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;
using ZavrsniApi.Exceptions;

namespace ZavrsniApi.Repos
{
    public class LoginRepo : ILoginRepo
    {
        private readonly ZavrsniContext _context;
        private readonly IMapper _mapper;

        public LoginRepo(ZavrsniContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public Userdata loginUser(LoginUserDto user) 
        {
            Userdata logedInUser = _context.Userdata.Where(u => 
                (u.Username.Equals(user.UsernameOrEmail) || u.Email.Equals(user.UsernameOrEmail)) 
                && u.Password.Equals(user.Password)).FirstOrDefault();

            if(logedInUser == null)
            {
                return null;
            }
            return logedInUser;
        }

        public bool logoutUser()
        {
            throw new NotImplementedException();
        }
    }
}
