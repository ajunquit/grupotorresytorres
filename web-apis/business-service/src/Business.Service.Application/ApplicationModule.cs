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
            
            return services;
        }
    }
}
