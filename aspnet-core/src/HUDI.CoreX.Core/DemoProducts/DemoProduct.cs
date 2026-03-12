using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace HUDI.CoreX.DemoProducts
{
    [Table("AppDemoProducts")]
    public class DemoProduct : FullAuditedEntity<int>
    {
        
        public string Code { get; set; }

        [Required]
        [MaxLength(256)]
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string Category { get; set; }

        public int Quantity { get; set; }

        public string InventoryStatus { get; set; }

        public int Rating { get; set; }

        public string Image { get; set; }
    }
}
