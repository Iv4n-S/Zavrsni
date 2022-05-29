using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Repos
{
    public interface IUsersBookingsRepo
    {
        bool SaveChanges();
        UsersBookingsDto GetUsersBookings(int userId);
        bool CancelBooking(int idBooking, int idUser);

    }
}
