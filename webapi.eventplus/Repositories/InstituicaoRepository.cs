using webapi.eventplus.Contexts;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;

namespace webapi.eventplus.Repositories
{
    public class InstituicaoRepository : IInstituicaoRepository
    {
        private readonly EventContext c;

        public InstituicaoRepository()
        {
            c = new EventContext();
        }

        public void Cadastrar(Instituicao instituicaoCadastrada)
        {
            try
            {
                c.Add(instituicaoCadastrada);
                c.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
