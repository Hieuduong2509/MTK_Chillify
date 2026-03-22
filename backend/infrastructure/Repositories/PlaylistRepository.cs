using Microsoft.EntityFrameworkCore;
using Chillify.Application.Models;
using Chillify.Application.Interfaces.Repositories;
using Chillify.Infrastructure.Persistence;

namespace Chillify.Infrastructure.Repositories;

public class PlaylistRepository : IPlaylistRepository
{
    private readonly AppDbContext _context;

    public PlaylistRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Playlist?> GetByIdAsync(Guid playlistId)
    {
        return await _context.Playlists.FindAsync(playlistId);
    }

    public async Task<bool> IsSongInPlaylist(Guid playlistId, Guid songId)
    {
        return await _context.PlaylistSongs
            .AnyAsync(ps => ps.PlaylistId == playlistId && ps.SongId == songId);
    }

    public async Task AddSongToPlaylistAsync(Guid playlistId, Guid songId)
    {
        var count = await _context.PlaylistSongs
            .CountAsync(ps => ps.PlaylistId == playlistId);

        var entity = new PlaylistSong
        {
            Id = Guid.NewGuid(),
            PlaylistId = playlistId,
            SongId = songId,
            Position = count + 1,
            AddedAt = DateTime.UtcNow
        };

        _context.PlaylistSongs.Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveSongFromPlaylistAsync(Guid playlistId, Guid songId)
    {
        var entity = await _context.PlaylistSongs
            .FirstOrDefaultAsync(ps => ps.PlaylistId == playlistId && ps.SongId == songId);

        if (entity is null) return;

        _context.PlaylistSongs.Remove(entity);
        await _context.SaveChangesAsync();
    }
}