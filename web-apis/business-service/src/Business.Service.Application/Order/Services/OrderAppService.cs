using Business.Service.Application.Order.Dtos;
using Business.Service.Application.Order.Services;
using Business.Service.Domain.Common.Enums;
using Business.Service.Domain.Common.Interfaces;
using Business.Service.Domain.Common.Mappers;
using EntityOrder = Business.Service.Domain.Orders.Entity.Order;
using EntityCustomer = Business.Service.Domain.Customers.Entity.Customer;

namespace Business.Service.Application.OrderEntity.Services
{
    public class OrderAppService(IUnitOfWorkAsync unitOfWorkAsync) : IOrderAppService
    {
        private readonly IUnitOfWorkAsync _unitOfWorkAsync = unitOfWorkAsync;

        public async Task<OrderResponse> AddOrderAsync(OrderRequest request)
        {
            request.Id = Guid.NewGuid();
            var order = MapperExtension.MapTo<EntityOrder>(request); 
            var result = await _unitOfWorkAsync.OrderRepository.InsertAsync(order);
            return MapperExtension.MapTo<OrderResponse>(request);
        }

        public async Task<IEnumerable<OrderResponse>> GetAllOrdersAsync()
        {
            var orders = await _unitOfWorkAsync.OrderRepository.GetAllAsync();
            return MapperExtension.MapTo<IEnumerable<OrderResponse>>(orders.Where(x => x.IsActive == EnumActiveRecord.Yes));
        }

        public async Task<OrderResponse?> GetOrderByIdAsync(Guid id)
        {
            var order = await _unitOfWorkAsync.OrderRepository.GetAsync(id);
            return MapperExtension.MapTo<OrderResponse>(order);
        }

        public async Task<bool> EditOrderAsync(Guid id, OrderRequest request)
        {
            var existing = await _unitOfWorkAsync.OrderRepository.GetAsync(id);
            if (existing == null)
                return false;

            existing.CustomerId = request.CustomerId;
            existing.OrderDate = request.OrderDate;
            existing.Status = request.Status;
            existing.TotalAmount = request.TotalAmount;
            existing.UpdatedDate = DateTime.UtcNow;
            existing.UpdatedBy = string.Empty;

            await _unitOfWorkAsync.OrderRepository.UpdateAsync(existing);
            return true;
        }

        public async Task<bool> DeleteOrderAsync(Guid id)
        {
            var existing = await _unitOfWorkAsync.OrderRepository.GetAsync(id);
            if (existing == null)
                return false;

            existing.IsActive = EnumActiveRecord.No;
            existing.UpdatedDate = DateTime.UtcNow;

            await _unitOfWorkAsync.OrderRepository.UpdateAsync(existing); // delete logic marks as inactive
            return true;
        }

        public static EntityOrder MapToOrder(OrderRequest request, string createdBy)
        {
            return new EntityOrder
            {
                Id = request.Id,
                OrderNumber = request.OrderNumber,
                CustomerId = request.CustomerId,
                CustomerName = request.CustomerName,
                OrderDate = request.OrderDate,
                DeliveryDate = request.DeliveryDate,
                TotalAmount = request.TotalAmount,
                Status = request.Status,
                Notes = request.Notes,
                IsActive = EnumActiveRecord.Yes,
                CreatedBy = createdBy,
                CreatedDate = DateTime.UtcNow,
                UpdatedBy = null,
                UpdatedDate = null
            };
        }

    }
}
