using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class AdminTransportsDividedDto
    {
        public string TransportType { get; set; }
        public IEnumerable<AdminTransportsDto> Transports { get; set; }
    }
}
