using Microsoft.AspNetCore.Mvc;
using Chillify.Application.Interfaces.Services;
using Chillify.Application.DTOs.Playlist;
using Chillify.Application.DTOs.Song;
namespace Chillify.Api.Controllers;

[ApiController]
[Route("playlists")]
public class PlaylistController : ControllerBase
{
    private readonly IPlaylistService _playlistService;

    public PlaylistController(IPlaylistService playlistService)
    {
        _playlistService = playlistService;
    }

    [HttpGet("{id}/songs")]
    public async Task<IActionResult> GetUserPlaylistSongs(Guid id)
    {
        try
        {
            var result = await _playlistService.GetSongsInPlaylistAsync(id, "USER");
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id}/liked-songs")]
    public async Task<IActionResult> GetLikedPlaylistSongs(Guid id)
    {
        try
        {
            var result = await _playlistService.GetSongsInPlaylistAsync(id, "LIKED");
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("{id}/songs")]
    public async Task<IActionResult> AddSongToPlaylist(
        Guid id,
        [FromBody] AddSongToPlaylistRequestDto request)
    {
        try
        {
            await _playlistService.AddSongToPlaylistAsync(id, request.SongId);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{playlistId}/songs/{songId}")]
    public async Task<IActionResult> RemoveSong(Guid playlistId, Guid songId)
    {
        try
        {
            await _playlistService.RemoveSongFromPlaylistAsync(playlistId, songId);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}