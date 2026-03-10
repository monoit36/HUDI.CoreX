# ============================================================
# Stage 1 – Restore (cache NuGet packages layer)
# ============================================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS restore

WORKDIR /src

# Copy only project files first to leverage Docker layer caching
COPY ["src/HUDI.CoreX.Web.Host/HUDI.CoreX.Web.Host.csproj",         "src/HUDI.CoreX.Web.Host/"]
COPY ["src/HUDI.CoreX.Web.Core/HUDI.CoreX.Web.Core.csproj",         "src/HUDI.CoreX.Web.Core/"]
COPY ["src/HUDI.CoreX.Application/HUDI.CoreX.Application.csproj",   "src/HUDI.CoreX.Application/"]
COPY ["src/HUDI.CoreX.Core/HUDI.CoreX.Core.csproj",                 "src/HUDI.CoreX.Core/"]
COPY ["src/HUDI.CoreX.EntityFrameworkCore/HUDI.CoreX.EntityFrameworkCore.csproj", \
                                                                     "src/HUDI.CoreX.EntityFrameworkCore/"]
COPY ["Module/HUDI.CoreX.Module.Master/HUDI.CoreX.Module.Master.csproj", \
                                                                     "Module/HUDI.CoreX.Module.Master/"]

RUN dotnet restore "src/HUDI.CoreX.Web.Host/HUDI.CoreX.Web.Host.csproj"

# ============================================================
# Stage 2 – Build & Publish
# ============================================================
FROM restore AS publish

# Copy all source files
COPY src/      src/
COPY Module/   Module/

RUN dotnet publish "src/HUDI.CoreX.Web.Host/HUDI.CoreX.Web.Host.csproj" \
    -c Release \
    -o /app/publish \
    --no-restore

# ============================================================
# Stage 3 – Runtime image (lean, no SDK)
# ============================================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

# Install cultures / timezone data
RUN apt-get update && apt-get install -y --no-install-recommends \
        tzdata \
    && rm -rf /var/lib/apt/lists/*

ENV TZ=Asia/Ho_Chi_Minh \
    ASPNETCORE_URLS=http://+:80 \
    DOTNET_RUNNING_IN_CONTAINER=true

WORKDIR /app

COPY --from=publish /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "HUDI.CoreX.Web.Host.dll"]
