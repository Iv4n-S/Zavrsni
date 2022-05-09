using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class GetImagesDto
    {
        public IEnumerable<ReturnImage> image { get; set; }
    }
}
