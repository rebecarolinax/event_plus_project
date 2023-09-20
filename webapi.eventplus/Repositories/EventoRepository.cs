using webapi.eventplus.Contexts;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;
using webapi.eventplus.Utils;

namespace webapi.eventplus.Repositories
{
    public class EventoRepository : IEventoRepository
    {
        private readonly EventContext c;
        public EventoRepository()
        {
            c = new EventContext();
        }

        public void Atualizar(Guid id, Evento eventoAtualizado)
        {
            try
            {
                Evento eventoBuscado = BuscarPorId(eventoAtualizado.IdEvento);
                if (eventoBuscado != null)
                {
                    eventoBuscado.NomeEvento = eventoBuscado.NomeEvento;
                }
                c.Evento.Update(eventoBuscado!);
                c.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Evento BuscarPorId(Guid id)
        {
            try
            {
                Evento eventoBuscado = c.Evento
                    .Select(e => new Evento
                    {
                        IdEvento = e.IdEvento,
                        NomeEvento = e.NomeEvento,
                        TipoEvento = new TipoEvento
                        {
                            Titulo = e.TipoEvento!.Titulo
                        }
                    }).FirstOrDefault(e => e.IdEvento == id)!;

                if (eventoBuscado != null)
                {
                    return eventoBuscado;
                }
                return null!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Evento eventoCadastrado)
        {
            try
            {
                c.Evento.Add(eventoCadastrado);
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
                Evento eventoBuscado = BuscarPorId(id);
                if (eventoBuscado != null)
                {
                    c.Remove(eventoBuscado);
                    c.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Evento> ListarTodos()
        {
            try
            {
                return c.Evento.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
