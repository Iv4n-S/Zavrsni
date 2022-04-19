using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.Repos
{
    public interface IUserRepo
    {
        bool SaveChanges();
        IEnumerable<Userdata> GetAllUsers();
        Userdata GetUserById(int id);
        void CreateUser(Userdata user);
        int GetLastUserId();
        void UpdateUser(Userdata user);
    }
}
