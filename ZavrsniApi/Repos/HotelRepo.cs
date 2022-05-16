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
            IEnumerable<int> idHotels = _context.Booking.Where(b => b.Timecreated > DateTime.Today.AddDays(-7) && b.Idbookingtype == 2).Select(b => b.IdHotel).ToList();
            Dictionary<int, int> bookingsPerHotel = new Dictionary<int, int>();
            foreach (var idHotel in idHotels)
            {
                int value = 1;
                if (bookingsPerHotel.ContainsKey(idHotel))
                {
                    bookingsPerHotel.TryGetValue(idHotel, out value);
                    value++;
                }
                bookingsPerHotel[idHotel] = value;
            }

            IEnumerable<Hotel> hotels = _context.Hotel.AsEnumerable().Where(h => bookingsPerHotel.ContainsKey(h.IdHotel))
                .OrderByDescending(h => bookingsPerHotel[h.IdHotel]).Take(10);
            IEnumerable<Hotel> hotelsDistinct = new Hotel[] { };
            foreach(var hotel in hotels)
            {
                if (!hotelsDistinct.Where(h => h.IdHotel == hotel.IdHotel).Any())
                {
                    hotelsDistinct = hotelsDistinct.Append(hotel);
                }
            }
            return hotelsDistinct;

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
            return _context.Hotelroomimages.Where(i => i.Idhotelroom == idHotelRoom).ToList();
        }

        public string GetLocation(int idLocation)
        {
            return _context.Location.Where(l => l.Idlocation == idLocation).Select(l => l.Locationname).FirstOrDefault();
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
    }
}
