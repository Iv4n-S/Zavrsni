using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.Exceptions
{
    public class LoginFailedException : Exception
    {
        public LoginFailedException()
        {
        }
        public LoginFailedException(string message) : base(message)
        {
        }
    }
}
