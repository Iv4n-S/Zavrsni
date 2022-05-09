using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;
using ZavrsniApi.Repos;
using static System.Net.Mime.MediaTypeNames;

namespace ZavrsniApi.Controllers
{
    [Route("api/hotel")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelRepo _repository;
        private readonly IMapper _mapper;
        private readonly IHostingEnvironment _env;
        private string _dir;

        public HotelController(IHotelRepo repository, IMapper mapper, IHostingEnvironment env)
        {
            _repository = repository;
            _mapper = mapper;
            _env = env;
            _dir = Path.Combine(_env.ContentRootPath, "Images");
        }

        [HttpGet]
        [Route("topTen")]
        public ActionResult<IEnumerable<HotelDto>> GetTenMostBookedHotelsLastWeek()
        {
            var result = _repository.GetTenMostBookedHotelsLastWeek();
            if (result != null)
            {
                return Ok(_mapper.Map<IEnumerable<HotelDto>>(result));
            }
            return NotFound();
        }

        [HttpPost]
        [Route("imagePost/{idHotelRoom}")]
        public ActionResult InsertImages(int idHotelRoom, [FromForm] ImageDto formData)
        {
            int lastImageId = 1;
            try
            {
                lastImageId = _repository.GetLastImageId();
                lastImageId++;
            }
            catch
            {
            }

            foreach (var file in formData.Image)
            {
                string imageName = $"{lastImageId}_{file.FileName}";
                using (var fileStream = new FileStream(Path.Combine(_dir, imageName),
                    FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                _repository.InsertImages(new Hotelroomimages
                {
                    Idimage = lastImageId++,
                    ImageName = imageName,
                    Idhotelroom = idHotelRoom
                });
                _repository.SaveChanges();

            }
            return Ok();
        }
            
        
        [HttpGet]
        [Route("getImages/{idHotelRoom}")] 
        public ActionResult<GetImagesDto> GetImages(int idHotelRoom)
        {
            var images = _repository.GetImagesForHotelRoom(idHotelRoom);
            GetImagesDto imagesResult = new GetImagesDto();
            imagesResult.image = new ReturnImage[] { };
            foreach (var image in images)
            {
                string original = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, image.ImageName);
                imagesResult.image = imagesResult.image.Append(new ReturnImage { original = original });
            }
            return Ok(imagesResult);
        }
    }
}
