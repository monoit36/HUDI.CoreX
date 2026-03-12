using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using HUDI.CoreX.Authorization.Roles;
using HUDI.CoreX.Authorization.Users;
using HUDI.CoreX.MultiTenancy;
using HUDI.CoreX.DemoProducts;
using HUDI.CoreX.Sites;

namespace HUDI.CoreX.EntityFrameworkCore
{
    public class CoreXDbContext : AbpZeroDbContext<Tenant, Role, User, CoreXDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<DemoProduct> DemoProducts { get; set; }
        public DbSet<Site> Sites { get; set; }

        public CoreXDbContext(DbContextOptions<CoreXDbContext> options)
            : base(options)
        {
        }
    }
}
