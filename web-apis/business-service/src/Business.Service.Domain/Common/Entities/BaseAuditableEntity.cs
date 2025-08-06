using Business.Service.Domain.Common.Entities.Interfaces;
using Business.Service.Domain.Common.Enums;

namespace Business.Service.Domain.Common.Entities
{
    public class BaseAuditableEntity : IBaseAuditableEntity
    {
        public EnumActiveRecord IsActive { get ; set  ; }
        public required string CreatedBy { get ; set ; }
        public string? UpdatedBy { get ; set ; }
        public DateTime CreatedDate { get; set ; }
        public DateTime? UpdatedDate { get ; set ; }
    }
}
