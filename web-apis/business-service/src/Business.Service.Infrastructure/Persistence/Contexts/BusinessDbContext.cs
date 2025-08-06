using Business.Service.Domain.Customers.Entity;
using Business.Service.Domain.Orders.Entity;
using Microsoft.EntityFrameworkCore;

namespace Business.Service.Infrastructure.Persistence.Contexts
{
    public class BusinessDbContext : DbContext, IBusinessDbContext
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public BusinessDbContext(DbContextOptions<BusinessDbContext> options) : base(options)
        {
        }
    }
}
