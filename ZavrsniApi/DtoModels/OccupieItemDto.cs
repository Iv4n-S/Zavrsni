using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class OccupieItemDto
    {
        public int OccupiedItemId { get; set; }
        public int? Idhotelroom { get; set; }
        public int? Idtransport { get; set; }
        public int IdBooking { get; set; }
        public int IdTimeSlot { get; set; }
    }
}
