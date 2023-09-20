using webapi.eventplus.Domains;

namespace webapi.eventplus.Interfaces
{
    public interface IComentarioEventoRepository
    {
        void Cadastrar(ComentarioEvento comentarioEvento);
        void Deletar(Guid id);
        List<ComentarioEvento> Listar();
        ComentarioEvento BuscarPorId(Guid id);
    }
}
