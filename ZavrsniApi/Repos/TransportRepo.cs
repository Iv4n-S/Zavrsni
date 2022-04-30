using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.Repos
{
    public class TransportRepo : ITransportRepo
    {
        private ZavrsniContext _context;

        public TransportRepo(ZavrsniContext context)
        {
            _context = context;
        }

        public IEnumerable<Transport> GetAllTransports()
        {
            return _context.Transport.ToList();
        }

        public IEnumerable<Transporttypes> GetAllTransportTypes()
        {
            return _context.Transporttypes.ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
