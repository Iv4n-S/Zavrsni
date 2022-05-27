using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private readonly IEmailRepo _email_repository;

        public TransportController(ITransportRepo repository, IMapper mapper, IEmailRepo email_repository)
        {
            _repository = repository;
            _mapper = mapper;
            _email_repository = email_repository;
        }

        [HttpPost]
        [Route("filteredTransports")]
        public ActionResult<IEnumerable<TransportsDividedDto>> GetAllTransports(TransportFiltersDto filters)
        {
            var result = _repository.GetFilteredTransports(filters);
            if (result != null)
            {
                IEnumerable<TransportsDividedDto> transportsDivided = new TransportsDividedDto[] { };
                IEnumerable<TransportTypesDto> transportTypes = _repository.GetTransportTypes();
                foreach(var type in transportTypes)
                {
                    IEnumerable<TransportsDto> transportOfType = new TransportsDto[] { };
                    foreach(var transport in result)
                    {
                        if(transport.Idtransporttype == type.Idtransporttype)
                        {
                            transportOfType = transportOfType.Append(transport);
                        }
                    }
                    transportsDivided = transportsDivided.Append(new TransportsDividedDto { TransportType = type.TransportTypeName, Transports = transportOfType });
                }
                return Ok(transportsDivided);
            }
            return NotFound();
        }


        [HttpPost]
        [Route("bookTransport")]
        [Authorize]
        public async Task<ActionResult> BookTransport(BookingTransportDto transport)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                int id = int.Parse(identity.Claims.FirstOrDefault(i => i.Type == ClaimTypes.Sid)?.Value);
                BookTransportDto booking = _mapper.Map<BookTransportDto>(transport);
                booking.IdUser = id;
                var result = _repository.BookTransport(booking);
                if (!result)
                {
                    return Conflict();
                }
                _repository.SaveChanges();

                EmailDto options = new EmailDto
                {
                    ToEmail = identity.Claims.FirstOrDefault(i => i.Type == ClaimTypes.Email)?.Value,
                    PlaceHolders = new List<KeyValuePair<string, string>>()
                    {
                        new KeyValuePair<string, string>("{{UserName}}", identity.Claims.FirstOrDefault(i => i.Type == ClaimTypes.NameIdentifier)?.Value)
                    }
                };
                await _email_repository.SendEmailToUser(options);
            }


            return Ok();
        }
    }
}
