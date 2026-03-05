using Abp.Application.Services;
using HUDI.CoreX.MultiTenancy.Dto;

namespace HUDI.CoreX.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

