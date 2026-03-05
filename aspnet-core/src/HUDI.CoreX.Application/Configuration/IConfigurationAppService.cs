using System.Threading.Tasks;
using HUDI.CoreX.Configuration.Dto;

namespace HUDI.CoreX.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
