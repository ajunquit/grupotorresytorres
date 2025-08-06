using Business.Service.Domain.Common.Interfaces;
using Business.Service.Domain.Orders;
using Business.Service.Infrastructure.Persistence.Contexts;

namespace Business.Service.Infrastructure.Repositories
{
    public class UnitOfWorkAsync(
        ICustomerRepositoryAsync customerRepository,
        IOrderRepositoryAsync orderRepository,
        BusinessDbContext dbContext) : IUnitOfWorkAsync, IDisposable
    {
        private readonly BusinessDbContext _dbContext = dbContext;

        public ICustomerRepositoryAsync CustomerRepository { get; } = customerRepository;

        public IOrderRepositoryAsync OrderRepository { get; } = orderRepository;

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _dbContext.SaveChangesAsync(cancellationToken);
        }

        public void Dispose()
        {
            _dbContext?.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
