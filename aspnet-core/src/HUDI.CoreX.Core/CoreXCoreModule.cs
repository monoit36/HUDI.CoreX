using Abp.Localization;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Runtime.Security;
using Abp.Timing;
using Abp.Zero;
using Abp.Zero.Configuration;
using HUDI.CoreX.Authorization.Roles;
using HUDI.CoreX.Authorization.Users;
using HUDI.CoreX.Configuration;
using HUDI.CoreX.Localization;
using HUDI.CoreX.MultiTenancy;
using HUDI.CoreX.Timing;

namespace HUDI.CoreX
{
    [DependsOn(typeof(AbpZeroCoreModule))]
    public class CoreXCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            // Declare entity types
            Configuration.Modules.Zero().EntityTypes.Tenant = typeof(Tenant);
            Configuration.Modules.Zero().EntityTypes.Role = typeof(Role);
            Configuration.Modules.Zero().EntityTypes.User = typeof(User);

            CoreXLocalizationConfigurer.Configure(Configuration.Localization);

            // Enable this line to create a multi-tenant application.
            Configuration.MultiTenancy.IsEnabled = CoreXConsts.MultiTenancyEnabled;

            // Configure roles
            AppRoleConfig.Configure(Configuration.Modules.Zero().RoleManagement);

            Configuration.Settings.Providers.Add<AppSettingProvider>();
            
            Configuration.Localization.Languages.Add(new LanguageInfo("fa", "فارسی", "famfamfam-flags ir"));
            Configuration.Localization.Languages.Add(new LanguageInfo("vi", "Tiếng Việt", "famfamfam-flags vn"));
            
            Configuration.Settings.SettingEncryptionConfiguration.DefaultPassPhrase = CoreXConsts.DefaultPassPhrase;
            SimpleStringCipher.DefaultPassPhrase = CoreXConsts.DefaultPassPhrase;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(CoreXCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IocManager.Resolve<AppTimes>().StartupTime = Clock.Now;
        }
    }
}
