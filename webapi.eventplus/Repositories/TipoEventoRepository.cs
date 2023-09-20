using webapi.eventplus.Contexts;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;

namespace webapi.eventplus.Repositories
{
    public class TipoEventoRepository : ITipoEventoRepository
    {
        private readonly EventContext c;
        public TipoEventoRepository()
        {
            c = new EventContext();
        }
        public void Atualizar(Guid id, TipoEvento eventoAtualizado)
        {
            try
            {
                TipoEvento tipoAtualizado = c.TipoEvento.Find(id)!;
                if (tipoAtualizado != null)
                {
                    tipoAtualizado.Titulo = eventoAtualizado.Titulo;
                }

                c.TipoEvento.Update(tipoAtualizado!);
                c.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public TipoEvento BuscarPorId(Guid id)
        {
            try
            {
                TipoEvento tipoBuscado = c.TipoEvento
                  .Select(t => new TipoEvento
                  {
                      IdTipoEvento = t.IdTipoEvento,
                      Titulo = t.Titulo
                  }).FirstOrDefault(t => t.IdTipoEvento == id)!;

                if (tipoBuscado != null)
                {
                    return tipoBuscado;
                }
                return null!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(TipoEvento eventoCadastrado)
        {
            try
            {
                c.TipoEvento.Add(eventoCadastrado);
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
                TipoEvento tipoBuscado = c.TipoEvento.Find(id)!;

                c.TipoEvento.Remove(tipoBuscado);

                c.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<TipoEvento> ListarTodos()
        {
            try
            {
                return c.TipoEvento.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
