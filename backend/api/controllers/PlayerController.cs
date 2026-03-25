using Chillify.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Chillify.Api.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PlayerController : ControllerBase
{
    private readonly IPlayerService _playerService;

    public PlayerController(IPlayerService playerService)
    {
        _playerService = playerService;
    }
    private Guid CurrentUserId => Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? Guid.Empty.ToString());

    [HttpPost("songs/{id}/played")]
    public async Task<IActionResult> SongPlayed(Guid id)
    {
        await _playerService.HandleSongPlayedAsync(id, CurrentUserId);

        return NoContent();
    }
}