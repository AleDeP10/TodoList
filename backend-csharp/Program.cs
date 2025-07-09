using Microsoft.EntityFrameworkCore;
using TodoList.Models;

// 1. Set up the application builder
var builder = WebApplication.CreateBuilder(args);

// 2. Configure Kestrel to listen on HTTPS using either default or injected PORT
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.ConfigureKestrel(options =>
{
    if (!builder.Environment.IsProduction())
    {
        options.ListenAnyIP(int.Parse(port), listen =>
        {
            // Load the development certificate for HTTPS
            listen.UseHttps("https/aspnet-dev.pfx", "WebS3cur1ty2025!");
        });
    }
    else
    {
        options.ListenAnyIP(int.Parse(port)); // External HTTPS managed by Reverse
    }
});

// 3. Load appsettings files and environment variables
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();

// 4. Register the PostgreSQL database context using Entity Framework Core
var defaultConnection = Environment.GetEnvironmentVariable("DefaultConnection")
                     ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<TodoListContext>(options =>
    options.UseNpgsql(defaultConnection));

// 5. Register core ASP.NET services
builder.Services.AddControllers(options =>
{
    options.Conventions.Insert(0, new RoutePrefixConvention("api"));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

try
{
    var app = builder.Build();

    // 6. Enable Swagger UI in every environment (no data to protect in a portfolio project)
    app.UseSwagger();
    app.UseSwaggerUI();

    // 7. Configure the request handling pipeline
    app.UseRouting();

    // 8. Redirect HTTP requests to HTTPS (optional but encouraged)
    app.UseHttpsRedirection();

    // 9. Enable Cross-Origin Resource Sharing to allow frontend access
    app.UseCors(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());

    // 10. Enable authorization middleware (keep even without Identity/Auth)
    app.UseAuthorization();

    // 11. Map controller routes (e.g., /api/tasks)
    app.MapControllers();

    // 12. Start the application
    app.Logger.LogInformation($"🌐 HTTPS server listening on port {port}");
    app.Run();
}
catch (Exception ex)
{
    // Log any unexpected errors during startup
    Console.WriteLine("Error during application startup:");
    Console.WriteLine(ex.Message);
    throw;
}