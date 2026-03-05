using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace HUDI.CoreX.Controllers
{
    public abstract class CoreXControllerBase: AbpController
    {
        protected CoreXControllerBase()
        {
            LocalizationSourceName = CoreXConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
