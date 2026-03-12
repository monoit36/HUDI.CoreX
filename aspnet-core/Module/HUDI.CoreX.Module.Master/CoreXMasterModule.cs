using Abp.AutoMapper;
using Abp.Domain.Uow;
using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HUDI.CoreX.Authorization;
using HUDI.CoreX.Module.Master;
using HUDI.CoreX.Module.Master.EntityFrameworkCore;

namespace HUDI.CoreX
{
    [DependsOn(
        typeof(CoreXCoreModule),
        typeof(AbpAutoMapperModule))]
    public class CoreXMasterModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<MasterAuthorizationProvider>();

            IocManager.Register<IConnectionStringResolver, MasterConnectionStringResolver>();

            Configuration.Modules.AbpEfCore().AddDbContext<MasterDbContext>(options =>
            {
                if (options.ExistingConnection != null)
                {
                    MasterDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                }
                else
                {
                    MasterDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                }
            });
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(CoreXMasterModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
