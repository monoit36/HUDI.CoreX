using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using HUDI.CoreX.Configuration.Dto;

namespace HUDI.CoreX.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : CoreXAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
