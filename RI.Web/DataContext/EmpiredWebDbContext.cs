using Microsoft.EntityFrameworkCore;
using RI.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RI.Web.DataContext
{
    public class EmpiredWebDbContext : DbContext
    {
        public EmpiredWebDbContext(DbContextOptions<EmpiredWebDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set;  }
    }
}
