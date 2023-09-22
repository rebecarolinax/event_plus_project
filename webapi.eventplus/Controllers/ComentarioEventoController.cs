using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Tracing;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;
using webapi.eventplus.Repositories;

namespace webapi.eventplus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentarioEventoController : ControllerBase
    {
        private IComentarioEventoRepository _comentarioEventoRepository;

        public ComentarioEventoController()
        {
            _comentarioEventoRepository = new ComentarioEventoRepository();
        }

        [HttpPost]
        public IActionResult Post(ComentarioEvento comentariosEvento)
        {
            try
            {
                _comentarioEventoRepository.Cadastrar(comentariosEvento);

                return StatusCode(201);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult Listas()
        {
            try
            {
                List<ComentarioEvento> lista = _comentarioEventoRepository.Listar();

                return Ok(lista);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IActionResult Deletar(Guid id)
        {
            try
            {
                _comentarioEventoRepository.Deletar(id);

                return StatusCode(201);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet("BuscarPorId")]
        public IActionResult Buscar(Guid id)
        {
            try
            {
                ComentarioEvento comentariosEvento = _comentarioEventoRepository.BuscarPorId(id);

                return Ok(comentariosEvento);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
