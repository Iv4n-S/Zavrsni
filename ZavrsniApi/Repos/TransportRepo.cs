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

        public IEnumerable<TransportsDto> GetFilteredTransports(TransportFiltersDto filters)
        {
            var travelDate = _context.Timeslots.Where(t => t.Itemdate.Equals(filters.SelectedDate)).Select(t => t.Idtimeslot).FirstOrDefault();
            var locationFromId = _context.Location.Where(l => l.Locationname.Equals(filters.LocationFrom)).Select(l => l.Idlocation).FirstOrDefault();
            var locationToId = _context.Location.Where(l => l.Locationname.Equals(filters.LocationTo)).Select(l => l.Idlocation).FirstOrDefault();
            var transports = _context.Transport.Where(t => t.Idlocationfrom == locationFromId && t.Idlocationto == locationToId).ToList();
            var transportsMapped = _mapper.Map<IEnumerable<TransportsDto>>(transports);

            IEnumerable<TransportsDto> transportsAvailable = new TransportsDto[] { };

            foreach (var transport in transportsMapped)
            {
                var count = _context.Occupieditem.Where(o => o.Idbookingitem == transport.Idtransport && o.Idtimeslot == travelDate).Count();
                if (_context.Occupieditem.Where(o => o.Idbookingitem == transport.Idtransport && o.Idtimeslot == travelDate).Count() < transport.Capacity)
                {
                    transport.LocationFrom = filters.LocationFrom;
                    transport.LocationTo = filters.LocationTo;
                    transportsAvailable = transportsAvailable.Append(transport);
                }
            }

            return transportsAvailable;
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
