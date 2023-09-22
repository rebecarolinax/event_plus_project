using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using webapi.eventplus.Contexts;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;

namespace webapi.eventplus.Repositories
{
    public class PresencaEventoRepository : IPresencaEventoRepository
    {

        private readonly EventContext c;

        public PresencaEventoRepository()
        {
            c = new EventContext();
        }

        public void Atualizar(Guid id, PresencaEvento presencaEvento)
        {
            PresencaEvento presencaEventoBuscado = BuscarPorId(id);

            if (presencaEventoBuscado != null)
            {
                presencaEventoBuscado.Situacao = presencaEvento.Situacao;
                presencaEventoBuscado.IdEvento = presencaEvento.IdEvento;
                presencaEventoBuscado.IdUsuario = presencaEvento.IdUsuario;

                c.PresencaEvento.Update(presencaEventoBuscado);

                c.SaveChanges();
            }
            else
                return;
        }

        public PresencaEvento BuscarPorId(Guid id)
        {
            return c.PresencaEvento.FirstOrDefault(a => a.IdPresencaEvento == id)!;
        }

        public void Deletar(Guid id)
        {
            PresencaEvento presencasEvento = c.PresencaEvento.Find(id)!;

            if (presencasEvento != null)
            {
                c.PresencaEvento.Remove(presencasEvento);
            }

           c.SaveChanges();
        }

        public void Inscrever(PresencaEvento inscricao)
        {
            c.PresencaEvento.Add(inscricao);

            c.SaveChanges();
        }

        public List<PresencaEvento> Listar()
        {
            return c.PresencaEvento.ToList();
        }

        public List<PresencaEvento> ListarMinhas(Guid id)
        {
            return c.PresencaEvento.Where(presencaEvento => presencaEvento.IdUsuario == id).ToList();

        }
    }
}
