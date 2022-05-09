using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class ImageDto
    {
        public string FileName { get; set; }
        public IEnumerable<IFormFile> Image { get; set; }
    }
}
