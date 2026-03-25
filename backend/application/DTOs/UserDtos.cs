using System;
using System.ComponentModel.DataAnnotations;
namespace Chillify.Application.DTOs.User;

public class UserProfileResponseDto
{
    public Guid UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    
    public string Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
}

public class UpdateProfileRequestDto
{
    public string FullName { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
}

public class ChangePasswordRequestDto
{
    [Required(ErrorMessage = "Please enter your old password.")]
    public string OldPassword { get; set; } = string.Empty;
    [Required(ErrorMessage = "Please enter your new password.")]
    public string NewPassword { get; set; } = string.Empty;
}