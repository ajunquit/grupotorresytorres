using Business.Service.Domain.Common.Interfaces;
using Business.Service.Domain.Customers.Interfaces;
using Business.Service.Domain.Orders.Interfaces;
using Business.Service.Infrastructure.Persistence.Contexts;
using Business.Service.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Service.Infrastructure
{
    public static class InfrastructureModule
    {
        public static IServiceCollection AddInfrastructureModule(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            RegisterDbContexts(services, configuration);
            RegisterRepositories(services);
            return services;
        }

        private static void RegisterRepositories(IServiceCollection services)
        {
            services.AddScoped<IUnitOfWorkAsync, UnitOfWorkAsync>();
            services.AddScoped<ICustomerRepositoryAsync, CustomerRepositoryAsync>();
            services.AddScoped<IOrderRepositoryAsync, OrderRepositoryAsync>();
        }

        private static void RegisterDbContexts(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<IBusinessDbContext, BusinessDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("Local"),
                    sqlOptions =>
                        sqlOptions.MigrationsAssembly(typeof(BusinessDbContext).Assembly.FullName)
                )
            );
        }
    }
}
