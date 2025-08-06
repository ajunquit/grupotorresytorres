using Business.Service.Domain.Customers.Entity;
using Business.Service.Domain.Customers.Interfaces;
using Business.Service.Infrastructure.Persistence.Contexts;

namespace Business.Service.Infrastructure.Repositories
{
    public class CustomerRepositoryAsync(BusinessDbContext dbContext) : RepositoryAsync<Customer>(dbContext), ICustomerRepositoryAsync
    {
    }
}
