# ────────────────────────────────────────────────────────────────
# 💪 Stage 1: Build the application
# ────────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# ⬇️ Copy and restore project dependencies
COPY ToDoList.csproj ./
RUN dotnet restore

# 📆 Copy all source files and publish the app
COPY . ./
RUN dotnet publish ToDoList.csproj -c Release -o /app/publish

# ────────────────────────────────────────────────────────────────
# 🚀 Stage 2: Runtime image
# ────────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# 📅 Copy the published output from the build stage
COPY --from=build /app/publish .

# 🔐 Copy the HTTPS dev certificate into the container
COPY https/aspnet-dev.pfx /app/https/aspnet-dev.pfx

# 🌐 Expose the HTTPS port
EXPOSE 5000

# 🌟 Run the API directly (no entrypoint script)
CMD ["dotnet", "ToDoList.dll"]
