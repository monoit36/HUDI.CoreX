using System.Linq;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using HUDI.CoreX.DemoProducts.Dto;
using Abp.Extensions;
using Abp.Linq.Extensions;

namespace HUDI.CoreX.DemoProducts
{
    public class DemoProductAppService : AsyncCrudAppService<DemoProduct, DemoProductDto, int, PagedDemoProductResultRequestDto, CreateDemoProductDto, UpdateDemoProductDto>, IDemoProductAppService
    {
        public DemoProductAppService(IRepository<DemoProduct, int> repository)
            : base(repository)
        {
        }

        protected override IQueryable<DemoProduct> CreateFilteredQuery(PagedDemoProductResultRequestDto input)
        {
            return base.CreateFilteredQuery(input)
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword) || x.Code.Contains(input.Keyword) || x.Description.Contains(input.Keyword));
        }
    }
}
