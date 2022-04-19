using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Location
    {
        public Location()
        {
            Hotel = new HashSet<Hotel>();
            TransportIdlocationfromNavigation = new HashSet<Transport>();
            TransportIdlocationtoNavigation = new HashSet<Transport>();
        }

        public int Idlocation { get; set; }
        public string Locationname { get; set; }

        public virtual ICollection<Hotel> Hotel { get; set; }
        public virtual ICollection<Transport> TransportIdlocationfromNavigation { get; set; }
        public virtual ICollection<Transport> TransportIdlocationtoNavigation { get; set; }
    }
}
