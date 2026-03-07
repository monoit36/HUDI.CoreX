using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HUDI.CoreX.MasterData.Dto;

namespace HUDI.CoreX.MasterData
{
    public interface IMasterDataDictionaryAppService : IAsyncCrudAppService<MasterDataDictionaryDto, int, PagedMasterDataDictionaryResultRequestDto, CreateMasterDataDictionaryDto, UpdateMasterDataDictionaryDto>
    {
    }
}
