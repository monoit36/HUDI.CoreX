using AutoMapper;
using HUDI.CoreX.DemoProducts;
using HUDI.CoreX.DemoProducts.Dto;

namespace HUDI.CoreX.DemoProducts.Dto
{
    public class DemoProductMapProfile : Profile
    {
        public DemoProductMapProfile()
        {
            CreateMap<DemoProduct, DemoProductDto>();
            CreateMap<DemoProductDto, DemoProduct>();

            CreateMap<CreateDemoProductDto, DemoProduct>();
            CreateMap<UpdateDemoProductDto, DemoProduct>();
        }
    }
}
