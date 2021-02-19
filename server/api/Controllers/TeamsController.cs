using Badgerer.Api.Infrastructure;
using Badgerer.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Badgerer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private BadgererContext _context;

        public TeamsController(ILogger<BadgesController> logger, BadgererContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyCollection<Team>>> Get()
        {
            IReadOnlyCollection<Team> result = await this._context.Teams.ToArrayAsync();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetById(int id)
        {
            Team team = await this._context.Teams.FindAsync(id);

            return Ok(team);
        }

        [HttpPost]
        public async Task<ActionResult<Team>> Create([FromBody] Team team)
        {
            _context.Teams.Add(team);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = team.TeamId }, team);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Team>> Update(int id, [FromBody] Team team)
        {
            Team result = await this._context.Teams.FindAsync(id);
            result.Name = team.Name;
            result.Description = team.Description;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Team>> Delete(int id)
        {
            Team team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
