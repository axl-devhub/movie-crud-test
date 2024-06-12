using System.Composition.Hosting.Core;
using Microsoft.EntityFrameworkCore;
using MovieApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
var configuration = builder.Configuration;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddDbContext<MovieContext>(options =>
    options.UseMySql(configuration.GetConnectionString("DefaultConnection"),
    ServerVersion.AutoDetect(configuration.GetConnectionString("DefaultConnection"))),
    contextLifetime: ServiceLifetime.Transient,
    optionsLifetime: ServiceLifetime.Transient
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:5173", "http://localhost:5174") // Specify allowed origins
               .AllowAnyMethod() // Allow all HTTP methods
               .AllowAnyHeader(); // Allow all headers
    });
});


    
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.UseStaticFiles();

app.UseCors("MyCorsPolicy");

app.MapControllers();

app.Run();
