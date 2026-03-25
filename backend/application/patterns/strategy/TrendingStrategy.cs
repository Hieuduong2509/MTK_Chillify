using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.interfaces.Repositories;
using application.models;

namespace application.patterns.strategy
{
    public class TrendingStrategy : ISongStrategy
    {
        private readonly ISongRepository _songRepository;

        public TrendingStrategy(ISongRepository songRepository)
        {
            _songRepository = songRepository;
        }

        public async Task<List<Song>> GetSongsByStrategy(int limit)
        {
            var songs = await _songRepository.GetSongTrendingAsync(limit);

            if (!songs.Any(s => s.PlayCount > 0))
            {
                songs = await _songRepository.GetSongDiscoverAsync(limit);
            }

            return songs;
        }
    }
}