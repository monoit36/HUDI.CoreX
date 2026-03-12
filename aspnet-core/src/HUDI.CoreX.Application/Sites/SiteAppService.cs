using System.Linq;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using HUDI.CoreX.Sites.Dto;
using Abp.Extensions;
using Abp.Linq.Extensions;

using Abp.Authorization;
using HUDI.CoreX.Authorization;

namespace HUDI.CoreX.Sites
{
    [AbpAuthorize(PermissionNames.Pages_Sites)]
    public class SiteAppService : AsyncCrudAppService<Site, SiteDto, int, PagedSiteResultRequestDto, CreateSiteDto, UpdateSiteDto>, ISiteAppService
    {
        public SiteAppService(IRepository<Site, int> repository)
            : base(repository)
        {
            CreatePermissionName = PermissionNames.Pages_Sites_Create;
            UpdatePermissionName = PermissionNames.Pages_Sites_Edit;
            DeletePermissionName = PermissionNames.Pages_Sites_Delete;
            GetAllPermissionName = PermissionNames.Pages_Sites;
        }

        protected override IQueryable<Site> CreateFilteredQuery(PagedSiteResultRequestDto input)
        {
            return base.CreateFilteredQuery(input)
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword) || x.Code.Contains(input.Keyword))
                .WhereIf(input.IsActive.HasValue, x => x.IsActive == input.IsActive.Value);
        }
    }
}
