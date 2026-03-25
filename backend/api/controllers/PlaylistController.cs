using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Chillify.Application.Services;
using Chillify.Application.DTOs;

namespace Chillify.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PlaylistController : ControllerBase
{
    private readonly IPlaylistService _playlistService;
    public PlaylistController(IPlaylistService playlistService) => _playlistService = playlistService;

    private Guid CurrentUserId => Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? Guid.Empty.ToString());

    [HttpGet]
    public async Task<IActionResult> GetMyPlaylists() => Ok(await _playlistService.GetUserPlaylistsAsync(CurrentUserId));

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetail(Guid id)
    {
        var result = await _playlistService.GetPlaylistDetailAsync(id);
        return result == null ? NotFound("Playlist not found.") : Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePlaylistDto dto) => Ok(await _playlistService.CreateAsync(CurrentUserId, dto));

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdatePlaylistDto dto) => 
        await _playlistService.UpdateAsync(CurrentUserId, id, dto) ? NoContent() : NotFound();

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id) => 
        await _playlistService.DeleteAsync(CurrentUserId, id) ? NoContent() : BadRequest("Delete failed.");
}