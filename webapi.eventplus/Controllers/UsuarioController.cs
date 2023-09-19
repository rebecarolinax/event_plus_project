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
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }
        public UsuarioController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Post(Usuario usuarioCadastrado) 
        {
            try
            {
                _usuarioRepository.Cadastrar(usuarioCadastrado);
                return StatusCode(201);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
