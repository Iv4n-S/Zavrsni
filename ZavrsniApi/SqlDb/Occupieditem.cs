using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Occupieditem
    {
        public int Idoccupieditem { get; set; }
        public int Idbooking { get; set; }
        public int Idtimeslot { get; set; }
        public int? Idhotelroom { get; set; }
        public int? Idtransport { get; set; }

        public virtual Booking IdbookingNavigation { get; set; }
        public virtual Hotel IdhotelroomNavigation { get; set; }
        public virtual Timeslots IdtimeslotNavigation { get; set; }
        public virtual Transport IdtransportNavigation { get; set; }
    }
}
