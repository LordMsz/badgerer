using Microsoft.EntityFrameworkCore;
using Badgerer.Api.Models;
using EntityGraphQL.Schema.FieldExtensions;

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

        [UseFilter]
        [UseOffsetPaging]
        public virtual DbSet<Badge> Badges => Set<Badge>();

        [UseFilter]
        [UseOffsetPaging]
        public virtual DbSet<Team> Teams => Set<Team>();
    }
}