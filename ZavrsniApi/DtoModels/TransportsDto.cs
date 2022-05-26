using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class TransportsDto
    {
        public int Idtransport { get; set; }
        public string Transportname { get; set; }
        public int Idtransporttype { get; set; }
        public int Idlocationfrom { get; set; }
        public int Idlocationto { get; set; }
        public int Capacity { get; set; }
        public string DepartureTime { get; set; }
        public string LocationFrom { get; set; }
        public string LocationTo { get; set; }
    }
}
