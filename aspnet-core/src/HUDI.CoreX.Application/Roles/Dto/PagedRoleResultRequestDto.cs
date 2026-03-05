using Abp.Application.Services.Dto;

namespace HUDI.CoreX.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

