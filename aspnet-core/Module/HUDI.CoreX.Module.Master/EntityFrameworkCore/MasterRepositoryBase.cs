using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore;
using Abp.EntityFrameworkCore.Repositories;

namespace HUDI.CoreX.Module.Master.EntityFrameworkCore
{
    public abstract class MasterRepositoryBase<TEntity, TPrimaryKey> : EfCoreRepositoryBase<MasterDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected MasterRepositoryBase(IDbContextProvider<MasterDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }
    }

    public abstract class MasterRepositoryBase<TEntity> : MasterRepositoryBase<TEntity, int>, IRepository<TEntity>
        where TEntity : class, IEntity<int>
    {
        protected MasterRepositoryBase(IDbContextProvider<MasterDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }
    }
}
