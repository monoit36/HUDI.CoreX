using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HUDI.CoreX.Configuration;

namespace HUDI.CoreX.Web.Host.Startup
{
    [DependsOn(
       typeof(CoreXWebCoreModule))]
    public class CoreXWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public CoreXWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(CoreXWebHostModule).GetAssembly());
        }
    }
}
