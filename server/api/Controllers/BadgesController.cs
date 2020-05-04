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

        [HttpPost]
        public async Task<ActionResult<Badge>> Create(Badge badge)
        {
            _context.Badges.Add(badge);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = badge.BadgeId }, badge);
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
