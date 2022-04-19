using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.Repos
{
    public class UserRepo : IUserRepo
    {
        private readonly ZavrsniContext _context;
        public UserRepo(ZavrsniContext context)
        {
            _context = context;
        }
        public IEnumerable<Userdata> GetAllUsers()
        {
            return _context.Userdata.ToList();
        }

        public Userdata GetUserById(int id)
        {
            return _context.Userdata.FirstOrDefault(u => u.Iduser == id);
        }
    }
}
