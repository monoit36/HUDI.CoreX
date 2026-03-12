using Abp.Application.Services;
using HUDI.CoreX.Sites.Dto;

namespace HUDI.CoreX.Sites
{
    public interface ISiteAppService : IAsyncCrudAppService<SiteDto, int, PagedSiteResultRequestDto, CreateSiteDto, UpdateSiteDto>
    {
    }
}
