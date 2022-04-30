using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.Repos
{
    public interface ITransportRepo
    {
        bool SaveChanges();
        IEnumerable<Transporttypes> GetAllTransportTypes();
        IEnumerable<Transport> GetAllTransports();

    }
}
