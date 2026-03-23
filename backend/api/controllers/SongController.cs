using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using application.interfaces.Services;
using application.models;

namespace Chillify.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SongController : ControllerBase
{
    private readonly ISongService _songService;
    
    public SongController(ISongService songService)
    {
        _songService = songService;
    }

    [HttpGet("songs")]
    public async Task<IActionResult> GetSongs()
    {
        try
        {
            var response = await _songService.GetSongs();
            return Ok(response); 
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddSongs()
    {
        try
        {
            var result = await _songService.AddSongs();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("exists")]
    public async Task<IActionResult> ExistsSong()
    {
        try
        {
            var result = await _songService.ExistsSong();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSongDetail(Guid id)
    {
        try
        {
            var result = await _songService.GetSongDetail(id);

            if (result == null)
            {
                return NotFound(new { message = "Song not found" });
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("song-section")]
    public async Task<IActionResult> GetSongsByType([FromQuery] string type)
    {
        try
        {
            var result = await _songService.GetSongsByType(type);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}