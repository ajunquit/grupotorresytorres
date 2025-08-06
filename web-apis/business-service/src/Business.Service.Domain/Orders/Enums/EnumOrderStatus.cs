namespace Business.Service.Domain.Orders.Enums
{
    public enum EnumOrderStatus
    {
        Pendiente = 1,
        Completado = 2,
        Cancelado = 3
    }
    //public static string GetDescription(OrderStatus status)
    //{
    //    return status switch
    //    {
    //        OrderStatus.Pending => "Order is pending",
    //        OrderStatus.Completed => "Order has been delivered",
    //        OrderStatus.Cancelled => "Order has been cancelled",
    //        _ => "Unknown status"
    //    };
    //}
}
