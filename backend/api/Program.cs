using application.interfaces.Repositories;
using application.interfaces.Services;
using Chillify.Application.Services;
using Chillify.Infrastructure.Persistence;
using Chillify.Infrastructure.Repositories;
using infrastructure.ExternalServices;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Application services
builder.Services.AddScoped<ISongService, SongService>();

// Infrastructure services
builder.Services.AddScoped<ISongRepository, SongRepository>();
builder.Services.AddHttpClient<IJamendoService, JamendoService>();

// 1. Controllers
builder.Services.AddControllers();

// 2. DbContext (PostgreSQL)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 4. CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 5. Health Check (PostgreSQL)
builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!);

var app = builder.Build();

// Middleware pipeline

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS
app.UseCors("AllowAll");

// Authorization
app.UseAuthorization();

// Map Controllers
app.MapControllers();

// Health endpoint
app.MapHealthChecks("/health");

app.Run();