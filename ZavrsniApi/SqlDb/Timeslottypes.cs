using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Timeslottypes
    {
        public Timeslottypes()
        {
            Timeslots = new HashSet<Timeslots>();
        }

        public int Idtimeslottype { get; set; }
        public string Timeslottypename { get; set; }

        public virtual ICollection<Timeslots> Timeslots { get; set; }
    }
}
