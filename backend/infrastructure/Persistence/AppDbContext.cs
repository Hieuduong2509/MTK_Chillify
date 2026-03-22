using Microsoft.EntityFrameworkCore;
using Chillify.Application.Models;

namespace Chillify.Infrastructure.Persistence
{
    public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Song> Songs { get; set; } = null!;
        public DbSet<Playlist> Playlists { get; set; } = null!;
        public DbSet<PlaylistSong> PlaylistSongs { get; set; } = null!;
        public DbSet<SongPlayHistory> SongPlayHistories { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Song>().ToTable("songs");
            modelBuilder.Entity<Playlist>().ToTable("playlists");
            modelBuilder.Entity<PlaylistSong>().ToTable("playlist_songs");
            modelBuilder.Entity<SongPlayHistory>().ToTable("song_play_history");

            modelBuilder.Entity<PlaylistSong>()
                .HasIndex(ps => new { ps.PlaylistId, ps.SongId })
                .IsUnique();

            modelBuilder.Entity<PlaylistSong>()
                .HasIndex(ps => new { ps.PlaylistId, ps.Position })
                .IsUnique();

            modelBuilder.Entity<Playlist>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PlaylistSong>()
                .HasOne<Playlist>()
                .WithMany()
                .HasForeignKey(ps => ps.PlaylistId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PlaylistSong>()
                .HasOne<Song>()
                .WithMany()
                .HasForeignKey(ps => ps.SongId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SongPlayHistory>()
                .HasOne<Song>()
                .WithMany()
                .HasForeignKey(sph => sph.SongId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SongPlayHistory>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(sph => sph.UserId)
                .OnDelete(DeleteBehavior.SetNull);
        }

        // ======================
        // SEED DATA
        // ======================
        public async Task SeedAsync()
{
    if (await Songs.AnyAsync()) return;

    var artistId = Guid.NewGuid();
    var albumId = Guid.NewGuid();

    var songs = new List<Song>
    {
        new Song
        {
            SongId = Guid.NewGuid(),
            Name = "Chill Vibes 1",
            AudioUrl = "https://example.com/audio1.mp3",
            Duration = 240,
            ReleaseDate = DateTime.SpecifyKind(new DateTime(2020, 1, 1), DateTimeKind.Utc),
            PlayCount = 0,
            ArtistId = artistId,
            AlbumId = albumId,
            CreatedAt = DateTime.UtcNow
        },
        new Song
        {
            SongId = Guid.NewGuid(),
            Name = "Chill Vibes 2",
            AudioUrl = "https://example.com/audio2.mp3",
            Duration = 260,
            ReleaseDate = DateTime.SpecifyKind(new DateTime(2021, 1, 1), DateTimeKind.Utc),
            PlayCount = 0,
            ArtistId = artistId,
            AlbumId = albumId,
            CreatedAt = DateTime.UtcNow
        },
        new Song
        {
            SongId = Guid.NewGuid(),
            Name = "Lo-fi Night",
            AudioUrl = "https://example.com/audio3.mp3",
            Duration = 230,
            ReleaseDate = DateTime.SpecifyKind(new DateTime(2019, 1, 1), DateTimeKind.Utc),
            PlayCount = 0,
            ArtistId = artistId,
            AlbumId = albumId,
            CreatedAt = DateTime.UtcNow
        },
        new Song
        {
            SongId = Guid.NewGuid(),
            Name = "Deep Focus",
            AudioUrl = "https://example.com/audio4.mp3",
            Duration = 300,
            ReleaseDate = DateTime.SpecifyKind(new DateTime(2022, 1, 1), DateTimeKind.Utc),
            PlayCount = 0,
            ArtistId = artistId,
            AlbumId = albumId,
            CreatedAt = DateTime.UtcNow
        },
        new Song
        {
            SongId = Guid.NewGuid(),
            Name = "Late Night Coding",
            AudioUrl = "https://example.com/audio5.mp3",
            Duration = 270,
            ReleaseDate = DateTime.SpecifyKind(new DateTime(2020, 6, 1), DateTimeKind.Utc),
            PlayCount = 0,
            ArtistId = artistId,
            AlbumId = albumId,
            CreatedAt = DateTime.UtcNow
        }
    };

    await Songs.AddRangeAsync(songs);
    await SaveChangesAsync();
}
    }
}