using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ZavrsniApi.DtoModels;
using ZavrsniApi.SqlDb;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ZavrsniApi.Repos;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;

namespace ZavrsniApi.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _repository;
        private readonly IMapper _mapper;

        public UserController (IUserRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet] 
        public ActionResult<IEnumerable<UserDataDto>> GetAllUsersData() // Task<IEnumerable<UserDataDto>> GetAllUsersData()
        {
            var result = _repository.GetAllUsers();//.ConfigureAwait(false);
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

        [HttpPost]
        public ActionResult<UserDataDto> InsertUser(InsertUserDto user)
        {
            var userModel = _mapper.Map<Userdata>(user);
            var lastUser = _repository.GetLastUserId();
            userModel.Iduser = lastUser + 1;
            userModel.Role = "user";
            _repository.CreateUser(userModel);
            _repository.SaveChanges();

            var userDataModel = _mapper.Map<UserDataDto>(userModel);

            return CreatedAtRoute(nameof(GetUserdata), new {id = userModel.Iduser }, userDataModel);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateCommand(int id, UpdateUserDto userUpdate)
        {
            var userModelFromRepo = _repository.GetUserById(id);
            if(userModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(userUpdate, userModelFromRepo);

            _repository.UpdateUser(userModelFromRepo);

            _repository.SaveChanges();

            return NoContent();
        }

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
        }

    }
}
