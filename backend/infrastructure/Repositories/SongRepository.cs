using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Chillify.Application.Models;
using Chillify.Infrastructure.Persistence;
using application.interfaces.Repositories;

namespace Chillify.Infrastructure.Repositories;

public class SongRepository : ISongRepository
{
    private readonly AppDbContext _context;

    public SongRepository(AppDbContext context)
    {
        _context = context;
    }
}