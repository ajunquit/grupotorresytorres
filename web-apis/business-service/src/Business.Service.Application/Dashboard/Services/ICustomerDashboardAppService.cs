using Business.Service.Application.Dashboard.Dtos;

namespace Business.Service.Application.Dashboard.Services
{
    public interface ICustomerDashboardAppService
    {
        Task<ChartPropertiesResponse> GetNewClientsByLastMonthAsync(int lastMonths);
    }
}
