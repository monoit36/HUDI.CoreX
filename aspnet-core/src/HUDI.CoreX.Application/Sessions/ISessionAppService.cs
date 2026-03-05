using System.Threading.Tasks;
using Abp.Application.Services;
using HUDI.CoreX.Sessions.Dto;

namespace HUDI.CoreX.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
