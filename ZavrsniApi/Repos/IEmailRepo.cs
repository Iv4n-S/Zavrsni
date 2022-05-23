using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;

namespace ZavrsniApi.Repos
{
    public interface IEmailRepo
    {
        Task SendEmailToUser(EmailDto emailOptions);

    }
}
