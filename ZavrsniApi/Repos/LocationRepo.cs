using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.Repos
{
    public class LocationRepo : ILocationRepo
    {
        private ZavrsniContext _context;

        public LocationRepo(ZavrsniContext context)
        {
            _context = context;
        }
        public IEnumerable<Location> GetLocations()
        {
            return _context.Location.ToList();
        }
    }
}
