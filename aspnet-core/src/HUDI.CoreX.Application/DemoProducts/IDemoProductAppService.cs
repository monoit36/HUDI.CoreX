using Abp.Application.Services;
using HUDI.CoreX.DemoProducts.Dto;

namespace HUDI.CoreX.DemoProducts
{
    public interface IDemoProductAppService : IAsyncCrudAppService<DemoProductDto, int, PagedDemoProductResultRequestDto, CreateDemoProductDto, UpdateDemoProductDto>
    {
    }
}
