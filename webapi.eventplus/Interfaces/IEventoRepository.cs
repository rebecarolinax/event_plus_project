using webapi.eventplus.Domains;

namespace webapi.eventplus.Interfaces
{
    public interface IEventoRepository
    {
        void Cadastrar(Evento eventoCadastrado);
        List<Evento> ListarTodos();
        void Atualizar(Guid id, Evento eventoAtualizado);
        void Deletar(Guid id);
        Evento BuscarPorId(Guid id);
    }
}
