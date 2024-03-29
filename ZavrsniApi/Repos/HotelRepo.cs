﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Repos
{
    public class HotelRepo : IHotelRepo
    {
        private readonly ZavrsniContext _context;
        private readonly IMapper _mapper;

        public HotelRepo(ZavrsniContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public IEnumerable<Hotel> GetTenMostBookedHotelsLastWeek()
        {
            IEnumerable<int?> idHotels = _context.Booking.Where(b => b.Timecreated > DateTime.Today.AddDays(-7) && b.Idbookingtype == 2).Select(b => b.Idhotel).ToList();
            Dictionary<int, int> bookingsPerHotel = new Dictionary<int, int>();
            foreach (var idHotel in idHotels)
            {
                int value = 1;
                if (bookingsPerHotel.ContainsKey(idHotel.Value))
                {
                    bookingsPerHotel.TryGetValue(idHotel.Value, out value);
                    value++;
                }
                bookingsPerHotel[idHotel.Value] = value;
            }
            IEnumerable<Hotel> hotels = _context.Hotel.AsEnumerable().Where(h => bookingsPerHotel.ContainsKey(h.IdHotel)).GroupBy(h => h.IdHotel)
                .Select(h => h.First()).OrderByDescending(h => bookingsPerHotel[h.IdHotel]).Take(10);
            IEnumerable<Hotel> hotelsDistinct = new Hotel[] { };
            foreach (var hotel in hotels)
            {
                if (!hotelsDistinct.Where(h => h.IdHotel == hotel.IdHotel).Any())
                {
                    hotelsDistinct = hotelsDistinct.Append(hotel);
                }
            }
            return hotelsDistinct;

        }

        public IEnumerable<Hotel> GetHotel(HotelRoomsInHotelDto hotelSelected)
        {
            var hotelRoomsInHotel = _context.Hotel.Where(h => h.IdHotel == hotelSelected.IdHotel).ToList();
            IEnumerable<int> timeSlots = _context.Timeslots.Where(t => hotelSelected.SelectedDates.Contains(t.Itemdate)).Select(t => t.Idtimeslot).ToList();
            IEnumerable<Hotel> hotelRooms = new Hotel[] { };

            foreach (var hotelRoom in hotelRoomsInHotel)
            {
                if (!hotelRooms.Where(h => h.Hotelroomcapacity == hotelRoom.Hotelroomcapacity).Any())
                {
                    bool available = true;
                    foreach (var date in timeSlots)
                    {
                        if (_context.Occupieditem.Where(i => i.Idtimeslot == date && i.Idhotelroom == hotelRoom.Idhotelroom).Any())
                        {
                            available = false;
                        }
                    }

                    if (available)
                    {
                        hotelRooms = hotelRooms.Append(hotelRoom);
                    }
                }
            }

            return hotelRooms;
        }

        public void InsertImages(Hotelroomimages image)
        {
            if (image == null)
            {
                throw new ArgumentNullException(nameof(image));
            }
            _context.Hotelroomimages.Add(image);
        }

        public int GetLastImageId()
        {
            return _context.Hotelroomimages.OrderByDescending(u => u.Idimage).First().Idimage;
        }

        public IEnumerable<Hotelroomimages> GetImagesForHotelRoom(int idHotelRoom)
        {
            var images = _context.Hotelroomimages.Where(i => i.Idhotelroom == idHotelRoom).ToList();
            return images;
        }

        public string GetLocation(int idLocation)
        {
            return _context.Location.Where(l => l.Idlocation == idLocation).Select(l => l.Locationname).FirstOrDefault();
        }

        public IEnumerable<Hotel> GetSearchedHotels(HotelSearchFiltersDto filters)
        {
            int IdLocation = _context.Location.Where(l => l.Locationname.ToLower().Equals(filters.Location.ToLower())).Select(l => l.Idlocation).FirstOrDefault();
            var hotelsInLocation = _context.Hotel.Where(h => h.Idlocation == IdLocation).ToList();
            IEnumerable<Hotel> hotels  = new Hotel[] { };
            IEnumerable<int> timeSlots = _context.Timeslots.Where(t => filters.SelectedDates.Contains(t.Itemdate)).Select(t => t.Idtimeslot).ToList();

            foreach(var hotelInLocation in hotelsInLocation)
            {
                if (!hotels.Where(h => h.IdHotel == hotelInLocation.IdHotel).Any())
                {
                    bool available = true;
                    foreach (var date in timeSlots)
                    {
                        if (_context.Occupieditem.Where(i => i.Idtimeslot == date && i.Idhotelroom == hotelInLocation.Idhotelroom).Any())
                        {
                            available = false;
                        }
                    }

                    if (available)
                    {
                        hotels = hotels.Append(hotelInLocation);
                    }
                }
            }

            return hotels;
        }

        public int GetLastBookingId()
        {
            return _context.Booking.OrderByDescending(b => b.Idbooking).First().Idbooking;
        }

        public bool BookHotelRoom(BookHotelDto bookingHotel)
        {
            if (bookingHotel == null)
            {
                throw new ArgumentNullException(nameof(bookingHotel));
            }
            IEnumerable<int> timeSlots = _context.Timeslots.Where(t => bookingHotel.SelectedDates.Contains(t.Itemdate))
                    .Select(t => t.Idtimeslot).ToList();
            bool exists = _context.Occupieditem.Where(o => o.Idhotelroom == bookingHotel.IdHotelRoom && timeSlots.Contains(o.Idtimeslot)).Any();
            if (!exists)
            {
                var bookingId = GetLastBookingId() + 1;
                var occupiedItemId = GetLastOccupiedItemId() + 1;

                Booking booking = new Booking();
                foreach (var timeSlot in timeSlots)
                {
                    booking = new Booking();
                    booking.Idbooking = bookingId++;
                    booking.Idhotelroom = bookingHotel.IdHotelRoom;
                    booking.Timecreated = DateTime.Now;
                    booking.Idbookingtype = 2;
                    booking.Iduser = bookingHotel.IdUser;
                    booking.Idtimeslot = timeSlot;
                    booking.Idhotel = bookingHotel.IdHotel;
                    _context.Booking.Add(booking);
                    OccupieHotel(new OccupieItemDto { OccupiedItemId=occupiedItemId++, Idhotelroom = bookingHotel.IdHotelRoom, IdBooking = booking.Idbooking, IdTimeSlot = timeSlot });
                }
                return true;
            }
            return false;
        }

        public int GetLastOccupiedItemId()
        {
            return _context.Occupieditem.OrderByDescending(o => o.Idoccupieditem).First().Idoccupieditem;
        }

        public void OccupieHotel(OccupieItemDto booking)
        {
            _context.Occupieditem.Add(new Occupieditem
            {
                Idoccupieditem = booking.OccupiedItemId,
                Idhotelroom = booking.Idhotelroom,
                Idbooking = booking.IdBooking,
                Idtimeslot = booking.IdTimeSlot,
            });
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

        public string GetHotelNameById(int idhotelroom)
        {
            return _context.Hotel.Where(h => h.Idhotelroom == idhotelroom).FirstOrDefault().Hotelname;
        }

        public IEnumerable<Hotel> GetAdminHotels(string location)
        {
            int idLocation = _context.Location.Where(l => l.Locationname.Equals(location)).FirstOrDefault().Idlocation;

            return _context.Hotel.Where(h => h.Idlocation == idLocation).ToList();
        }

        public bool DeleteHotelRoom(int idHotelRoom)
        {
            var hotelRoom = _context.Hotel.Where(h => h.Idhotelroom == idHotelRoom).FirstOrDefault();
            if(hotelRoom != null)
            {
                var images = _context.Hotelroomimages.Where(i => i.Idhotelroom == idHotelRoom).ToList();
                foreach(var image in images)
                {
                    _context.Hotelroomimages.Remove(image);
                }
                _context.Hotel.Remove(hotelRoom);
                return true;
            }
            return false;
        }

        public int AddHotelRoom(AddHotelDto addHotel)
        {
            if (addHotel != null)
            {
                int lastTransportId = _context.Transport.OrderByDescending(t => t.Idtransport).First().Idtransport;
                int lastHotelId = _context.Hotel.OrderByDescending(h => h.Idhotelroom).First().Idhotelroom;
                Hotel hotel = _mapper.Map<Hotel>(addHotel);
                hotel.Idhotelroom = lastTransportId > lastHotelId ? lastTransportId + 1 : lastHotelId + 1;
                hotel.Idlocation = _context.Location.Where(l => l.Locationname.Equals(addHotel.Location)).Select(l => l.Idlocation).FirstOrDefault();
                if (hotel.Idlocation == 0)
                {
                    Location location = new Location();
                    location.Idlocation = _context.Location.OrderByDescending(l => l.Idlocation).First().Idlocation + 1;
                    location.Locationname = addHotel.Location;
                    _context.Location.Add(location);
                    _context.SaveChanges();
                    hotel.Idlocation = location.Idlocation;

                }
                var idHotel = _context.Hotel.Where(h => h.Hotelname.Equals(hotel.Hotelname) && h.Idlocation == hotel.Idlocation).Select(h => h.IdHotel).FirstOrDefault();
                hotel.IdHotel = idHotel != 0 ? idHotel : _context.Hotel.OrderByDescending(h => h.IdHotel).First().IdHotel + 1;
                _context.Hotel.Add(hotel);
                return hotel.Idhotelroom;
            }
            return -1;
        }
    }
}
