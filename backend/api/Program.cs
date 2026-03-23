using Chillify.Infrastructure.Persistence;
using Chillify.Application.Interfaces.Services;
using Chillify.Application.Interfaces.Repositories;
using Chillify.Application.Services;
using Chillify.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ======================
// 1. Controllers
// ======================
builder.Services.AddControllers();

// ======================
// 2. DbContext (PostgreSQL + snake_case)
// ======================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
           .UseSnakeCaseNamingConvention()
);

// ======================
// 3. Dependency Injection
// ======================
builder.Services.AddScoped<IPlaylistService, PlaylistService>();
builder.Services.AddScoped<IPlaylistRepository, PlaylistRepository>();

builder.Services.AddScoped<ISongRepository, SongRepository>();

// ======================
// 4. Swagger
// ======================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ======================
// 5. CORS
// ======================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ======================
// 6. Health Check (FIX)
// ======================
builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!);

var app = builder.Build();

// ======================
// Middleware pipeline
// ======================

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