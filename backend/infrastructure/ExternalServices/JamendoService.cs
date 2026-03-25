using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using application.models;
using Microsoft.Extensions.Configuration;
using System.Text.Json.Serialization;
using application.models.jamendo;
using application.interfaces.Services;

namespace infrastructure.ExternalServices
{
    public class JamendoService : IJamendoService
    {
       private readonly HttpClient _httpClient;
        private readonly string _clientId = "c5ed0c4b"; // lấy từ Jamendo

        public JamendoService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<JamendoTrack>> GetSongsAsync()
        {
            // var url = $"https://api.jamendo.com/v3.0/tracks/?client_id={_clientId}&format=json&limit=20";
            var url = $"https://api.jamendo.com/v3.0/tracks?client_id={_clientId}&limit=10&audioformat=mp32";

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Failed to fetch songs from Jamendo API");
            }

            var json = await response.Content.ReadAsStringAsync();

            var jamendoResponse = JsonSerializer.Deserialize<JamendoResponse>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (jamendoResponse?.Results == null)
            {
                return new List<JamendoTrack>();
            }

            return jamendoResponse.Results;
        }
    }
}