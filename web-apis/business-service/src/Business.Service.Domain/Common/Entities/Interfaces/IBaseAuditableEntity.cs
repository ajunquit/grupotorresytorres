using Business.Service.Domain.Common.Enums;

namespace Business.Service.Domain.Common.Entities.Interfaces
{
    public interface IBaseAuditableEntity
    {
        EnumActiveRecord IsActive { get; set; }
        string CreatedBy { get; set; }
        string? UpdatedBy { get; set; }
        DateTime CreatedDate { get; set; }
        DateTime? UpdatedDate { get; set; }
    }
}
