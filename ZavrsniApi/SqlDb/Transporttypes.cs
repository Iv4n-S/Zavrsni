using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Transporttypes
    {
        public Transporttypes()
        {
            Transport = new HashSet<Transport>();
        }

        public int Idtransporttype { get; set; }
        public string Transporttypename { get; set; }

        public virtual ICollection<Transport> Transport { get; set; }
    }
}
