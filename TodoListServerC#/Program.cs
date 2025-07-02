using Microsoft.EntityFrameworkCore;
using TodoList.Models;

Console.WriteLine("INIZIO Program.cs");

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Services.AddDbContext<TodoListContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
try
{
    var app = builder.Build();
    Console.WriteLine("build");
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    Console.WriteLine("swagger");
    app.UseRouting();
    Console.WriteLine("routing");
    app.UseHttpsRedirection();
    Console.WriteLine("httpsRedirection");
    app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod());
    Console.WriteLine("cors");
    app.UseAuthorization();
    Console.WriteLine("authorization");
    app.MapControllers();
    Console.WriteLine("mapControllers");
    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine("Errore durante l'avvio dell'app:");
    Console.WriteLine(ex.Message);
    throw;
}