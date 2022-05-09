using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Hotelroomimages
    {
        public int Idimage { get; set; }
        public string ImageName { get; set; }
        public int? Idhotelroom { get; set; }

        public virtual Hotel IdhotelroomNavigation { get; set; }
    }
}
