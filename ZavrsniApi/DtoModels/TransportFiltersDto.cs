using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class TransportFiltersDto
    {
        public DateTime SelectedDate { get; set; }
        public string LocationFrom { get; set; }
        public string LocationTo { get; set; }
    }
}
