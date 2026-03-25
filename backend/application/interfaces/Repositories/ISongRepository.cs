
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.models;
using Chillify.Application.Models;

namespace application.interfaces.Repositories
{
    public interface ISongRepository
    {
        Task AddAsync(Song song);
        Task AddRangeAsync(List<Song> songs);
        Task SaveChangesAsync();
        Task<bool> ExistsByJamendoIdAsync(string jamendoTrackId);
        Task<List<Song>> GetSongDiscoverAsync(int limit);
        Task<List<Song>> GetSongNewAsync(int limit);
        Task<List<Song>> GetSongTrendingAsync(int limit);
        Task<Song?> GetSongByIdAsync(Guid songId);

        Task<Song?> GetByIdAsync(Guid songId);

        Task<List<Song>> GetRecommendedSongsAsync(Song currentSong, int limit = 10);
        Task IncrementPlayCountAsync(Guid songId);
    }
}

//namespace Chillify.Application.Interfaces.Repositories;
//namespace application.interfaces.Repositories