using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.models;

namespace application.interfaces.Repositories
{
    public interface IAlbumRepository
    {
        Task<Album?> GetByJamendoAlbumIdAsync(string jamendoAlbumId);
        Task AddAsync(Album album);
        Task AddRangeAsync(IEnumerable<Album> albums);
    }
}