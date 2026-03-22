using Chillify.Application.Interfaces.Repositories;
using Chillify.Application.Interfaces.Services;
using Chillify.Application.Models;

namespace Chillify.Application.Services;

public class PlaylistService : IPlaylistService
{
    private readonly IPlaylistRepository _playlistRepository;
    private readonly ISongRepository _songRepository;

    public PlaylistService(
        IPlaylistRepository playlistRepository,
        ISongRepository songRepository)
    {
        _playlistRepository = playlistRepository;
        _songRepository = songRepository;
    }

    public async Task AddSongToPlaylistAsync(Guid playlistId, Guid songId)
    {
        var playlist = await _playlistRepository.GetByIdAsync(playlistId);
        if (playlist is null)
            throw new Exception("Playlist not found");

        var song = await _songRepository.GetByIdAsync(songId);
        if (song is null)
            throw new Exception("Song not found");

        var exists = await _playlistRepository.IsSongInPlaylist(playlistId, songId);
        if (exists)
            throw new Exception("Song already exists in playlist");

        await _playlistRepository.AddSongToPlaylistAsync(playlistId, songId);
    }

    public async Task RemoveSongFromPlaylistAsync(Guid playlistId, Guid songId)
    {
        var exists = await _playlistRepository.IsSongInPlaylist(playlistId, songId);
        if (!exists)
            throw new Exception("Song not in playlist");

        await _playlistRepository.RemoveSongFromPlaylistAsync(playlistId, songId);
    }
}