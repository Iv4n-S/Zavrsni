using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Bookingtype
    {
        public Bookingtype()
        {
            Booking = new HashSet<Booking>();
        }

        public int Idbookingtype { get; set; }
        public string Bookingtypename { get; set; }

        public virtual ICollection<Booking> Booking { get; set; }
    }
}
