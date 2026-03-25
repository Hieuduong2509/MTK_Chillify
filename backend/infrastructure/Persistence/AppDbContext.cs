using Microsoft.EntityFrameworkCore;
using Chillify.Application.Models;

namespace Chillify.Infrastructure.Persistence;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Song> Songs { get; set; } = null!;
    public DbSet<Playlist> Playlists { get; set; } = null!;
    public DbSet<PlaylistSong> PlaylistSongs { get; set; } = null!;
    public DbSet<SongPlayHistory> SongPlayHistories { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // --- Table Mappings ---
        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<Song>().ToTable("songs");
        modelBuilder.Entity<Playlist>().ToTable("playlists");
        modelBuilder.Entity<PlaylistSong>().ToTable("playlist_songs");
        modelBuilder.Entity<SongPlayHistory>().ToTable("song_play_history");

        // --- Property Configurations ---
        modelBuilder.Entity<Playlist>(entity =>
        {
            entity.Property(p => p.PlaylistType)
                .HasColumnName("playlist_type")
                .HasConversion(
                    v => v.ToString().ToUpper(),
                    v => (PlaylistType)Enum.Parse(typeof(PlaylistType), v, true)
                );
        });

        modelBuilder.Entity<PlaylistSong>(entity =>
        {
            // Ensures a song is unique within a playlist and maintains consistent ordering
            entity.HasIndex(ps => new { ps.PlaylistId, ps.SongId }).IsUnique();
            entity.HasIndex(ps => new { ps.PlaylistId, ps.Position }).IsUnique();
        });

        modelBuilder.Entity<Playlist>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PlaylistSong>()
            .HasOne(ps => ps.Song)
            .WithMany()
            .HasForeignKey(ps => ps.SongId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<SongPlayHistory>(entity =>
        {
            entity.HasOne<Song>()
                .WithMany()
                .HasForeignKey(sph => sph.SongId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne<User>()
                .WithMany()
                .HasForeignKey(sph => sph.UserId)
                .OnDelete(DeleteBehavior.SetNull); 
        });
    }
}