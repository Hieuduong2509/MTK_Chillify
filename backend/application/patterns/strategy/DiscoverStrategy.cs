using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.interfaces.Repositories;
using application.models;

namespace application.patterns.strategy
{
    public class DiscoverStrategy : ISongStrategy
    {
        private readonly ISongRepository _songRepository;

        public DiscoverStrategy(ISongRepository songRepository)
        {
            _songRepository = songRepository;
        }

        public async Task<List<Song>> GetSongsByStrategy(int limit)
        {
            return await _songRepository.GetSongDiscoverAsync(limit);
        }
    }
}