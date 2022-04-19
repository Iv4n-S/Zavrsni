using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ZavrsniApi.DtoModels;
using ZavrsniApi.SqlDb;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ZavrsniApi.Repos;
using AutoMapper;

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
        [Route("{id}")]
        public ActionResult<UserDataDto> GetUserdata(int id)
        {
            var result = _repository.GetUserById(id);
            if (result != null)
            {
                return Ok(_mapper.Map<UserDataDto>(result));
            }
            return NotFound();
            
        }

    }
}
