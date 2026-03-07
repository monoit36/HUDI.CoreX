using Abp.Application.Services.Dto;

namespace HUDI.CoreX.MasterData.Dto
{
    public class PagedMasterDataDictionaryResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public string CategoryCode { get; set; }
        public bool? IsActive { get; set; }
    }
}
