using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using HUDI.CoreX.MasterData;

namespace HUDI.CoreX.MasterData.Dto
{
    [AutoMapFrom(typeof(MasterDataDictionary))]
    public class MasterDataDictionaryDto : EntityDto<int>
    {
        public string CategoryCode { get; set; }
        public string Code { get; set; }
        public string Value { get; set; }
        public string DisplayValue { get; set; }
        public int? ParentId { get; set; }
        public int SortOrder { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; }
    }
}
