using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Chillify.Application.Interfaces.Services;
using Chillify.Application.DTOs.User;

namespace Chillify.Api.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{userId}/profile")]
    public async Task<IActionResult> GetProfile(Guid userId)
    {
        try
        {
            var response = await _userService.GetProfileAsync(userId);
            return Ok(response);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPut("{userId}/profile")]
    public async Task<IActionResult> UpdateProfile(Guid userId, [FromBody] UpdateProfileRequestDto request)
    {
        try
        {
            var response = await _userService.UpdateProfileAsync(userId, request);
            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{userId}/change-password")]
    public async Task<IActionResult> ChangePassword(Guid userId, [FromBody] ChangePasswordRequestDto request)
    {
        try
        {
            await _userService.ChangePasswordAsync(userId, request);
            return Ok(new { message = "Password changed successfully!" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}