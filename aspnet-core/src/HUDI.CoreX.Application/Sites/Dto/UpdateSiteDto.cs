using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using HUDI.CoreX.Sites;

namespace HUDI.CoreX.Sites.Dto
{
    [AutoMapTo(typeof(Site))]
    public class UpdateSiteDto : EntityDto<int>
    {
        [Required]
        [MaxLength(50)]
        public string Code { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Status { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [MaxLength(100)]
        public string SourceSystem { get; set; }

        [MaxLength(100)]
        public string ExternalId { get; set; }
    }
}
