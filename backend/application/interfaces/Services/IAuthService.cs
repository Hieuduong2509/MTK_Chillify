using System.Threading.Tasks;
using Chillify.Application.DTOs.Auth;
namespace Chillify.Application.Interfaces.Services;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginRequestDto request);
    Task<AuthResponseDto> SignUpAsync(SignUpRequestDto request);
}