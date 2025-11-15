using Microsoft.EntityFrameworkCore;
using TodoList.Models;

// 1. Set up the application builder
var builder = WebApplication.CreateBuilder(args);

// 2. Configure Kestrel to listen on HTTP in Docker and HTTPS locally
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.ConfigureKestrel(options =>
{
    //var isDev = builder.Environment.IsDevelopment();
    //var useHttps = File.Exists("https/aspnet-dev.pfx");
    //if (isDev && useHttps)
    //{
    //    // Local development: enable HTTPS using dev certificate
    //    options.ListenAnyIP(int.Parse(port), listen =>
    //    {
    //        listen.UseHttps("https/aspnet-dev.pfx", "WebS3cur1ty2025!");
    //    });
    //}
    //else
    //{
        // Production or Docker: fallback to HTTP
        options.ListenAnyIP(int.Parse(port));
    //}
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

// 6. Register CORS policy explicitly
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
            "https://todolist-fe-nextjs.onrender.com",
            "https://todolist-fe-angularjs.onrender.com",
            "http://localhost", "https://localhost",
            "http://localhost:3001",
            "http://localhost:4200",
            "http://localhost:4201"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

try
{
    var app = builder.Build();

    // 7. Enable Swagger UI in every environment (no data to protect in a portfolio project)
    app.UseSwagger();
    app.UseSwaggerUI();

    // 8. Configure the request handling pipeline
    app.UseRouting();

    // 9. Redirect HTTP requests to HTTPS (optional but encouraged)
    if (app.Environment.IsDevelopment())
    {
        app.UseHttpsRedirection();
    }

    // 10. Enable Cross-Origin Resource Sharing to allow frontend access
    app.UseCors(); // ✅ uses the default policy registered above

    // 11. Enable authorization middleware (keep even without Identity/Auth)
    app.UseAuthorization();

    // 12. Map controller routes (e.g., /api/Task)
    app.MapControllers();

    // 13. Serve static homepage with link to Swagger
    app.UseDefaultFiles(); // Enables default file mapping (e.g., index.html)
    app.UseStaticFiles();  // Serves files from wwwroot 

    // 14. Start the application
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
