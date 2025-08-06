using Business.Service.Application.Customer.Services;
using Business.Service.Application.Order.Services;
using Business.Service.Application.OrderEntity.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Service.Application
{
    public static class ApplicationModule
    {
        public static IServiceCollection AddApplicationModule(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddScoped<ICustomerAppService, CustomerAppService>();
            services.AddScoped<IOrderAppService, OrderAppService>();
            return services;
        }
    }
}
