using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;
using ZavrsniApi.Exceptions;
using ZavrsniApi.Repos;

namespace ZavrsniApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginRepo _repository;
        private readonly IMapper _mapper;

        public LoginController(ILoginRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("login")]
        public ActionResult loginUser(LoginUserDto user)
        {
            if(user == null)
            {
                throw new LoginFailedException("Wrong username or password!");
            }
            Userdata logedInUser = _repository.loginUser(user);
            if(logedInUser == null)
            {
                throw new LoginFailedException("Wrong username or password!");
            }
            /*HttpContext.Session.SetString("Username", logedInUser.Username);
            HttpContext.Session.SetString("isAdmin", logedInUser.Role.Equals("admin") ? "true" : "false");*/

            return Ok();
        }
    }
}
