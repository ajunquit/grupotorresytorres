using Business.Service.Domain.Common.Entities;
using Business.Service.Domain.Common.Entities.Interfaces;
using Business.Service.Domain.Customers.Entity;
using Business.Service.Domain.Orders.Enums;

namespace Business.Service.Domain.Orders.Entity
{
    public class Order : BaseAuditableEntity, IBaseEntity
    {
        public Guid Id { get ; set ; }
        public required string OrderNumber { get; set; }
        public Customer Customer { get; set; } = null!;
        public required Guid CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public required DateTime OrderDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public required decimal TotalAmount { get; set; }
        public EnumOrderStatus Status { get; set; }
        public string? Notes { get; set; }
    }
}
