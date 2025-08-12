using Business.Service.Application.Dashboard.Dtos;
using Business.Service.Domain.Common.Enums;
using Business.Service.Domain.Common.Interfaces;
using Business.Service.Domain.Orders.Enums;

namespace Business.Service.Application.Dashboard.Services.Impl
{
    public class CounterAppService: ICounterAppService
    {
        private readonly IUnitOfWorkAsync _unitOfWork;

        public CounterAppService(IUnitOfWorkAsync customerRepository)
        {
            _unitOfWork = customerRepository;
        }

        public async Task<CounterResponse> GetCountersAsync()
        {
            var clients = await _unitOfWork.CustomerRepository.GetAllAsync();
            var orders = await _unitOfWork.OrderRepository.GetAllAsync();

            var yes = EnumActiveRecord.Yes;

            int totalClients = 0, totalOrders = 0, completed = 0, pending = 0;

            foreach (var c in clients)
                if (c.IsActive == yes) totalClients++;

            foreach (var o in orders)
            {
                if (o.IsActive != yes) continue;
                totalOrders++;
                if (o.Status == EnumOrderStatus.Completado) completed++;
                else if (o.Status == EnumOrderStatus.Pendiente) pending++;
            }

            return CreateCounterResponse(totalClients, totalOrders, completed, pending);
        }

        private static CounterResponse CreateCounterResponse(int totalClients, int totalOrders, int completed, int pending)
        {
            return new CounterResponse
            {
                TotalClients = totalClients,
                TotalOrders = totalOrders,
                CompletedOrders = completed,
                PendingOrders = pending
            };
        }
    }
}
