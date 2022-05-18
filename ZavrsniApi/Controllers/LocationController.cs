using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;
using ZavrsniApi.Repos;

namespace ZavrsniApi.Controllers
{
    [Route("api/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private ILocationRepo _repostiory;
        private IMapper _mapper;

        public LocationController(ILocationRepo repository, IMapper mapper)
        {
            _repostiory = repository;
            _mapper = mapper;
        }

        [HttpGet] 
        public ActionResult<IEnumerable<Location>> GetLocations()
        {
            var result = _repostiory.GetLocations();
            if(result != null)
            {
                return Ok(_mapper.Map<IEnumerable<LocationDto>>(result));
            }
            return NotFound();
        }
    }
}
