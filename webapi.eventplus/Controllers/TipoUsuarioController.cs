using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;
using webapi.eventplus.Repositories;

namespace webapi.eventplus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TipoUsuarioController : ControllerBase
    {
        private ITipoUsuarioRepository _tipoUsuarioRepository { get; set; }
        public TipoUsuarioController()
        {
            _tipoUsuarioRepository = new TipoUsuarioRepository();
        }

        [HttpPost] 
        public IActionResult Post(TipoUsuario usuarioCadastrado)
        {
            try
            {
                _tipoUsuarioRepository.Cadastrar(usuarioCadastrado);
                return StatusCode(201);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
    }
}
