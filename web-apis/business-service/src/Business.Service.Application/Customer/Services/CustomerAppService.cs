using Business.Service.Application.Customer.Dtos;
using Business.Service.Domain.Common.Mappers;
using Business.Service.Domain.Customers.Interfaces;
using EntityCustomer = Business.Service.Domain.Customers.Entity.Customer;

namespace Business.Service.Application.Customer.Services
{
    public class CustomerAppService : ICustomerAppService
    {
        private readonly ICustomerRepositoryAsync _customerRepository;

        public CustomerAppService(ICustomerRepositoryAsync customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<CustomerResponse> AddCustomerAsync(CustomerRequest request)
        {
            request.Id = Guid.NewGuid();
            var customerEntity = MapperExtension.MapTo<EntityCustomer>(request);
            await _customerRepository.InsertAsync(customerEntity);
            return MapperExtension.MapTo< CustomerResponse >(customerEntity);
        }

        public async Task<IEnumerable<CustomerResponse>> GetAllCustomersAsync()
        {
            var customers = await _customerRepository.GetAllAsync();
            return MapperExtension.MapTo<IEnumerable<CustomerResponse>>(customers);
        }

        public async Task<CustomerResponse?> GetCustomerByIdAsync(Guid id)
        {
            var customerEntity = await _customerRepository.GetAsync(id);
            return MapperExtension.MapTo<CustomerResponse>(customerEntity);
        }

        public async Task<bool> EditCustomerAsync(Guid id, CustomerRequest request)
        {
            var existing = await _customerRepository.GetAsync(id);
            if (existing == null)
                return false;

            existing.Name = request.Name;
            existing.Email = request.Email;
            existing.Phone = request.Phone;
            existing.Address = request.Address;
            existing.RUC = request.RUC;

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
