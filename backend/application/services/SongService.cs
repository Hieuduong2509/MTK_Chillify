using application.interfaces.Services;
using application.DTOs.Song;
using application.interfaces.Repositories;
using application.mappers;

namespace Chillify.Application.Services;

public class SongService : ISongService
{
    private readonly ISongRepository _songRepository;
    private readonly IJamendoService _jamendoService;
    public SongService(ISongRepository songRepository, IJamendoService jamendoService)
    {
        _songRepository = songRepository;
        _jamendoService = jamendoService;
    }

    public async Task<List<SongResponseDto>> GetSongsTrending()
    {
        var songFromApi = await _jamendoService.GetSongsAsync();
        // TODO: Hiện thực kiểm tra DB, update DB, lấy bài nhạc từ DB và trả về => Gọi repo
        return songFromApi.Select(song => song.ToSongDtoFromJamendoTrack()).ToList();
    }
}