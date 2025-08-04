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

            return services;
        }
    }
}
