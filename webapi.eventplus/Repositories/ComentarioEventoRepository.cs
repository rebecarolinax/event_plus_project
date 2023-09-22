using webapi.eventplus.Contexts;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;

namespace webapi.eventplus.Repositories
{
    public class ComentarioEventoRepository : IComentarioEventoRepository
    {
        private readonly EventContext c;
        public ComentarioEventoRepository()
        {
            c = new EventContext();
        }

        public ComentarioEvento BuscarPorId(Guid id)
        {
            try
            {
                ComentarioEvento comentarioBuscado = c.ComentarioEvento
                   .Select(c => new ComentarioEvento
                   {
                       IdComentarioEvento = c.IdComentarioEvento,
                       Descricao = c.Descricao,
                       Exibe = c.Exibe,
                       IdUsuario = c.IdUsuario,

                       Usuario = new Usuario
                       {
                           IdUsuario = c.IdUsuario,
                           Nome = c.Usuario!.Nome
                       },

                       IdEvento = c.IdEvento,

                       Evento = new Evento
                       {
                           IdEvento = c.IdEvento,
                           NomeEvento = c.Evento!.NomeEvento

                       }
                   }).FirstOrDefault(c => c.IdComentarioEvento == id)!;

                if (comentarioBuscado != null)
                {
                    return comentarioBuscado!;
                }

                return null!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(ComentarioEvento comentarioEvento)
        {
            try
            {
                c.ComentarioEvento.Add(comentarioEvento);
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
                ComentarioEvento comentarioBuscado = BuscarPorId(id);
                if (comentarioBuscado != null)
                {
                    c.Remove(comentarioBuscado);
                    c.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ComentarioEvento> Listar()
        {
            try
            {
                return c.ComentarioEvento.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
