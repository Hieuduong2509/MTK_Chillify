using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Chillify.Application.Interfaces.Services;
using Chillify.Application.DTOs.Auth;

namespace Chillify.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        try
        {
            var response = await _authService.LoginAsync(request);
            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] SignUpRequestDto request)
    {
        try
        {
            var response = await _authService.SignUpAsync(request);
            return Created("", response); 
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}