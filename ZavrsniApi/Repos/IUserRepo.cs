using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.Repos
{
    public interface IUserRepo
    {
        IEnumerable<Userdata> GetAllUsers();
        Userdata GetUserById(int id);
    }
}
