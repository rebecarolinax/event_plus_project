using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;
using webapi.eventplus.Repositories;
using webapi.eventplus.ViewModels;

namespace webapi.eventplus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository;

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel usuarioLogin)
        {
            try
            {
                Usuario usuarioEncontrado = _usuarioRepository.BuscarPorEmailESenha(usuarioLogin.Email!, usuarioLogin.Senha!);

                if (usuarioEncontrado == null)
                {
                    return NotFound("Email ou senha inválidos, tente novamente!");
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioEncontrado.IdUsuario.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioEncontrado.Nome!.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioEncontrado.IdTipoUsuario.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioEncontrado.Email!),
                    new Claim(ClaimTypes.Role, usuarioEncontrado.TipoUsuario!.Titulo!)
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("senai-eventplus-chave-autenticacao-webapi-dev"));

                var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken
                    (
                        issuer: "webapi.eventplus",

                        audience: "webapi.eventplus",

                        claims: claims,

                        expires: DateTime.Now.AddMinutes(15),

                        signingCredentials: credential
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });

            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }
    }
}
