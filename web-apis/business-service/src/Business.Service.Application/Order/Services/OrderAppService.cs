using Business.Service.Domain.Common.Interfaces;

namespace Business.Service.Application.Order.Services
{
    public class OrderAppService(IUnitOfWorkAsync unitOfWorkAsync) : IOrderAppService
    {
        private readonly IUnitOfWorkAsync _unitOfWorkAsync = unitOfWorkAsync;
    }
}
