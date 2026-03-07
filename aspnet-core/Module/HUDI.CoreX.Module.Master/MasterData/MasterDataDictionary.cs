using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace HUDI.CoreX.MasterData
{
    [Table("MasterDataDictionaries")]
    public class MasterDataDictionary : FullAuditedEntity<int>
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

        public MasterDataDictionary()
        {
            IsActive = true;
            SortOrder = 0;
        }
    }
}
