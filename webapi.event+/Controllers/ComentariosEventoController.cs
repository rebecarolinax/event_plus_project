using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using System.Text;
using webapi.event_.Domains;
using webapi.event_.Interfaces;
using webapi.event_.Repositories;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentariosEventoController : ControllerBase
    {
        public IComentariosEventoRepository _comentarioEventoRepository { get; set; }

        private readonly ContentModeratorClient _contentModeratorClient;

        public ComentariosEventoController(ContentModeratorClient contentModeratorClient)
        {
            _comentarioEventoRepository = new ComentariosEventoRepository();
            _contentModeratorClient = contentModeratorClient;

        }


        [HttpPost("CadastroIA")]
        public async Task<IActionResult> PostIA(ComentariosEvento comentariosEvento)
        {
            try
            {
                if (string.IsNullOrEmpty(comentariosEvento.Descricao))
                {
                    return BadRequest("O texto a ser analisado não pode ser vazio!");
                }

                using var stream = new MemoryStream(Encoding.UTF8.GetBytes(comentariosEvento.Descricao));

                //realiza a moderação do conteúdo(descrição do comentário)
                var moderationResult = await _contentModeratorClient.TextModeration.ScreenTextAsync("text/plain", stream, "por", false, false, null, true);

                if (moderationResult.Terms != null)
                {
                    comentariosEvento.Exibe = false;

                    _comentarioEventoRepository.Cadastrar(comentariosEvento);
                }

                else
                {
                    comentariosEvento.Exibe = true;
                    _comentarioEventoRepository.Cadastrar(comentariosEvento);
                }

                return StatusCode(201, comentariosEvento);
            }
            catch (Exception  e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet("ListarSomenteExibe")]
        public IActionResult GetIA()
        {
            try
            {
                return Ok(_comentarioEventoRepository.ListarSomenteExibe());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_comentarioEventoRepository.Listar());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("BuscarPorIdUsuario")]
        public IActionResult BuscarPorIdUsuario(Guid idUsuario, Guid idEvento)
        {
            try
            {
                return Ok(_comentarioEventoRepository.BuscarPorIdUsuario(idUsuario, idEvento));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("BuscarPorId/{id}")]
        public IActionResult BuscarPorId(Guid id)
        {
            try
            {
                return Ok(_comentarioEventoRepository.BuscarPorId(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        [HttpPost]
        public IActionResult Post(ComentariosEvento novoComentario)
        {
            try
            {
                _comentarioEventoRepository.Cadastrar(novoComentario);
                return StatusCode(201, novoComentario);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _comentarioEventoRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
