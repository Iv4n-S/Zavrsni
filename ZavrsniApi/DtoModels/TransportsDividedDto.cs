using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class TransportsDividedDto
    {
        public string TransportType { get; set; }
        public IEnumerable<TransportsDto> Transports { get; set; }
    }
}
