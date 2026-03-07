using Abp.Authorization;
using Abp.Localization;

namespace HUDI.CoreX.Authorization
{
    public class MasterAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            var pages = context.GetPermissionOrNull(PermissionNames.Pages)
                        ?? context.CreatePermission(PermissionNames.Pages, L("Pages"));

            // MasterData
            var masterData = pages.CreateChildPermission(MasterPermissionNames.Pages_MasterData, L("MasterData"));

            var dict = masterData.CreateChildPermission(MasterPermissionNames.Pages_MasterData_Dictionary, L("MasterDataDictionary"));
            dict.CreateChildPermission(MasterPermissionNames.Pages_MasterData_Dictionary_Create, L("Create"));
            dict.CreateChildPermission(MasterPermissionNames.Pages_MasterData_Dictionary_Edit, L("Edit"));
            dict.CreateChildPermission(MasterPermissionNames.Pages_MasterData_Dictionary_Delete, L("Delete"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, CoreXConsts.LocalizationSourceName);
        }
    }
}
