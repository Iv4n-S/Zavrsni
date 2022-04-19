using ZavrsniApi.DtoModels;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace ZavrsniApi.SqlDb
{
    public partial class DbService
    {
        private readonly ZavrsniContext _context;

        public DbService(ZavrsniContext context)
        {
            _context = context;
        }
        public IEnumerable<Userdata> GetAllUsersDataAsync() //Task<IEnumerable<UserDataDto>> GetAllUsersDataAsync()
        {
            var sqlScript = @"SELECT * FROM userdata";/*
            using (var con = _dbConnectionFactory.CreateConnection())
            {
                //await con.QueryAsync<UserDataDto>(sqlScript).ConfigureAwait(false);
            }*/
            return _context.Userdata.ToList();
        }
    }
}
