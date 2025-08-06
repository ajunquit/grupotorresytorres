using Business.Service.Domain.Orders.Entity;
using Business.Service.Domain.Orders.Interfaces;
using Business.Service.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Business.Service.Infrastructure.Repositories
{
    public class OrderRepositoryAsync(BusinessDbContext dbContext) : RepositoryAsync<Order>(dbContext), IOrderRepositoryAsync
    {
        private readonly BusinessDbContext _dbContext = dbContext;

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _dbContext.Orders
                .Include(x => x.Customer)
                .Where(x => x.IsActive == Domain.Common.Enums.EnumActiveRecord.Yes)
                .ToListAsync();
        }
    }
}
