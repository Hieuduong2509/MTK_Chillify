using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.models.jamendo;

namespace application.interfaces.Services
{
    public interface IJamendoService
    {
        Task<List<JamendoTrack>> GetSongsAsync();
        
    }
}