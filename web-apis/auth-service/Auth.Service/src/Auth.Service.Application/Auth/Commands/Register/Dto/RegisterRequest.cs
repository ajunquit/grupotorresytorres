namespace Auth.Service.Application.Auth.Commands.Register.Dto
{
    public record RegisterRequest(string UserName, string Email, string Password);
}
