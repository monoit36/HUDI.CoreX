using Abp.Application.Services.Dto;

namespace HUDI.CoreX.DemoProducts.Dto
{
    public class PagedDemoProductResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}
