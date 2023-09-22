using webapi.eventplus.Contexts;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;

namespace webapi.eventplus.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        private readonly EventContext c;
        public TipoUsuarioRepository()
        {
            c = new EventContext();
        }
        public void Atualizar(Guid id, TipoUsuario usuarioAtualizado)
        {
            try
            {
                TipoUsuario tipoUsuarioBuscado = c.TipoUsuario.Find(id)!;

                            if (tipoUsuarioBuscado != null)
                            {
                                tipoUsuarioBuscado.Titulo = usuarioAtualizado.Titulo;
                            }

                            c.TipoUsuario.Update(tipoUsuarioBuscado!);

                            c.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public TipoUsuario BuscarPorId(Guid id)
        {
            return c.TipoUsuario.FirstOrDefault(a => a.IdTipoUsuario == id)!;
        }

        public void Cadastrar(TipoUsuario usuarioCadastrado)
        {
            try
            {
                c.TipoUsuario.Add(usuarioCadastrado);
                c.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Deletar(Guid id)
        {
            try
            {
                TipoUsuario usuarioBuscado = c.TipoUsuario.Find(id)!;

                c.TipoUsuario.Remove(usuarioBuscado);

                c.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<TipoUsuario> ListarTodos()
        {
            try
            {
               return c.TipoUsuario.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
