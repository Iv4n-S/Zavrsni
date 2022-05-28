﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ZavrsniApi.DtoModels;
using ZavrsniApi.Repos;

namespace ZavrsniApi.Controllers
{
    [Route("api/bookings")]
    [ApiController]
    public class UsersBookingsController : ControllerBase
    {
        private readonly IUsersBookingsRepo _repository;
        private readonly IMapper _mapper;
        private readonly IHotelRepo _hotelRepository;

        public UsersBookingsController(IUsersBookingsRepo repository, IMapper mapper, IHotelRepo hotelRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _hotelRepository = hotelRepository;
        }

        [HttpGet] 
        [Route("getUsersBookings")]
        [Authorize]
        public ActionResult<UsersBookingsDto> GetUsersBookings()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                int id = int.Parse(identity.Claims.FirstOrDefault(i => i.Type == ClaimTypes.Sid)?.Value);
                var result = _repository.GetUsersBookings(id);
                if(result != null)
                {
                    foreach (var hotel in result.HotelBookings)
                    {
                        var image = (OkObjectResult)GetImages(hotel.Idbookingitem).Result;
                        hotel.Image = (IEnumerable<ReturnImage>)image.Value;
                    }
                    return Ok(result);
                }

            }
            return NotFound();
            
        }




        public ActionResult<IEnumerable<ReturnImage>> GetImages(int idHotelRoom)
        {
            var images = _hotelRepository.GetImagesForHotelRoom(idHotelRoom);
            IEnumerable<ReturnImage> imagesResult = new ReturnImage[] { };

            foreach (var image in images)
            {
                string original = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, image.Imagename);
                imagesResult = imagesResult.Append(new ReturnImage { original = original });
            }
            return Ok(imagesResult);

        }
    }
}
