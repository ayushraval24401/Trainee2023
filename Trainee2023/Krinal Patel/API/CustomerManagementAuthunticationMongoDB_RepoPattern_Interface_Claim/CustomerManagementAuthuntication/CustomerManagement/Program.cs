using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MongoDB.Driver;
using DataAccessLayer.Services;
using CommonLibrary;
using DataAccessLayer.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton < ICustomerService,CustomerRepository > ();
builder.Services.AddScoped<IProductService, ProductRepository>(); 
//builder.Services.AddScoped<ICustomerService, CustomerRepository> ();
//builder.Services.AddTransient<ICustomerService, CustomerRepository> ();



builder.Services.AddControllers();
builder.Services.AddAuthorization();
//var secretKey = builder.Configuration.GetSection("JWT:Development:Secret");
//var ValidAudience = builder.Configuration.GetSection("JWT:Development:ValidAudience");
//var ValidIssuer = builder.Configuration.GetSection("JWT:Development:ValidIssuer");

builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidIssuer = AppConfiguration.ValidIssuer,
            ValidAudience = AppConfiguration.ValidAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AppConfiguration.Secret)),
            ValidateLifetime = true,
            RequireExpirationTime = true,
            LifetimeValidator = (DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters) =>
            {
                if (expires != null)
                {
                    var now = DateTime.UtcNow;
                    if (expires <= now.AddMinutes(59) && expires > now)
                    {
                        return true;
                    }
                }
                return false;
            },
            ClockSkew = TimeSpan.Zero
        };
    });


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

