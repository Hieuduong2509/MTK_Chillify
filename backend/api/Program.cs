var builder = WebApplication.CreateBuilder(args);

// Enable Controllers (QUAN TRỌNG)
builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthorization();

// Map controllers
app.MapControllers();

app.Run();