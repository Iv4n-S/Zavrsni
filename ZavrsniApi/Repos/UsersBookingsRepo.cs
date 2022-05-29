using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;
using Microsoft.AspNetCore.Http;


namespace ZavrsniApi.Repos
{
    public class UsersBookingsRepo: IUsersBookingsRepo
    {
        private readonly ZavrsniContext _context;
        private readonly IMapper _mapper;

        public UsersBookingsRepo(ZavrsniContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public UsersBookingsDto GetUsersBookings(int userId)
        {
            var allBookings = _context.Booking.Where(b => b.Iduser == userId).ToList();
            IEnumerable<TransportBookingDto> transportBookings = new TransportBookingDto[] { };
            IEnumerable<HotelBookingDto> hotelBookings = new HotelBookingDto[] { };

            foreach (var booking in allBookings)
            {
                if(booking.Idbookingtype == GetBookingTypeId("transport"))
                {
                    Transport transport = _context.Transport.Where(t => t.Idtransport == booking.Idbookingitem).FirstOrDefault();
                    TransportBookingDto transportBooking = _mapper.Map<TransportBookingDto>(transport);
                    transportBooking.Idbooking = booking.Idbooking;
                    transportBooking.Idbookingitem = booking.Idbookingitem;
                    transportBooking.Timecreated = booking.Timecreated;
                    transportBooking.Idbookingtype = booking.Idbookingtype;
                    transportBooking.Idtimeslot = booking.Idtimeslot;
                    var timeSlot = _context.Timeslots.Where(t => t.Idtimeslot == booking.Idtimeslot).FirstOrDefault().Itemdate;
                    transportBooking.TimeSlot = timeSlot.Date.ToString("d");
                    transportBooking.LocationFrom = _context.Location.Where(l => l.Idlocation == transportBooking.Idlocationfrom).FirstOrDefault().Locationname;
                    transportBooking.LocationTo = _context.Location.Where(l => l.Idlocation == transportBooking.Idlocationto).FirstOrDefault().Locationname;
                    if(timeSlot <= DateTime.Today)
                    {
                        transportBooking.Active = false;
                    }
                    else if(!_context.Occupieditem.Where(o => o.Idbooking == booking.Idbooking).Any())
                    {
                        transportBooking.Active = false;
                    }
                    else
                    {
                        transportBooking.Active = true;
                    }
                    transportBookings = transportBookings.Append(transportBooking);
                }
                else if (booking.Idbookingtype == GetBookingTypeId("hotel"))
                {
                    Hotel hotel = _context.Hotel.Where(h => h.Idhotelroom == booking.Idbookingitem).FirstOrDefault();
                    HotelBookingDto hotelBooking = _mapper.Map<HotelBookingDto>(hotel);
                    hotelBooking.Idbooking = booking.Idbooking;
                    hotelBooking.Idbookingitem = booking.Idbookingitem;
                    hotelBooking.Timecreated = booking.Timecreated;
                    hotelBooking.Idbookingtype = booking.Idbookingtype;
                    hotelBooking.Idtimeslot = booking.Idtimeslot;
                    var timeSlot = _context.Timeslots.Where(t => t.Idtimeslot == booking.Idtimeslot).FirstOrDefault().Itemdate;
                    hotelBooking.TimeSlot = timeSlot.Date.ToString("d");
                    hotelBooking.Location = _context.Location.Where(l => l.Idlocation == hotelBooking.IdLocation).FirstOrDefault().Locationname;
                    if (timeSlot <= DateTime.Today)
                    {
                        hotelBooking.Active = false;
                    }
                    else if (!_context.Occupieditem.Where(o => o.Idbooking == booking.Idbooking).Any())
                    {
                        hotelBooking.Active = false;
                    }
                    else
                    {
                        hotelBooking.Active = true;
                    }
                    hotelBookings = hotelBookings.Append(hotelBooking);

                }
            }
            return new UsersBookingsDto { TransportBookings = transportBookings, HotelBookings = hotelBookings };

        }

        public int GetBookingTypeId(string bookingType)
        {
            return _context.Bookingtype.Where(b => b.Bookingtypename.Equals(bookingType)).FirstOrDefault().Idbookingtype;
        }

        public bool SaveChanges()
        {
            try
            {
                return (_context.SaveChanges() >= 0);
            }
            catch
            {
                return false;
            }
        }

        public bool CancelBooking(int idBooking, int idUser)
        {
            var booking = _context.Booking.Where(b => b.Idbooking == idBooking).FirstOrDefault();
            if(booking.Iduser == idUser)
            {
                var occupiedItem = _context.Occupieditem.Where(o => o.Idbooking == idBooking).FirstOrDefault();
                _context.Occupieditem.Remove(occupiedItem);
                return true;
            }
            return false;
        }
    }
}
