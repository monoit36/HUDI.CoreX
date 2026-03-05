using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HUDI.CoreX.EntityFrameworkCore;
using HUDI.CoreX.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace HUDI.CoreX.Web.Tests
{
    [DependsOn(
        typeof(CoreXWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class CoreXWebTestModule : AbpModule
    {
        public CoreXWebTestModule(CoreXEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(CoreXWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(CoreXWebMvcModule).Assembly);
        }
    }
}