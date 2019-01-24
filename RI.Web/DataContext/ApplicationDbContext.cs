using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RI.Entity;

namespace RI.Web.Data
{


    public class ApplicationDbContext : IdentityDbContext
    {
        private readonly IServiceProvider serviceProvider;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<IdentityUser>(b => {
                b.HasKey(r => r.Id);

            });

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole { Id="1" , Name = "admin" , NormalizedName="administrator" , ConcurrencyStamp = DateTime.Now.ToLongDateString()},
                    new IdentityRole { Id = "2", Name = "user", NormalizedName = "user", ConcurrencyStamp = DateTime.Now.ToLongDateString() },
                    new IdentityRole { Id = "3", Name = "qa", NormalizedName = "Contributor", ConcurrencyStamp = DateTime.Now.ToLongDateString() }
                );
            base.OnModelCreating(builder);

        }




    }
}
