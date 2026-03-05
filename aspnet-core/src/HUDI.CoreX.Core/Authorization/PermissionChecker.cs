using Abp.Authorization;
using HUDI.CoreX.Authorization.Roles;
using HUDI.CoreX.Authorization.Users;

namespace HUDI.CoreX.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
