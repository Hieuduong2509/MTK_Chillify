using System;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Chillify.Application.DTOs.Auth;
using Chillify.Application.Interfaces.Repositories;
using Chillify.Application.Interfaces.Services;
using Chillify.Application.Models;
using BCrypt.Net;

namespace Chillify.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration; 

    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);
        
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash)) 
        {
            throw new Exception("Email or password is incorrect!");
        }

        
        string token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Token = token,
            UserId = user.UserId,
            FullName = user.FullName,
            Email = user.Email
        };
    }

    public async Task<AuthResponseDto> SignUpAsync(SignUpRequestDto request)
    {
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null) throw new Exception("Email already exists!");

        var newUser = new User
        {
            UserId = Guid.NewGuid(),
            FullName = request.FullName,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password), // Hash password
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _userRepository.AddAsync(newUser);

        string token = GenerateJwtToken(newUser);

        return new AuthResponseDto
        {
            Token = token,
            UserId = newUser.UserId,
            FullName = newUser.FullName,
            Email = newUser.Email
        };
    }


    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()), 
            new Claim(JwtRegisteredClaimNames.Email, user.Email),           
            new Claim("FullName", user.FullName),                          
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24), 
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}