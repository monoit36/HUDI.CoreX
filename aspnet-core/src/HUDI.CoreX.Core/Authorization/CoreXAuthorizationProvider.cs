using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace HUDI.CoreX.Authorization
{
    public class CoreXAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            var pages = context.CreatePermission(PermissionNames.Pages, L("Pages"));

            // Administration
            var admin = pages.CreateChildPermission(PermissionNames.Pages_Administration, L("Administration"));

            admin.CreateChildPermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

            var users = admin.CreateChildPermission(PermissionNames.Pages_Users, L("Users"));
            users.CreateChildPermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));

            admin.CreateChildPermission(PermissionNames.Pages_Roles, L("Roles"));

            var sites = admin.CreateChildPermission(PermissionNames.Pages_Sites, L("Sites"));
            sites.CreateChildPermission(PermissionNames.Pages_Sites_Create, L("CreateNewSite"));
            sites.CreateChildPermission(PermissionNames.Pages_Sites_Edit, L("EditSite"));
            sites.CreateChildPermission(PermissionNames.Pages_Sites_Delete, L("DeleteSite"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, CoreXConsts.LocalizationSourceName);
        }
    }
}
