using Business.Service.Infrastructure.Persistence.Contexts;
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
            return services;
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
