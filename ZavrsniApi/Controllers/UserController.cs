using Microsoft.AspNetCore.Mvc;
using ZavrsniApi.DtoModels;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using ZavrsniApi.Repos;
using AutoMapper;
using ZavrsniApi.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using ZavrsniApi.Configuration;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace ZavrsniApi.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _repository;
        private readonly IMapper _mapper;
        private readonly JwtConfig _jwtConfig;
        private DateTime expiresAt;


        public UserController(IUserRepo repository, IMapper mapper, IOptionsMonitor<JwtConfig> optionsMonitor)
        {
            _repository = repository;
            _mapper = mapper;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet] 
        public ActionResult<IEnumerable<UserDataDto>> GetAllUsersData()
        {
            var result = _repository.GetAllUsers();
            if (result != null)
            {
                return Ok(_mapper.Map<IEnumerable<UserDataDto>>(result));
            }
            return NotFound();
        }


        [HttpGet]
        [Route("{id}", Name="GetUserdata")]
        public ActionResult<UserDataDto> GetUserdata(int id)
        {
            var result = _repository.GetUserById(id);
            if (result != null)
            {
                return Ok(_mapper.Map<UserDataDto>(result));
            }
            return NotFound();
            
        }

        [HttpGet]
        [Authorize]
        [Route("currentUser")]
        public ActionResult<UserDataDto> GetCurrentUserData()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                int id = int.Parse(identity.Claims.FirstOrDefault(i => i.Type == ClaimTypes.Sid)?.Value);
                var user = _repository.GetUserById(id);
                var userdata = _mapper.Map<UserDataDto>(user);

                return Ok(userdata);
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult InsertUser(InsertUserDto user)
        {
            var userModel = _mapper.Map<Userdata>(user);
            var lastUser = _repository.GetLastUserId();
            userModel.Iduser = lastUser + 1;
            userModel.Role = "user";
            _repository.CreateUser(userModel);
            bool inserted = _repository.SaveChanges();
            if(!inserted)
            {
                throw new DuplicateUserException("Username or email already exists!");
            }

            var token = GenerateJwtToken(userModel);
            var userDataModel = _mapper.Map<UserDataDto>(userModel);

            return CreatedAtRoute(nameof(GetUserdata), new {id = userModel.Iduser }, new { token = token, user = userDataModel, expires = expiresAt });
        }

        [HttpPut]
        [Authorize]
        public ActionResult UpdateUser(UpdateUserDto userUpdate)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                int id = int.Parse(identity.Claims.FirstOrDefault(i => i.Type == ClaimTypes.Sid)?.Value);
                var userModelFromRepo = _repository.GetUserById(id);
                if (userModelFromRepo == null)
                {
                    return NotFound();
                }

                _mapper.Map(userUpdate, userModelFromRepo);

                _repository.UpdateUser(userModelFromRepo);

                _repository.SaveChanges();
            }
            return NoContent();
        }
        /*
        [HttpPatch("{id}")]
        public ActionResult PartialUserUpdate(int id, JsonPatchDocument<UpdateUserDto> patchDoc)
        {
            var userModelFromRepo = _repository.GetUserById(id);
            if (userModelFromRepo == null)
            {
                return NotFound();
            }

            var userToPatch = _mapper.Map<UpdateUserDto>(userModelFromRepo);
            patchDoc.ApplyTo(userToPatch, ModelState);

            if (!TryValidateModel(userToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(userToPatch, userModelFromRepo);

            _repository.UpdateUser(userModelFromRepo);

            _repository.SaveChanges();

            return NoContent();
        }*/

        private string GenerateJwtToken(Userdata user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtConfig.Secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Sid, user.Iduser.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.Name),
                new Claim(ClaimTypes.Surname, user.Surname),
                new Claim(ClaimTypes.MobilePhone, user.Phonenumber),
                new Claim(ClaimTypes.StreetAddress, user.Address),
                new Claim(ClaimTypes.Role, user.Role)

            };

            expiresAt = DateTime.Now.AddSeconds(900);

            var token = new JwtSecurityToken(_jwtConfig.Issuer,
                _jwtConfig.Audience,
                claims,
                expires: expiresAt,
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
