using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using HUDI.CoreX.MasterData;

namespace HUDI.CoreX.Module.Master.EntityFrameworkCore
{
    public class MasterDbContext : AbpDbContext
    {
        public DbSet<MasterDataDictionary> MasterDataDictionaries { get; set; }

        public MasterDbContext(DbContextOptions<MasterDbContext> options)
            : base(options)
        {
        }
    }
}
