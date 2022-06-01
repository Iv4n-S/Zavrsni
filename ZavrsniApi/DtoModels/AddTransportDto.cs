using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class AddTransportDto
    {
        public string Transportname { get; set; }
        public int Idtransporttype { get; set; }
        public string Locationfrom { get; set; }
        public string Locationto { get; set; }
        public int Capacity { get; set; }
        public string DepartureTime { get; set; }
    }
}
