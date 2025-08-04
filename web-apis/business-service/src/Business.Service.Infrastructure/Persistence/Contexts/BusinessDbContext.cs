using Business.Service.Domain.Customers.Entity;
using Business.Service.Domain.Orders.Entity;
using Microsoft.EntityFrameworkCore;

namespace Business.Service.Infrastructure.Persistence.Contexts
{
    public class BusinessDbContext : DbContext, IBusinessDbContext
    {
        DbSet<Order> Orders { get; set; }
        DbSet<Customer> Customers { get; set; }
        public BusinessDbContext(DbContextOptions<BusinessDbContext> options) : base(options)
        {
        }
    }
}
