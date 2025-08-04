using Auth.Service.Application.Auth.Commands.Register;
using Auth.Service.Application.Auth.Queries.Login;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Auth.Service.Application
{
    public static class ApplicationModule
    {
        public static IServiceCollection AddApplicationModule(
            this IServiceCollection services, 
            IConfiguration configuration)
        {
            services.AddScoped<ILoginQueryHandler, LoginQueryHandler>();
            services.AddScoped<IRegisterCommandHandler, RegisterCommandHandler>();

            return services;
        }
    }
}
