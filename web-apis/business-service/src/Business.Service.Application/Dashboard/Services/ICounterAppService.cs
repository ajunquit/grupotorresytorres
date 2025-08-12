using Business.Service.Application.Dashboard.Dtos;

namespace Business.Service.Application.Dashboard.Services
{
    public interface ICounterAppService
    {
        Task<CounterResponse> GetCountersAsync();
    }
}
