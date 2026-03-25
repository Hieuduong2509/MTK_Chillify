using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chillify.Application.DTOs;
using Chillify.Application.Models;
using Chillify.Application.Interfaces.Repositories;

namespace Chillify.Application.Services;

public interface IPlaylistService
{
    Task<IEnumerable<PlaylistResponseDto>> GetUserPlaylistsAsync(Guid userId);
    Task<PlaylistDetailResponseDto?> GetPlaylistDetailAsync(Guid playlistId);
    Task<PlaylistResponseDto> CreateAsync(Guid userId, CreatePlaylistDto dto);
    Task<bool> UpdateAsync(Guid userId, Guid playlistId, UpdatePlaylistDto dto);
    Task<bool> DeleteAsync(Guid userId, Guid playlistId);
}

public class PlaylistService : IPlaylistService
{
    private readonly IPlaylistRepository _playlistRepository;
    
    public PlaylistService(IPlaylistRepository playlistRepository) => _playlistRepository = playlistRepository;

    public async Task<IEnumerable<PlaylistResponseDto>> GetUserPlaylistsAsync(Guid userId)
    {
        var list = await _playlistRepository.GetByUserIdAsync(userId);
        return list.Select(p => new PlaylistResponseDto {
            Id = p.Id, 
            PlaylistName = p.PlaylistName, 
            Description = p.Description, 
            PlaylistType = p.PlaylistType.ToString(),
            CreatedAt = p.CreatedAt
        });
    }

    public async Task<PlaylistDetailResponseDto?> GetPlaylistDetailAsync(Guid playlistId)
    {
        var playlist = await _playlistRepository.GetByIdWithSongsAsync(playlistId);
        if (playlist == null) return null;

        return new PlaylistDetailResponseDto {
            Id = playlist.Id, 
            PlaylistName = playlist.PlaylistName, 
            Description = playlist.Description, 
            PlaylistType = playlist.PlaylistType.ToString(), 
            CreatedAt = playlist.CreatedAt,
            Songs = playlist.PlaylistSongs.Select(ps => new PlaylistSongDto {
                SongId = ps.SongId, 
                Name = ps.Song?.Name ?? "Unknown", 
                AudioUrl = ps.Song?.AudioUrl, 
                SongImage = ps.Song?.SongImage, 
                Duration = ps.Song?.Duration
            }).ToList()
        };
    }

    public async Task<PlaylistResponseDto> CreateAsync(Guid userId, CreatePlaylistDto dto)
    {
        var p = new Playlist { 
            Id = Guid.NewGuid(), 
            UserId = userId, 
            PlaylistName = dto.PlaylistName, 
            Description = dto.Description, 
            PlaylistType = PlaylistType.User, 
            CreatedAt = DateTime.UtcNow, 
            UpdatedAt = DateTime.UtcNow 
        };
        
        await _playlistRepository.AddAsync(p);
        await _playlistRepository.SaveChangesAsync();

        return new PlaylistResponseDto { 
            Id = p.Id, 
            PlaylistName = p.PlaylistName,
            Description = p.Description,
            PlaylistType = p.PlaylistType.ToString(), 
            CreatedAt = p.CreatedAt
        };
    }

    public async Task<bool> UpdateAsync(Guid userId, Guid playlistId, UpdatePlaylistDto dto)
    {
        var p = await _playlistRepository.GetByIdAsync(playlistId);
        if (p == null || p.UserId != userId) return false;
        
        p.PlaylistName = dto.PlaylistName;
        p.Description = dto.Description;
        p.UpdatedAt = DateTime.UtcNow;
        
        _playlistRepository.Update(p);
        await _playlistRepository.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid userId, Guid playlistId)
    {
        var p = await _playlistRepository.GetByIdAsync(playlistId);
        if (p == null || p.UserId != userId) return false;
        
        _playlistRepository.Delete(p);
        await _playlistRepository.SaveChangesAsync();
        return true;
    }
}