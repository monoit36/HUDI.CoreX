using HUDI.CoreX.Configuration;
using HUDI.CoreX.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace HUDI.CoreX.Module.Master.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class MasterDbContextFactory : IDesignTimeDbContextFactory<MasterDbContext>
    {
        public MasterDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MasterDbContext>();

            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());
            // Use the Master connection string for design-time migrations
            MasterDbContextConfigurer.Configure(builder,
               configuration.GetConnectionString(MasterConsts.ConnectionStringName));

            return new MasterDbContext(builder.Options);
        }
    }
}
