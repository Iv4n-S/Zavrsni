using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Hotel
    {
        public int Idhotelroom { get; set; }
        public string Hotelname { get; set; }
        public int Hotelroomcapacity { get; set; }
        public string Hotelroomdesc { get; set; }
        public int Stars { get; set; }
        public int Idlocation { get; set; }
        public int IdHotel { get; set; }

        public virtual Location IdlocationNavigation { get; set; }
    }
}
