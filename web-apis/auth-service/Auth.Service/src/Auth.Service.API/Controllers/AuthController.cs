using Auth.Service.Application.Auth.Commands.Register;
using Auth.Service.Application.Auth.Commands.Register.Dto;
using Auth.Service.Application.Auth.Queries.Login;
using Auth.Service.Application.Auth.Queries.Login.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Auth.Service.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LoginQueryHandler _loginQueryHandler;
        private readonly RegisterCommandHandler _registerCommandHandler;
        

        public AuthController(
            LoginQueryHandler loginQueryHandler,
            RegisterCommandHandler registerCommandHandler)
        {
            _loginQueryHandler = loginQueryHandler;
            _registerCommandHandler = registerCommandHandler;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _registerCommandHandler.Handle(request);

            if (result.Succeeded)
                return Ok();
            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _loginQueryHandler.Handle(request);
            if (result != null)
                return Ok(result);

            return Unauthorized();
        }
    }
}
