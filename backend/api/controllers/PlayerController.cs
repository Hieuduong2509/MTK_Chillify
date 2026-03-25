using Chillify.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Chillify.Api.Controllers;

[ApiController]
public class PlayerController : ControllerBase
{
    private readonly IPlayerService _playerService;

    public PlayerController(IPlayerService playerService)
    {
        _playerService = playerService;
    }

    [HttpPost("songs/{id}/played")]
    public async Task<IActionResult> SongPlayed(Guid id)
    {
        Guid? userId = null; // sau này lấy từ JWT

        await _playerService.HandleSongPlayedAsync(id, userId);

        return NoContent();
    }
}