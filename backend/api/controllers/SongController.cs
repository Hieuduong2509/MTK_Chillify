using Chillify.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Chillify.Api.Controllers;

[ApiController]
[Route("songs")]
public class SongController : ControllerBase
{
    private readonly ISongService _songService;

    public SongController(ISongService songService)
    {
        _songService = songService;
    }

    [HttpGet("{id}/recommend")]
    public async Task<IActionResult> GetRecommendedSongs(Guid id)
    {
        var songs = await _songService.GetRecommendedSongsAsync(id);

        return Ok(songs);
    }
}