using AutoMapper;
using HUDI.CoreX.MasterData;

namespace HUDI.CoreX.MasterData.Dto
{
    public class MasterDataDictionaryMapProfile : Profile
    {
        public MasterDataDictionaryMapProfile()
        {
            CreateMap<CreateMasterDataDictionaryDto, MasterDataDictionary>();
            CreateMap<UpdateMasterDataDictionaryDto, MasterDataDictionary>();
            CreateMap<MasterDataDictionary, MasterDataDictionaryDto>();
        }
    }
}
