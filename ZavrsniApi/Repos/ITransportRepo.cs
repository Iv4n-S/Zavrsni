using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Repos
{
    public interface ITransportRepo
    {
        bool SaveChanges();
        IEnumerable<TransportTypesDto> GetTransportTypes();
        IEnumerable<TransportsDto> GetFilteredTransports(TransportFiltersDto filters);
        int GetLastBookingId();
        bool BookTransport(BookTransportDto booking);
    }
}
