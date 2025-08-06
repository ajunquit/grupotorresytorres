using Business.Service.Domain.Customers.Interfaces;
using CustomerEntity = Business.Service.Domain.Customers.Entity.Customer;

namespace Business.Service.Application.Customer.Services
{
    public class CustomerAppService : ICustomerAppService
    {
        private readonly ICustomerRepositoryAsync _customerRepository;

        public CustomerAppService(ICustomerRepositoryAsync customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<CustomerEntity> AddCustomerAsync(CustomerEntity customer)
        {
            customer.Id = Guid.NewGuid();
            await _customerRepository.InsertAsync(customer);
            return customer;
        }

        public async Task<IEnumerable<CustomerEntity>> GetAllCustomersAsync()
        {
            return await _customerRepository.GetAllAsync();
        }

        public async Task<CustomerEntity?> GetCustomerByIdAsync(Guid id)
        {
            return await _customerRepository.GetAsync(id);
        }

        public async Task<bool> EditCustomerAsync(Guid id, CustomerEntity customer)
        {
            var existing = await _customerRepository.GetAsync(id);
            if (existing == null)
                return false;

            existing.Name = customer.Name;
            existing.Email = customer.Email;
            existing.Phone = customer.Phone;
            existing.Address = customer.Address;
            existing.RUC = customer.RUC;

            await _customerRepository.UpdateAsync(existing);
            return true;
        }

        public async Task<bool> DeleteCustomerAsync(Guid id)
        {
            var existing = await _customerRepository.GetAsync(id);
            if (existing == null)
                return false;

            await _customerRepository.DeleteAsync(existing.Id);
            return true;
        }
    }
}
