using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class Userdata
    {
        public Userdata()
        {
            Booking = new HashSet<Booking>();
        }

        public int Iduser { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phonenumber { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Booking> Booking { get; set; }
    }
}
