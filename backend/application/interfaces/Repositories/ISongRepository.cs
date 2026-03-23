using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.models;

namespace application.interfaces.Repositories
{
    public interface ISongRepository
    {
        Task AddAsync(Song song);
        Task AddRangeAsync(List<Song> songs);
        Task SaveChangesAsync();
        Task<bool> ExistsByJamendoIdAsync(string jamendoTrackId);
        Task<List<Song>> GetSongDiscoverAsync(int limit);
    }
}