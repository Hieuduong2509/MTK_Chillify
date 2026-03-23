using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Chillify.Application.Models;
using Chillify.Application.Interfaces.Repositories;
using Chillify.Infrastructure.Persistence;

namespace Chillify.Infrastructure.Repositories;

public class PlaylistRepository : IPlaylistRepository
{
    private readonly AppDbContext _context;
    
    public PlaylistRepository(AppDbContext context) => _context = context;

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

    public async Task<Playlist?> GetByIdAsync(Guid id) => 
        await _context.Playlists.FirstOrDefaultAsync(p => p.Id == id);
        
    public async Task AddAsync(Playlist playlist) => await _context.Playlists.AddAsync(playlist);
    
    public void Update(Playlist playlist) => _context.Playlists.Update(playlist);
    
    public void Delete(Playlist playlist) => _context.Playlists.Remove(playlist);
    
    public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
}