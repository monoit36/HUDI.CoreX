using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HUDI.CoreX.Authorization;

namespace HUDI.CoreX
{
    [DependsOn(
        typeof(CoreXCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class CoreXApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<CoreXAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(CoreXApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
