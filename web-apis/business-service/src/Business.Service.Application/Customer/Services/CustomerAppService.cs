using Business.Service.Application.Customer.Dtos;
using Business.Service.Domain.Common.Enums;
using Business.Service.Domain.Common.Interfaces;
using Business.Service.Domain.Common.Mappers;
using EntityCustomer = Business.Service.Domain.Customers.Entity.Customer;

namespace Business.Service.Application.Customer.Services
{
    public class CustomerAppService : ICustomerAppService
    {
        private readonly IUnitOfWorkAsync _unitOfWork;

        public CustomerAppService(IUnitOfWorkAsync customerRepository)
        {
            _unitOfWork = customerRepository;
        }

        public async Task<CustomerResponse> AddCustomerAsync(CustomerRequest request)
        {
            request.Id = Guid.NewGuid();
            var customerEntity = MapToCustomer(request, string.Empty);
            await _unitOfWork.CustomerRepository.InsertAsync(customerEntity);
            await _unitOfWork.SaveChangesAsync();
            return MapperExtension.MapTo< CustomerResponse >(customerEntity);
        }

        public async Task<IEnumerable<CustomerResponse>> GetAllCustomersAsync()
        {
            var customers = await _unitOfWork.CustomerRepository.GetAllAsync();
            return MapperExtension.MapTo<IEnumerable<CustomerResponse>>(customers.Where(x => x.IsActive == EnumActiveRecord.Yes));
        }

        public async Task<CustomerResponse?> GetCustomerByIdAsync(Guid id)
        {
            var customerEntity = await _unitOfWork.CustomerRepository.GetAsync(id);
            return MapperExtension.MapTo<CustomerResponse>(customerEntity);
        }

        public async Task<bool> EditCustomerAsync(Guid id, CustomerRequest request)
        {
            var existing = await _unitOfWork.CustomerRepository.GetAsync(id);
            if (existing == null)
                return false;

            existing.Name = request.Name;
            existing.Email = request.Email;
            existing.Phone = request.Phone;
            existing.Address = request.Address;
            existing.RUC = request.RUC;
            existing.UpdatedBy = string.Empty;
            existing.UpdatedDate = DateTime.UtcNow;

            await _unitOfWork.CustomerRepository.UpdateAsync(existing);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCustomerAsync(Guid id)
        {
            var existing = await _unitOfWork.CustomerRepository.GetAsync(id);
            if (existing == null)
                return false;

            existing.IsActive = EnumActiveRecord.No;
            existing.UpdatedDate = DateTime.UtcNow;

            await _unitOfWork.CustomerRepository.UpdateAsync(existing);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public static EntityCustomer MapToCustomer(CustomerRequest request, string createdBy)
        {
            return new EntityCustomer
            {
                Id = request.Id,
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Address = request.Address,
                RUC = request.RUC,
                IsActive = EnumActiveRecord.Yes, 
                CreatedBy = createdBy,
                CreatedDate = DateTime.UtcNow,
                UpdatedBy = null,
                UpdatedDate = null
            };
        }

    }
}
