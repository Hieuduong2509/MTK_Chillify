using System;
using System.Threading.Tasks;
using Chillify.Application.DTOs.User;

namespace Chillify.Application.Interfaces.Services;

public interface IUserService
{
    Task<UserProfileResponseDto> GetProfileAsync(Guid userId);
    Task<UserProfileResponseDto> UpdateProfileAsync(Guid userId, UpdateProfileRequestDto request);
    Task<bool> ChangePasswordAsync(Guid userId, ChangePasswordRequestDto request);
}