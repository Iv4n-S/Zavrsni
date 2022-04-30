using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.Exceptions
{
    public class DuplicateUserException : Exception
    {
        public DuplicateUserException()
        {
        }
        public DuplicateUserException(string message) : base(message)
        {
        }
    }
}
