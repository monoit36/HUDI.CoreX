using System.ComponentModel.DataAnnotations;
using Abp.AutoMapper;
using HUDI.CoreX.DemoProducts;

namespace HUDI.CoreX.DemoProducts.Dto
{
    [AutoMapTo(typeof(DemoProduct))]
    public class CreateDemoProductDto
    {
       
        public string Code { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        [StringLength(256)]
        public string Category { get; set; }

        public int Quantity { get; set; }

        [StringLength(50)]
        public string InventoryStatus { get; set; }

        public int Rating { get; set; }

        [StringLength(512)]
        public string Image { get; set; }
    }
}
