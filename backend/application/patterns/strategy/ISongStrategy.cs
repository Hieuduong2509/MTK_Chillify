using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.models;

namespace application.patterns.strategy
{
    public interface ISongStrategy
    {
        Task<List<Song>> GetSongsByStrategy(int limit);
    }
}