using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using HUDI.CoreX.Sites;

namespace HUDI.CoreX.Sites.Dto
{
    [AutoMapFrom(typeof(Site))]
    [AutoMapTo(typeof(Site))]
    public class SiteDto : EntityDto<int>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public bool IsActive { get; set; }
        public string SourceSystem { get; set; }
        public string ExternalId { get; set; }
    }
}
