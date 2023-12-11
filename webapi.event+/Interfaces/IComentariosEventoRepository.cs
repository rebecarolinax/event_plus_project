using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface IComentariosEventoRepository
    {
        void Cadastrar(ComentariosEvento comentarioEvento);
        void Deletar(Guid id);
        List<ComentariosEvento> Listar();
        List<ComentariosEvento> ListarSomenteExibe();
        ComentariosEvento BuscarPorId(Guid id);

        ComentariosEvento BuscarPorIdUsuario(Guid idUsuario, Guid idEvento);
    }
}
