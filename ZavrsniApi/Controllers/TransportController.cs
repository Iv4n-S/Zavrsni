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
    [Route("api/transport")]
    [ApiController]
    public class TransportController : ControllerBase
    {
        private readonly ITransportRepo _repository;
        private readonly IMapper _mapper;

        public TransportController(ITransportRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("types")]
        public ActionResult<IEnumerable<Transporttypes>> GetAllTransportTypes()
        {
            var result = _repository.GetAllTransportTypes();
            if (result != null)
            {
                return Ok(_mapper.Map<IEnumerable<TransportTypesDto>>(result));
            }
            return NotFound();
        }

        [HttpGet]
        public ActionResult<IEnumerable<Transport>> GetAllTransports()
        {
            var result = _repository.GetAllTransports();
            if (result != null)
            {
                return Ok(result/*_mapper.Map<IEnumerable<TransportTypesDto>>(result)*/);
            }
            return NotFound();
        }
    }
}
