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
            throw new NotImplementedException();
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
