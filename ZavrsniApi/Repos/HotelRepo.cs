using AutoMapper;
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
            IEnumerable<int> idHotelRooms = _context.Booking.Where(b => b.Timecreated > DateTime.Today.AddDays(-7)).Select(b => b.Idbookingitem).ToList();
            Dictionary<int, int> bookingsPerHotel = new Dictionary<int, int>();
            foreach (var hotelRoom in idHotelRooms)
            {
                int idHotel = _context.Hotel.Where(h => h.Idhotelroom == hotelRoom).Select(h => h.IdHotel).FirstOrDefault();
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

            return hotels;

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
