using application.interfaces.Services;
using application.DTOs.Song;
using application.interfaces.Repositories;
using application.mappers;
using application.models.jamendo;

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
        // var songFromApi = await _jamendoService.GetSongsAsync();
        // TODO: Hiện thực kiểm tra DB, update DB, lấy bài nhạc từ DB và trả về => Gọi repo


        // return songFromApi.Select(song => song.ToSongDtoFromJamendoTrack()).ToList();
        throw new NotImplementedException();
    }

    public async Task<List<SongResponseDto>> AddSongs()
    {
        var dummyTracks = new List<JamendoTrack>
        {
            new JamendoTrack
            {
                Id = "jamendo_1",
                Name = "Test Song 1",
                Duration = 210,
                ArtistId = "artist_1",
                ArtistName = "Artist A",
                AlbumId = "album_1",
                Audio = "https://test-audio-1.mp3",
                Image = "https://test-image-1.jpg",
                ReleaseDate = DateTime.UtcNow
            },
            new JamendoTrack
            {
                Id = "jamendo_2",
                Name = "Test Song 2",
                Duration = 180,
                ArtistId = "artist_2",
                ArtistName = "Artist B",
                AlbumId = "album_2",
                Audio = "https://test-audio-2.mp3",
                Image = "https://test-image-2.jpg",
                ReleaseDate = DateTime.UtcNow
            }
        };

        var songs = dummyTracks.Select(track => track.ToSongFromJamendoTrack()).ToList();

        await _songRepository.AddRangeAsync(songs);
        await _songRepository.SaveChangesAsync();

        return new List<SongResponseDto>();
    }

    public async Task<List<SongResponseDto>> ExistsSong()
    {
        var dummyTrack = new JamendoTrack
        {
            Id = "jamendo_1", 
            Name = "Test Song",
            Duration = 200,
            ArtistId = "artist_1",
            ArtistName = "Artist A",
            AlbumId = "album_1",
            Audio = "https://test.mp3",
            Image = "https://test.jpg",
            ReleaseDate = DateTime.UtcNow
        };

        var exists = await _songRepository.ExistsByJamendoIdAsync(dummyTrack.Id);

        if (exists)
        {
            return new List<SongResponseDto>
            {
                new SongResponseDto
                {
                    SongId = Guid.NewGuid(),
                    Name = dummyTrack.Name
                }
            };
        }

        return new List<SongResponseDto>();
    }
}