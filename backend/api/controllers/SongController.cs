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

    [HttpGet("trending")]
    public async Task<IActionResult> GetTrendingSongs()
    {
        try
        {
            var response = await _songService.GetSongsTrending();
            return Ok(response); //  response là DTO trả về
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
}