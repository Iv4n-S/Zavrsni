using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
using System.Security.Claims;
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
        private readonly IEmailRepo _email_repository;

        public HotelController(IHotelRepo repository, IMapper mapper, IHostingEnvironment env, IEmailRepo emailRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _env = env;
            _dir = Path.Combine(_env.ContentRootPath, "Images");
            _email_repository = emailRepository;
        }

        [HttpGet]
        [Route("topTen")]
        public ActionResult<IEnumerable<HotelDto>> GetTenMostBookedHotelsLastWeek()
        {
            var result = _repository.GetTenMostBookedHotelsLastWeek();
            if (result != null)
            {
                var hotels = _mapper.Map<IEnumerable<HotelDto>>(result);
                foreach (var hotel in hotels)
                {
                    var image = (OkObjectResult)GetImages(hotel.Idhotelroom).Result;
                    hotel.image = (IEnumerable<ReturnImage>)image.Value;
                    hotel.Location = _repository.GetLocation(hotel.IdLocation);
                }

                return Ok(hotels);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("filteredHotels")]
        public ActionResult<IEnumerable<HotelDto>> GetFilteredHotels(HotelSearchFiltersDto filters)
        {
            var result = _repository.GetSearchedHotels(filters);
            if (result != null)
            {
                var hotels = _mapper.Map<IEnumerable<HotelDto>>(result);
                foreach (var hotel in hotels)
                {
                    var image = (OkObjectResult)GetImages(hotel.Idhotelroom).Result;
                    hotel.image = (IEnumerable<ReturnImage>)image.Value;
                    hotel.Location = _repository.GetLocation(hotel.IdLocation);
                }

                return Ok(hotels);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("getHotel")]
        public ActionResult GetHotel(HotelRoomsInHotelDto hotelSelected)
        {
            var result = _repository.GetHotel(hotelSelected);
            if (result != null)
            {
                var hotelRooms = _mapper.Map<IEnumerable<HotelDto>>(result);
                foreach (var hotelRoom in hotelRooms)
                {
                    var image = (OkObjectResult)GetImages(hotelRoom.Idhotelroom).Result;
                    hotelRoom.image = (IEnumerable<ReturnImage>)image.Value;
                    hotelRoom.Location = _repository.GetLocation(hotelRoom.IdLocation);
                }

                return Ok(hotelRooms);
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
                    Imagename = imageName,
                    Idhotelroom = idHotelRoom
                });
                _repository.SaveChanges();

            }
            return Ok();
        }

        [HttpGet]
        [Route("getImages/{idHotelRoom}")]
        public ActionResult<IEnumerable<ReturnImage>> GetImages(int idHotelRoom)
        {
            var images = _repository.GetImagesForHotelRoom(idHotelRoom);
            IEnumerable<ReturnImage> imagesResult = new ReturnImage[] { };

            foreach (var image in images)
            {
                string original = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, image.Imagename);
                imagesResult = imagesResult.Append(new ReturnImage { original = original });
            }
            return Ok(imagesResult);

        }

        [HttpPost]
        [Route("getAdminHotels")]
        [Authorize(Roles = "admin")]
        public ActionResult<IEnumerable<AdminHotelDto>> GetAdminHotels(GetAdminHotelsDto location)
        {
            var result = _repository.GetAdminHotels(location.Location);
            if(result != null)
            {
                var hotelRooms = _mapper.Map<IEnumerable<AdminHotelDto>>(result);
                foreach (var hotelRoom in hotelRooms)
                {
                    var image = (OkObjectResult)GetImages(hotelRoom.Idhotelroom).Result;
                    hotelRoom.image = (IEnumerable<ReturnImage>)image.Value;
                    hotelRoom.Location = _repository.GetLocation(hotelRoom.IdLocation);
                    hotelRoom.Active = true;
                }

                return Ok(hotelRooms);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("bookHotelRoom")]
        [Authorize]
        public async Task<ActionResult> BookHotelRoom(BookingHotelDto hotelRoom)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                int id = int.Parse(identity.Claims.FirstOrDefault(i => i.Type == ClaimTypes.Sid)?.Value);
                BookHotelDto booking = _mapper.Map<BookHotelDto>(hotelRoom);
                booking.IdUser = id;
                var result =_repository.BookHotelRoom(booking);
                if(!result)
                {
                    return Conflict();
                }
                _repository.SaveChanges();

                EmailDto options = new EmailDto
                {
                    ToEmail = identity.Claims.FirstOrDefault(i => i.Type == ClaimTypes.Email)?.Value,
                    PlaceHolders = new List<KeyValuePair<string, string>>()
                    {
                        new KeyValuePair<string, string>("{{UserName}}", identity.Claims.FirstOrDefault(i => i.Type == ClaimTypes.NameIdentifier)?.Value),
                        new KeyValuePair<string, string>("{{bookingObject}}", _repository.GetHotelNameById(hotelRoom.IdHotelRoom))
                    }
                };
                await _email_repository.SendEmailToUser(options);
            }


            return Ok();
        }

        [HttpDelete]
        [Route("deleteHotelRoom/{idHotelRoom}")]
        [Authorize(Roles = "admin")]
        public ActionResult DeleteHotelRoom(int idHotelRoom)
        {
            var result = _repository.DeleteHotelRoom(idHotelRoom);
            if (result)
            {
                _repository.SaveChanges();
                return Ok();
            }
            return Forbid();
        }


        [HttpPost]
        [Route("addHotel")]
        [Authorize(Roles = "admin")]
        public ActionResult AddHotel(AddHotelDto addHotel)
        {
            var result = _repository.AddHotelRoom(addHotel);
            if (result != -1)
            {
                var saved = _repository.SaveChanges();
                if (saved)
                {
                    var imageInserted = InsertImages(result, addHotel.images);
                    return Ok();
                }
            }
            return Conflict();
        }
    }
}
