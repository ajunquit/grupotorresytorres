using Business.Service.Application.Dashboard.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Business.Service.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly ICounterAppService _counterAppService;

        public DashboardController(ICounterAppService counterAppService)
        {
            _counterAppService = counterAppService;
        }

        [HttpGet("counters")]
        public async Task<IActionResult> Counters()
        {
            var result = await _counterAppService.GetCountersAsync();
            return Ok(result);
        }
    }
}
