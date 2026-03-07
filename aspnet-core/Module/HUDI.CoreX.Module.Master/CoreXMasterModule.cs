using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HUDI.CoreX.Authorization;

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
