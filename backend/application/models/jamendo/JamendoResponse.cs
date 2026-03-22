using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace application.models.jamendo
{
    public class JamendoResponse
    {
        [JsonPropertyName("results")]
        public List<JamendoTrack> Results { get; set; }
    }
}