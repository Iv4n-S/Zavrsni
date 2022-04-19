using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.SqlDb
{
    public class DbConnectionFactory
    {
        private readonly IConfiguration _configuration;
        public DbConnectionFactory()
        {
        }

        private string ConnectionString
        {
            get
            {
                return _configuration.GetConnectionString("ZavrsniCon");
            }
        }

        public IDbConnection CreateConnection()
        {

            var con = new SqlConnection(ConnectionString);
            return con;
        }
    }
}
