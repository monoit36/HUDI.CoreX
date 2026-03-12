using Abp.Configuration.Startup;
using Abp.Domain.Uow;
using HUDI.CoreX.Configuration;
using HUDI.CoreX.Module.Master.EntityFrameworkCore;
using HUDI.CoreX.Web;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace HUDI.CoreX.Module.Master
{
    public class MasterConnectionStringResolver : DefaultConnectionStringResolver
    {
        private readonly IConfiguration _appConfiguration;

        public MasterConnectionStringResolver(
            IAbpStartupConfiguration configuration,
            IConfiguration appConfiguration)
            : base(configuration)
        {
            _appConfiguration = appConfiguration;
        }

        public override string GetNameOrConnectionString(ConnectionStringResolveArgs args)
        {
            if (args["DbContextConcreteType"] is System.Type dbContextType &&
                dbContextType == typeof(MasterDbContext))
            {
                return _appConfiguration.GetConnectionString(MasterConsts.ConnectionStringName) 
                       ?? _appConfiguration[MasterConsts.ConnectionStringName];
            }

            return base.GetNameOrConnectionString(args);
        }
    }
}
