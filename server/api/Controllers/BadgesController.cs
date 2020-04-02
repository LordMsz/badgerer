using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Badgerer.Api.Infrastructure;
using Badgerer.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Badgerer.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BadgesController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly BadgererContext _context;

        public BadgesController(ILogger<WeatherForecastController> logger, BadgererContext context)
        {
            this._logger = logger;
            this._context = context;
        }

        [HttpGet]
        public async Task<Badge> Get()
        {
            Badge result = await this._context.Badges.FirstOrDefaultAsync();

            return result;
        }
    }
}
