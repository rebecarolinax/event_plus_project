using webapi.eventplus.Contexts;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;
using webapi.eventplus.Utils;

namespace webapi.eventplus.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly EventContext c;
        public UsuarioRepository()
        {
            c = new EventContext();
        }
        public void Atualizar(Guid id, Usuario usuarioAtualizado)
        {
            throw new NotImplementedException();
        }

        public Usuario BuscarPorEmailESenha(string Email, string Senha)
        {
            try
            {
                Usuario usuarioBuscado = c.Usuario.FirstOrDefault(u => u.Email == Email)!;

                if (usuarioBuscado != null)
                {
                    bool confere = Criptografia.CompararHash(Senha, usuarioBuscado.Senha!);

                    if (confere)
                    {
                        return usuarioBuscado;
                    }
                }
                return null;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario BuscarPorId(Guid id)
        {
            try
            {
                Usuario usuarioBuscado = c.Usuario
                     .Select(u => new Usuario
                     {
                         IdUsuario = u.IdUsuario,
                         Nome = u.Nome,
                         TipoUsuario = new TipoUsuario
                         {
                             Titulo = u.TipoUsuario!.Titulo
                         }
                     }).FirstOrDefault(u => u.IdUsuario == id)!;

                if (usuarioBuscado != null)
                {
                    return usuarioBuscado;
                }
                return null!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario usuarioCadastrado)
        {
            try
            {
                usuarioCadastrado.Senha = Criptografia.GerarHash(usuarioCadastrado.Senha!);
                c.Usuario.Add(usuarioCadastrado);
                c.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Deletar(Guid id)
        {
            throw new NotImplementedException();
        }

        public List<Usuario> ListarTodos()
        {
            throw new NotImplementedException();
        }
    }
}
