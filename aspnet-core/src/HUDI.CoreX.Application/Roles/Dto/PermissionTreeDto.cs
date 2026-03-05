using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using System.Collections.Generic;

namespace HUDI.CoreX.Roles.Dto;

[AutoMapFrom(typeof(Permission))]
public class PermissionTreeDto
{
    public string Name { get; set; }
    public string DisplayName { get; set; }
    public List<PermissionTreeDto> Children { get; set; } = new List<PermissionTreeDto>();
}

public class TreeResultDto<T>
{
    public List<T> Items { get; set; }

    public TreeResultDto(List<T> items)
    {
        Items = items;
    }
}
