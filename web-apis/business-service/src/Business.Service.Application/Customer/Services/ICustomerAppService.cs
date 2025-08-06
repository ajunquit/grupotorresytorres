using Business.Service.Application.Customer.Dtos;

namespace Business.Service.Application.Customer.Services
{
    public interface ICustomerAppService
    {
        Task<CustomerResponse> AddCustomerAsync(CustomerRequest request);
        Task<IEnumerable<CustomerResponse>> GetAllCustomersAsync();
        Task<CustomerResponse?> GetCustomerByIdAsync(Guid id);
        Task<bool> EditCustomerAsync(Guid id, CustomerRequest request);
        Task<bool> DeleteCustomerAsync(Guid id);
    }
}
