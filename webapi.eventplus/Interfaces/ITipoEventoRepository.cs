using webapi.eventplus.Domains;

namespace webapi.eventplus.Interfaces
{
    public interface ITipoEventoRepository
    {
        void Cadastrar(TipoEvento eventoCadastrado);
        List<TipoEvento> ListarTodos();
        void Atualizar(Guid id, TipoEvento eventoAtualizado);
        void Deletar(Guid id);
        TipoEvento BuscarPorId(Guid id);
    }
}
