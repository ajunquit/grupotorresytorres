using Auth.Service.Application.Auth.Queries.Login.Dto;

namespace Auth.Service.Application.Auth.Queries.Login
{
    public interface ILoginQueryHandler
    {
        Task<LoginResponse> Handle(LoginRequest request);
    }
}
