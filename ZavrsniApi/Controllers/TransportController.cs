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

        [HttpPost]
        [Route("filteredTransports")]
        public ActionResult<IEnumerable<TransportsDto>> GetAllTransports(TransportFiltersDto filters)
        {
            var result = _repository.GetFilteredTransports(filters);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }
    }
}
