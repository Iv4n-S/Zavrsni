using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ZavrsniApi.Configuration;
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
        private readonly JwtConfig _jwtConfig;

        public LoginController(ILoginRepo repository, IMapper mapper, IOptionsMonitor<JwtConfig> optionsMonitor)
        {
            _repository = repository;
            _mapper = mapper;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpPost]
        [Route("login")]
        public ActionResult LoginUser(LoginUserDto user)
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
            var token = GenerateJwtToken(logedInUser);

            return Ok(token);
        }


        private string GenerateJwtToken(Userdata user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtConfig.Secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.Name),
                new Claim(ClaimTypes.Surname, user.Surname),
                new Claim(ClaimTypes.MobilePhone, user.Phonenumber),
                new Claim(ClaimTypes.StreetAddress, user.Address),
                new Claim(ClaimTypes.Role, user.Role)

            };

            var token = new JwtSecurityToken(_jwtConfig.Issuer,
                _jwtConfig.Audience,
                claims,
                expires: DateTime.Now.AddHours(24),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
