FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/HUDI.CoreX.Web.Host/HUDI.CoreX.Web.Host.csproj", "src/HUDI.CoreX.Web.Host/"]
COPY ["src/HUDI.CoreX.Web.Core/HUDI.CoreX.Web.Core.csproj", "src/HUDI.CoreX.Web.Core/"]
COPY ["src/HUDI.CoreX.Application/HUDI.CoreX.Application.csproj", "src/HUDI.CoreX.Application/"]
COPY ["src/HUDI.CoreX.Core/HUDI.CoreX.Core.csproj", "src/HUDI.CoreX.Core/"]
COPY ["src/HUDI.CoreX.EntityFrameworkCore/HUDI.CoreX.EntityFrameworkCore.csproj", "src/HUDI.CoreX.EntityFrameworkCore/"]
WORKDIR "/src/src/HUDI.CoreX.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/HUDI.CoreX.Web.Host", "src/HUDI.CoreX.Web.Host"]
COPY ["src/HUDI.CoreX.Web.Core", "src/HUDI.CoreX.Web.Core"]
COPY ["src/HUDI.CoreX.Application", "src/HUDI.CoreX.Application"]
COPY ["src/HUDI.CoreX.Core", "src/HUDI.CoreX.Core"]
COPY ["src/HUDI.CoreX.EntityFrameworkCore", "src/HUDI.CoreX.EntityFrameworkCore"]
WORKDIR "/src/src/HUDI.CoreX.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "HUDI.CoreX.Web.Host.dll"]
