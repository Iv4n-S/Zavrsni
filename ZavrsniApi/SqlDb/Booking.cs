using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Booking
    {
        public Booking()
        {
            Occupieditem = new HashSet<Occupieditem>();
        }

        public int Idbooking { get; set; }
        public DateTime Timecreated { get; set; }
        public int Idbookingtype { get; set; }
        public int Iduser { get; set; }
        public int Idtimeslot { get; set; }
        public int? Idhotel { get; set; }
        public int? Idhotelroom { get; set; }
        public int? Idtransport { get; set; }

        public virtual Bookingtype IdbookingtypeNavigation { get; set; }
        public virtual Hotel IdhotelroomNavigation { get; set; }
        public virtual Timeslots IdtimeslotNavigation { get; set; }
        public virtual Transport IdtransportNavigation { get; set; }
        public virtual Userdata IduserNavigation { get; set; }
        public virtual ICollection<Occupieditem> Occupieditem { get; set; }
    }
}
