﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZavrsniApi.DtoModels
{
    public class HotelSearchFiltersDto
    {
        public List<DateTime> SelectedDates { get; set; }
        public string Location { get; set; }
    }
}
