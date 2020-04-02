using Badgerer.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Badgerer.Api.Infrastructure
{
    public class BadgererContext : DbContext
    {
        public BadgererContext(DbContextOptions<BadgererContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("bg");
        }

        public DbSet<Badge> Badges { get; set; }
    }
}