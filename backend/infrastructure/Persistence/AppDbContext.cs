using Microsoft.EntityFrameworkCore;
using Chillify.Application.Models;
using application.models;

namespace Chillify.Infrastructure.Persistence
{
    public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // ===== DbSet (mapping tables) =====
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Song> Songs { get; set; } = null!;
        public DbSet<Playlist> Playlists { get; set; } = null!;
        public DbSet<PlaylistSong> PlaylistSongs { get; set; } = null!;
        public DbSet<SongPlayHistory> SongPlayHistories { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ===== Table names =====
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Song>().ToTable("songs");
            modelBuilder.Entity<Playlist>().ToTable("playlists");
            modelBuilder.Entity<PlaylistSong>().ToTable("playlist_songs");
            modelBuilder.Entity<SongPlayHistory>().ToTable("song_play_history");

            // ===== Unique constraints =====
            modelBuilder.Entity<PlaylistSong>()
                .HasIndex(ps => new { ps.PlaylistId, ps.SongId })
                .IsUnique();

            modelBuilder.Entity<PlaylistSong>()
                .HasIndex(ps => new { ps.PlaylistId, ps.Position })
                .IsUnique();

            // ===== Relationships =====

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
    }
}