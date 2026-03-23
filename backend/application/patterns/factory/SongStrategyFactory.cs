using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.patterns.strategy;

namespace application.patterns.factory
{
    public class SongStrategyFactory
    {
        private readonly Dictionary<string, ISongStrategy> _strategies;

        public SongStrategyFactory(IEnumerable<ISongStrategy> strategies)
        {
            _strategies = strategies.ToDictionary(
                s => s.GetType().Name.Replace("Strategy", "").ToLower(),
                s => s
            );
        }

        public ISongStrategy Create(string type)
        {
            if (_strategies.TryGetValue(type.ToLower(), out var strategy))
            {
                return strategy;
            }

            throw new Exception("Invalid song type");
        }
    }
}