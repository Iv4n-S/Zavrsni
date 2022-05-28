using System;

namespace ZavrsniApi.DtoModels
{
    public class TransportBookingDto
    {
        public int Idbooking { get; set; }
        public int Idbookingitem { get; set; }
        public DateTime Timecreated { get; set; }
        public int Idbookingtype { get; set; }
        public int Idtimeslot { get; set; }
        public string Transportname { get; set; }
        public int Idtransporttype { get; set; }
        public int Idlocationfrom { get; set; }
        public int Idlocationto { get; set; }
        public string DepartureTime { get; set; }
        public string TimeSlot { get; set; }
        public string LocationFrom { get; set; }
        public string LocationTo { get; set; }
        public bool Active { get; set; }
    }
}