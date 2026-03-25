
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Chillify.Application.Models;
using Chillify.Application.Interfaces.Repositories;
using Chillify.Infrastructure.Persistence;
using application.models;

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

    public async Task<List<(Song song, int position)>> GetSongsByPlaylistIdAsync(Guid playlistId)
    {
        return await _context.PlaylistSongs
            .Where(ps => ps.PlaylistId == playlistId)
            .OrderBy(ps => ps.Position)
            .Join(_context.Songs,
                ps => ps.SongId,
                s => s.SongId,
                (ps, s) => new { s, ps.Position })
            .Select(x => new ValueTuple<Song, int>(x.s, x.Position))
            .ToListAsync();
    }

    public async Task<Playlist?> GetByIdWithSongsAsync(Guid id) => 
        await _context.Playlists
            .Include(p => p.PlaylistSongs)
            .ThenInclude(ps => ps.Song)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task<IEnumerable<Playlist>> GetByUserIdAsync(Guid userId) => 
        await _context.Playlists
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

    
        
    public async Task AddAsync(Playlist playlist) => await _context.Playlists.AddAsync(playlist);
    
    public void Update(Playlist playlist) => _context.Playlists.Update(playlist);
    
    public void Delete(Playlist playlist) => _context.Playlists.Remove(playlist);
    
    public async Task SaveChangesAsync() => await _context.SaveChangesAsync();

}