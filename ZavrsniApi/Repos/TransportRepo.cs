using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Repos
{
    public class TransportRepo : ITransportRepo
    {
        private ZavrsniContext _context;
        private IMapper _mapper;

        public TransportRepo(ZavrsniContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public bool BookTransport(BookTransportDto booking)
        {
            if (booking == null)
            {
                throw new ArgumentNullException(nameof(booking));
            }
            int timeSlot = _context.Timeslots.Where(t => booking.SelectedDate.Equals(t.Itemdate)).Select(t => t.Idtimeslot).FirstOrDefault();
            Transport selectedTransport = _context.Transport.Where(t => t.Idtransport == booking.IdTransport).FirstOrDefault();
            if(_context.Occupieditem.Where(o => o.Idtransport == booking.IdTransport && o.Idtimeslot == timeSlot).Count() < selectedTransport.Capacity)
            {
                var bookingId = GetLastBookingId() + 1;
                _context.Booking.Add(new Booking
                {
                    Idbooking = bookingId,
                    Idtransport = booking.IdTransport,
                    Timecreated = DateTime.Now,
                    Idbookingtype = 1,
                    Iduser = booking.IdUser,
                    Idtimeslot = timeSlot,
                    Idhotel = null
                });
                OccupieTransport(new OccupieItemDto { Idtransport = booking.IdTransport, IdBooking = bookingId, IdTimeSlot = timeSlot });
                
                return true;
            }
            return false;
        }

        public int GetLastOccupiedItemId()
        {
            return _context.Occupieditem.OrderByDescending(o => o.Idoccupieditem).First().Idoccupieditem;
        }

        public void OccupieTransport(OccupieItemDto booking)
        {
            var occupiedItemId = GetLastOccupiedItemId() + 1;
            _context.Occupieditem.Add(new Occupieditem {
                Idoccupieditem = occupiedItemId,
                Idtransport = booking.Idtransport,
                Idbooking = booking.IdBooking,
                Idtimeslot = booking.IdTimeSlot,
            }); 
        }

        public IEnumerable<TransportsDto> GetFilteredTransports(TransportFiltersDto filters)
        {
            var travelDate = _context.Timeslots.Where(t => t.Itemdate.Equals(filters.SelectedDate)).Select(t => t.Idtimeslot).FirstOrDefault();
            var locationFromId = _context.Location.Where(l => l.Locationname.Equals(filters.LocationFrom)).Select(l => l.Idlocation).FirstOrDefault();
            var locationToId = _context.Location.Where(l => l.Locationname.Equals(filters.LocationTo)).Select(l => l.Idlocation).FirstOrDefault();
            var transports = _context.Transport.Where(t => t.Idlocationfrom == locationFromId && t.Idlocationto == locationToId 
                                && filters.TransportTypes.Contains(t.Idtransporttype)).ToList();
            var transportsMapped = _mapper.Map<IEnumerable<TransportsDto>>(transports);

            IEnumerable<TransportsDto> transportsAvailable = new TransportsDto[] { };

            foreach (var transport in transportsMapped)
            {
                if (_context.Occupieditem.Where(o => o.Idtransport == transport.Idtransport && o.Idtimeslot == travelDate).Count() < transport.Capacity)
                {
                    transport.LocationFrom = filters.LocationFrom;
                    transport.LocationTo = filters.LocationTo;
                    transportsAvailable = transportsAvailable.Append(transport);
                }
            }

            return transportsAvailable;
        }

        public int GetLastBookingId()
        {
            return _context.Booking.OrderByDescending(b => b.Idbooking).First().Idbooking;
        }

        public IEnumerable<TransportTypesDto> GetTransportTypes()
        {
            return _mapper.Map<IEnumerable<TransportTypesDto>>(_context.Transporttypes.ToList());
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public string GetTransportNameById(int idtransport)
        {
            return _context.Transport.Where(t => t.Idtransport == idtransport).FirstOrDefault().Transportname;
        }

        public IEnumerable<AdminTransportsDto> GetAdminTransports(GetAdminTransportsDto locations)
        {
            var locationFromId = _context.Location.Where(l => l.Locationname.Equals(locations.LocationFrom)).Select(l => l.Idlocation).FirstOrDefault();
            var locationToId = _context.Location.Where(l => l.Locationname.Equals(locations.LocationTo)).Select(l => l.Idlocation).FirstOrDefault();
            var transports = _context.Transport.Where(t => t.Idlocationfrom == locationFromId && t.Idlocationto == locationToId).ToList();

            var mappedTransports = _mapper.Map<IEnumerable<AdminTransportsDto>>(transports);
            foreach(var transport in mappedTransports)
            {
                transport.LocationFrom = locations.LocationFrom;
                transport.LocationTo = locations.LocationTo;
                transport.Active = true;
            }

            return mappedTransports;
        }

        public bool DeleteTransport(int idTransport)
        {
            var transport = _context.Transport.Where(t => t.Idtransport == idTransport).FirstOrDefault();
            if(transport != null)
            {
                _context.Transport.Remove(transport);
                return true;
            }
            return false;
        }

        public bool AddTransport(AddTransportDto addTransport)
        {
            if(addTransport != null)
            {
                int lastTransportId = _context.Transport.OrderByDescending(t => t.Idtransport).First().Idtransport;
                int lastHotelId = _context.Hotel.OrderByDescending(h => h.Idhotelroom).First().Idhotelroom;
                Transport transport = _mapper.Map<Transport>(addTransport);
                transport.Idtransport = lastTransportId > lastHotelId ? lastTransportId + 1 : lastHotelId + 1;
                transport.Idlocationfrom = _context.Location.Where(l => l.Locationname.Equals(addTransport.Locationfrom)).Select(l => l.Idlocation).FirstOrDefault();
                transport.Idlocationto = _context.Location.Where(l => l.Locationname.Equals(addTransport.Locationto)).Select(l => l.Idlocation).FirstOrDefault();
                if(transport.Idlocationfrom == 0)
                {
                    Location location = new Location();
                    location.Idlocation = _context.Location.OrderByDescending(l => l.Idlocation).First().Idlocation + 1;
                    location.Locationname = addTransport.Locationfrom;
                    _context.Location.Add(location);
                    _context.SaveChanges();
                    transport.Idlocationfrom = location.Idlocation;

                }
                if (transport.Idlocationto == 0)
                {
                    Location location = new Location();
                    location.Idlocation = _context.Location.OrderByDescending(l => l.Idlocation).First().Idlocation + 1;
                    location.Locationname = addTransport.Locationto;
                    _context.Location.Add(location);
                    transport.Idlocationto = location.Idlocation;
                }
                _context.Transport.Add(transport);
                return true;
            }
            return false;
        }
    }
}
