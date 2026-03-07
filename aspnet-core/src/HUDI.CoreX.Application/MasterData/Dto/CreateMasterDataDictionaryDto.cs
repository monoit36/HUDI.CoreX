using System.ComponentModel.DataAnnotations;
using Abp.AutoMapper;
using HUDI.CoreX.MasterData;

namespace HUDI.CoreX.MasterData.Dto
{
    [AutoMapTo(typeof(MasterDataDictionary))]
    public class CreateMasterDataDictionaryDto
    {
        [Required]
        [StringLength(50)]
        public string CategoryCode { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; }

        [Required]
        [StringLength(255)]
        public string Value { get; set; }

        [StringLength(500)]
        public string DisplayValue { get; set; }

        public int? ParentId { get; set; }

        public int SortOrder { get; set; }

        public bool IsActive { get; set; }

        public string Description { get; set; }

        public CreateMasterDataDictionaryDto()
        {
            IsActive = true;
            SortOrder = 0;
        }
    }
}
