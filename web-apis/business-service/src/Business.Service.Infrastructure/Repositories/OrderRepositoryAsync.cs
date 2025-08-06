using Business.Service.Domain.Orders.Entity;
using Business.Service.Domain.Orders.Interfaces;
using Business.Service.Infrastructure.Persistence.Contexts;

namespace Business.Service.Infrastructure.Repositories
{
    public class OrderRepositoryAsync(BusinessDbContext dbContext) : RepositoryAsync<Order>(dbContext), IOrderRepositoryAsync
    {
    }
}
