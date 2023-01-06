using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Badgerer.Api.Models;

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

        public virtual DbSet<Badge> Badges => Set<Badge>();
        public virtual DbSet<Team> Teams => Set<Team>();
    }
}