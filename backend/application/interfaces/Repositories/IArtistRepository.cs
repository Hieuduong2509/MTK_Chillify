using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.models;

namespace application.interfaces.Repositories
{
    public interface IArtistRepository
    {
        Task<Artist?> GetByJamendoArtistIdAsync(string jamendoArtistId);
        Task AddAsync(Artist artist);
        Task AddRangeAsync(IEnumerable<Artist> artists);
    }
}