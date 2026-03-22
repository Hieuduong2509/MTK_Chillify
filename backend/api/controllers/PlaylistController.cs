using Microsoft.AspNetCore.Mvc;
using Chillify.Application.Interfaces.Services;
using Chillify.Api.DTOs.Playlist;

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
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{playlistId}/songs/{songId}")]
    public async Task<IActionResult> RemoveSong(
        Guid playlistId,
        Guid songId)
    {
        try
        {
            await _playlistService.RemoveSongFromPlaylistAsync(playlistId, songId);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}