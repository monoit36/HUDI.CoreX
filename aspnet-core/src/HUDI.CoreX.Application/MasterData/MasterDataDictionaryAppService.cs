using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using HUDI.CoreX.Authorization;
using HUDI.CoreX.MasterData.Dto;

namespace HUDI.CoreX.MasterData
{
    [AbpAuthorize(PermissionNames.Pages_MasterData)]
    public class MasterDataDictionaryAppService
        : AsyncCrudAppService<MasterDataDictionary, MasterDataDictionaryDto, int, PagedMasterDataDictionaryResultRequestDto, CreateMasterDataDictionaryDto, UpdateMasterDataDictionaryDto>,
          IMasterDataDictionaryAppService
    {
        public MasterDataDictionaryAppService(IRepository<MasterDataDictionary, int> repository)
            : base(repository)
        {
        }

        protected override IQueryable<MasterDataDictionary> CreateFilteredQuery(PagedMasterDataDictionaryResultRequestDto input)
        {
            return Repository.GetAll()
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(),
                    x => x.Code.Contains(input.Keyword)
                      || x.Value.Contains(input.Keyword)
                      || x.CategoryCode.Contains(input.Keyword)
                      || x.Description.Contains(input.Keyword))
                .WhereIf(!input.CategoryCode.IsNullOrWhiteSpace(),
                    x => x.CategoryCode == input.CategoryCode)
                .WhereIf(input.IsActive.HasValue,
                    x => x.IsActive == input.IsActive.Value);
        }

        protected override IQueryable<MasterDataDictionary> ApplySorting(IQueryable<MasterDataDictionary> query, PagedMasterDataDictionaryResultRequestDto input)
        {
            return query.OrderBy(x => x.CategoryCode).ThenBy(x => x.SortOrder).ThenBy(x => x.Code);
        }
    }
}
