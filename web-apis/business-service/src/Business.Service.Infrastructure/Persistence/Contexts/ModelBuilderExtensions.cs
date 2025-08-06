using Business.Service.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Business.Service.Infrastructure.Persistence.Contexts
{
    public static class ModelBuilderExtensions
    {
        public static void ApplyEntityConfigurations(this ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
        }

    }
}
