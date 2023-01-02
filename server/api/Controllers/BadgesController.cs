using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Badgerer.Api.Infrastructure;
using Badgerer.Api.Models;
using Badgerer.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Badgerer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BadgesController : ControllerBase
    {
        private readonly ILogger<BadgesController> _logger;
        private readonly BadgererContext _context;

        public BadgesController(ILogger<BadgesController> logger, BadgererContext context)
        {
            this._logger = logger;
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyCollection<Badge>>> Get()
        {
            IReadOnlyCollection<Badge> result = await this._context.Badges.ToArrayAsync();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Badge>> GetById(int id)
        {
            Badge result = await this._context.Badges.FindAsync(id);

            return result;
        }

        [HttpGet("GenerateImage")]
        public async Task<ActionResult<string>> GenerateImage()
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            // Adding app id as part of the header
            // TODO: go through dapr
            // client.DefaultRequestHeaders.Add("dapr-app-id", "badgerer-api");

            // TODO: URL handling, config, error handling etc.
            var response = await client.GetFromJsonAsync<BadgeImage>($"http://localhost:5165/BadgeImage");

            return response.Data;
        }

        [HttpPost]
        public async Task<ActionResult<Badge>> Create(Badge badge)
        {
            _context.Badges.Add(badge);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = badge.BadgeId }, badge);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Badge>> Update(int id, Badge badge)
        {
            Badge result = await this._context.Badges.FindAsync(id);
            result.Name = badge.Name;
            result.Description = badge.Description;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Badge>> Delete(int id)
        {
            var badge = await _context.Badges.FindAsync(id);

            if (badge == null)
            {
                return NotFound();
            }

            _context.Badges.Remove(badge);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
