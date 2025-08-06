using Business.Service.Domain.Common.Interfaces;
using Business.Service.Domain.Orders.Entity;

namespace Business.Service.Domain.Orders.Interfaces
{
    public interface IOrderRepositoryAsync: IRepositoryAsync<Order>
    {
    }
}
