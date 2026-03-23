using application.interfaces.Services;
using application.DTOs.Song;
using application.interfaces.Repositories;
using application.mappers;
using application.models.jamendo;
using application.models;
using application.patterns.factory;

namespace Chillify.Application.Services;

public class SongService : ISongService
{
    private readonly ISongRepository _songRepository;
    private readonly IJamendoService _jamendoService;
    private readonly SongStrategyFactory _factory;
    public SongService(ISongRepository songRepository, IJamendoService jamendoService, SongStrategyFactory factory)
    {
        _songRepository = songRepository;
        _jamendoService = jamendoService;
        _factory = factory;
    }

    public async Task<List<SongResponseDto>> GetSongs()
    {
        var songsFromApi = await _jamendoService.GetSongsAsync();
       
        var songsToAdd = new List<Song>();

        foreach(var track in songsFromApi)
        {
            var exists = await _songRepository.ExistsByJamendoIdAsync(track.Id);

            if (!exists)
            {
                var songModel = track.ToSongFromJamendoTrack();
                songsToAdd.Add(songModel);
            }
        }

        if (songsToAdd.Any())
        {
            await _songRepository.AddRangeAsync(songsToAdd);
            await _songRepository.SaveChangesAsync();
        }

        return songsFromApi
            .Select(song => song.ToSongDtoFromJamendoTrack())
            .ToList();
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

    public async Task<List<SongResponseDto>> GetSongsByType(string type)
    {
        var strategy = _factory.Create(type);

        var songs = await strategy.GetSongsByStrategy(10);

        return songs
            .Select(song => song.ToSongDtoFromSongModel())
            .ToList();
    }

    public async Task<SongResponseDto?> GetSongDetail(Guid songId)
    {
        var song = await _songRepository.GetSongByIdAsync(songId);

        if (song == null)
        {
            return null;
        }

        var result = song.ToSongDtoFromSongModel();

        return result;
    }
}