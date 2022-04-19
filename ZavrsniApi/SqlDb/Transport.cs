using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Transport
    {
        public int Idtransport { get; set; }
        public string Transportname { get; set; }
        public int Idtransporttype { get; set; }
        public int Idlocationfrom { get; set; }
        public int Idlocationto { get; set; }

        public virtual Location IdlocationfromNavigation { get; set; }
        public virtual Location IdlocationtoNavigation { get; set; }
        public virtual Transporttypes IdtransporttypeNavigation { get; set; }
    }
}
