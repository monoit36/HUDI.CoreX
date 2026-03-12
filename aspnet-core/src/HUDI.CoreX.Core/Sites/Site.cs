using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace HUDI.CoreX.Sites
{
    [Table("AbpSites")]
    public class Site : FullAuditedEntity<int>, IMayHaveTenant
    {
        public int? TenantId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Code { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Status { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        [MaxLength(100)]
        public string SourceSystem { get; set; }

        [MaxLength(100)]
        public string ExternalId { get; set; }
    }
}
