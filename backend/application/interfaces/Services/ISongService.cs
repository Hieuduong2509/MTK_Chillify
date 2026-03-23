using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.DTOs.Song;
using application.models;

namespace application.interfaces.Services
{
    public interface ISongService
    {
       Task<List<SongResponseDto>> GetSongs();
       Task<List<SongResponseDto>> AddSongs();
       Task<List<SongResponseDto>> ExistsSong();
       Task<List<SongResponseDto>> GetSongDiscover();
       Task<List<SongResponseDto>> GetSongNew();
       Task<List<SongResponseDto>> GetSongTrending();
       Task<SongResponseDto?> GetSongDetail(Guid songId);
    }
}