using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.Repos
{
    public interface ILocationRepo
    {
        IEnumerable<Location> GetLocations();
    }
}
