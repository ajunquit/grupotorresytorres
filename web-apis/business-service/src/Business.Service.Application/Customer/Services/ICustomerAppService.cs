using CustomerEntity = Business.Service.Domain.Customers.Entity.Customer;
namespace Business.Service.Application.Customer.Services
{
    public interface ICustomerAppService
    {
        Task<CustomerEntity> AddCustomerAsync(CustomerEntity customer);
        Task<IEnumerable<CustomerEntity>> GetAllCustomersAsync();
        Task<CustomerEntity?> GetCustomerByIdAsync(Guid id);
        Task<bool> EditCustomerAsync(Guid id, CustomerEntity customer);
        Task<bool> DeleteCustomerAsync(Guid id);
    }
}
