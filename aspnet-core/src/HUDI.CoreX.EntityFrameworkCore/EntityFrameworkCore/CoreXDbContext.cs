using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using HUDI.CoreX.Authorization.Roles;
using HUDI.CoreX.Authorization.Users;
using HUDI.CoreX.MultiTenancy;

namespace HUDI.CoreX.EntityFrameworkCore
{
    public class CoreXDbContext : AbpZeroDbContext<Tenant, Role, User, CoreXDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public CoreXDbContext(DbContextOptions<CoreXDbContext> options)
            : base(options)
        {
        }
    }
}
