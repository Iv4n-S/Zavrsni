using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Timeslots
    {
        public Timeslots()
        {
            Booking = new HashSet<Booking>();
            Occupieditem = new HashSet<Occupieditem>();
        }

        public int Idtimeslot { get; set; }
        public DateTime Itemdate { get; set; }

        public virtual ICollection<Booking> Booking { get; set; }
        public virtual ICollection<Occupieditem> Occupieditem { get; set; }
    }
}
