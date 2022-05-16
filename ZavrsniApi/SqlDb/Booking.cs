﻿using System;
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
        public int Idbookingitem { get; set; }
        public DateTime Timecreated { get; set; }
        public int Idbookingtype { get; set; }
        public int Iduser { get; set; }
        public int Idtimeslot { get; set; }
        public int IdHotel { get; set; }

        public virtual Bookingtype IdbookingtypeNavigation { get; set; }
        public virtual Timeslots IdtimeslotNavigation { get; set; }
        public virtual Userdata IduserNavigation { get; set; }
        public virtual ICollection<Occupieditem> Occupieditem { get; set; }
    }
}
