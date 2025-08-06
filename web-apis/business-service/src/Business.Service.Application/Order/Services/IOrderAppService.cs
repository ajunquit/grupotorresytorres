using Business.Service.Application.Order.Dtos;

namespace Business.Service.Application.Order.Services
{
    public interface IOrderAppService
    {
        Task<OrderResponse> AddOrderAsync(OrderRequest request);
        Task<IEnumerable<OrderResponse>> GetAllOrdersAsync();
        Task<OrderResponse?> GetOrderByIdAsync(Guid id);
        Task<bool> EditOrderAsync(Guid id, OrderRequest request);
        Task<bool> DeleteOrderAsync(Guid id);
    }
}
