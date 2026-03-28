using Microsoft.AspNetCore.Mvc;

using Chillify.Application.Interfaces.Services;
using Chillify.Application.DTOs.Playlist;
using Chillify.Application.DTOs.Song;
namespace Chillify.Api.Controllers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Chillify.Application.Services;
using Chillify.Application.DTOs;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PlaylistController : ControllerBase
{
    private readonly IPlaylistService _playlistService;
    public PlaylistController(IPlaylistService playlistService)
    {
        _playlistService = playlistService;
    }

    private Guid CurrentUserId => Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? Guid.Empty.ToString());

    [HttpGet]
    public async Task<IActionResult> GetMyPlaylists() => Ok(await _playlistService.GetUserPlaylistsAsync(CurrentUserId));

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetail(Guid id)
    {
        try
        {
            var result = await _playlistService.GetPlaylistDetailAsync(CurrentUserId, id);
            return result == null ? NotFound("Playlist not found.") : Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, new { message = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePlaylistDto dto) => Ok(await _playlistService.CreateAsync(CurrentUserId, dto));

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdatePlaylistDto dto) => 
        await _playlistService.UpdateAsync(CurrentUserId, id, dto) ? NoContent() : NotFound();

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id) => 
        await _playlistService.DeleteAsync(CurrentUserId, id) ? NoContent() : BadRequest("Delete failed.");

    // Playlists
    [HttpGet("{id}/songs")]
    public async Task<IActionResult> GetUserPlaylistSongs(Guid id)
    {
        try
        {
            var result = await _playlistService.GetSongsInPlaylistAsync(CurrentUserId, id, "USER");
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, new { message = ex.Message });
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
            var result = await _playlistService.GetSongsInPlaylistAsync(CurrentUserId, id, "LIKED");
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }


    // SỬA DÒNG NÀY: Khớp URL với Frontend (chứa cả playlistId và songId)
    [HttpPost("{playlistId}/songs/{songId}")]
    public async Task<IActionResult> AddSongToPlaylist(Guid playlistId, Guid songId)
    {
        try
        {
            await _playlistService.AddSongToPlaylistAsync(CurrentUserId, playlistId, songId);
            return NoContent();
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, new { message = ex.Message });
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
            await _playlistService.RemoveSongFromPlaylistAsync(CurrentUserId, playlistId, songId);
            return NoContent();
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(403, new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

}