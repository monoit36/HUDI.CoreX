using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace HUDI.CoreX.EntityFrameworkCore
{
    public static class CoreXDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<CoreXDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<CoreXDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
