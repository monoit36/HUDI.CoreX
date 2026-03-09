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
        public MasterConnectionStringResolver(IAbpStartupConfiguration configuration)
            : base(configuration)
        {
        }

        public override string GetNameOrConnectionString(ConnectionStringResolveArgs args)
        {

            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());
            if (args["DbContextConcreteType"] is System.Type dbContextType &&
                dbContextType == typeof(MasterDbContext))
            {
                return configuration.GetConnectionString(MasterConsts.ConnectionStringName);
            }

            return base.GetNameOrConnectionString(args);
        }
    }
}
