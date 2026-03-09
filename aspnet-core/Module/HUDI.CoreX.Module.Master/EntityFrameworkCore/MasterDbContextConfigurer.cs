using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace HUDI.CoreX.Module.Master.EntityFrameworkCore
{
    public static class MasterDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<MasterDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<MasterDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
