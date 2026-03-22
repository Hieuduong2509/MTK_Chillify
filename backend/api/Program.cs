using Chillify.Application.Interfaces.Repositories;
using Chillify.Application.Interfaces.Services;
using Chillify.Application.Patterns.Observer;
using Chillify.Application.Services;
using Chillify.Infrastructure.Persistence;
using Chillify.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<ISongRepository, SongRepository>();
builder.Services.AddScoped<IPlayHistoryRepository, PlayHistoryRepository>();

builder.Services.AddScoped<ISongService, SongService>();
builder.Services.AddScoped<IPlayerService, PlayerService>();

builder.Services.AddScoped<IPlayerObserver, AnalyticsObserver>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    try
    {
        await db.Database.MigrateAsync();
        await db.SeedAsync();
    }
    catch (Exception ex)
    {
        Console.WriteLine(" Database init error:");
        Console.WriteLine(ex.Message);
    }
}

app.Run();