using Business.Service.Domain.Orders;
using Business.Service.Domain.Orders.Interfaces;

namespace Business.Service.Domain.Common.Interfaces
{
    public interface IUnitOfWorkAsync
    {
        ICustomerRepositoryAsync CustomerRepository { get; }
        IOrderRepositoryAsync OrderRepository { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
