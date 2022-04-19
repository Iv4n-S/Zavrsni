using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


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

        [Key]
        [Required]
        public int Iduser { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string Phonenumber { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Role { get; set; }
        [Required]
        public string Password { get; set; }

        public virtual ICollection<Booking> Booking { get; set; }
    }
}
