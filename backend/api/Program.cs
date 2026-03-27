using application.interfaces.Repositories;
using application.interfaces.Services;
using application.patterns.factory;
using application.patterns.strategy;
using Chillify.Application.Services;
using Chillify.Infrastructure.Persistence;
using Chillify.Infrastructure.Repositories;
using infrastructure.ExternalServices;
using System.IdentityModel.Tokens.Jwt;
using Chillify.Application.Interfaces.Repositories;
using Chillify.Application.Interfaces.Services;
using Chillify.Application.Patterns.Observer;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Npgsql;
using Chillify.Application.Models;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
var builder = WebApplication.CreateBuilder(args);

// ======================
// 1. Dependency Injection (Đã dọn dẹp các dòng trùng lặp)
// ======================

// Repositories
builder.Services.AddScoped<ISongRepository, SongRepository>();
builder.Services.AddScoped<IPlaylistRepository, PlaylistRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPlayHistoryRepository, PlayHistoryRepository>();

// Services
builder.Services.AddScoped<ISongService, SongService>();
builder.Services.AddScoped<IPlaylistService, PlaylistService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPlayerService, PlayerService>();
builder.Services.AddHttpClient<IJamendoService, JamendoService>();

// Patterns (Strategy & Observer)
builder.Services.AddScoped<ISongStrategy, TrendingStrategy>();
builder.Services.AddScoped<ISongStrategy, NewStrategy>();
builder.Services.AddScoped<ISongStrategy, DiscoverStrategy>();
builder.Services.AddScoped<SongStrategyFactory>();
builder.Services.AddScoped<IPlayerObserver, AnalyticsObserver>();

// Controllers
builder.Services.AddControllers();

// ======================
// 2. DbContext (PostgreSQL + snake_case)
// ======================
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString)
           .UseSnakeCaseNamingConvention()
);

// ======================
// 3. Swagger
// ======================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter Token: Bearer {your_token}",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    };

    c.AddSecurityDefinition("Bearer", securityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// ======================
// 4. CORS 
// ======================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// ======================
// 5. JWT Authentication (Đã gộp và sửa lỗi Token hết hạn)
// ======================
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
        ),
        NameClaimType = JwtRegisteredClaimNames.Sub,
        
        // FIX LỖI: Bắt buộc Token chết đúng thời gian, không nhây thêm 5 phút
        ClockSkew = TimeSpan.Zero 
    };
});

// ======================
// 6. Health Check
// ======================
builder.Services.AddHealthChecks()
    .AddNpgSql(connectionString!);

var app = builder.Build();

// ======================
// 7. Middleware pipeline
// ======================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();