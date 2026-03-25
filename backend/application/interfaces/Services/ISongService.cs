
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.DTOs.Song;
using application.models;
using Chillify.Application.Models;
namespace application.interfaces.Services
{
    public interface ISongService
    {
       Task<List<SongResponseDto>> GetSongs();
       Task<List<SongResponseDto>> AddSongs();
       Task<List<SongResponseDto>> ExistsSong();
       Task<SongResponseDto?> GetSongDetail(Guid songId);
       Task<List<SongResponseDto>> GetSongsByType(string type);
       Task<List<Song>> GetRecommendedSongsAsync(Guid songId);
    }
}


//namespace Chillify.Application.Interfaces.Services;
//namespace application.interfaces.Services