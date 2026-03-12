using Abp.Application.Services.Dto;

namespace HUDI.CoreX.Sites.Dto
{
    public class PagedSiteResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}
