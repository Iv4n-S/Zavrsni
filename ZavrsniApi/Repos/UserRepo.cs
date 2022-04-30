using Microsoft.EntityFrameworkCore;
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

        public void CreateUser(Userdata user)
        {
            if(user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            _context.Userdata.Add(user);
        }

        public IEnumerable<Userdata> GetAllUsers()
        {
            return _context.Userdata.ToList();
        }

        public Userdata GetUserById(int id)
        {
            return _context.Userdata.FirstOrDefault(u => u.Iduser == id);
        }

        public bool SaveChanges()
        {
            try
            {
                return (_context.SaveChanges() >= 0);
            }
            catch
            {
                return false;
            }
        }

        public int GetLastUserId()
        {
            return _context.Userdata.OrderByDescending(u => u.Iduser).First().Iduser;
        }

        public void UpdateUser(Userdata user)
        {
            //Nothing
        }
    }
}
