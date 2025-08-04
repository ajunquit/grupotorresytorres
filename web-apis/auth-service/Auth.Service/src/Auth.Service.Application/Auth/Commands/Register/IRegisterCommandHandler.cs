using Auth.Service.Application.Auth.Commands.Register.Dto;
using Microsoft.AspNetCore.Identity;

namespace Auth.Service.Application.Auth.Commands.Register
{
    public interface IRegisterCommandHandler
    {
        Task<IdentityResult> Handle(RegisterRequest request);
    }
}
