﻿using webapi.eventplus.Contexts;
using webapi.eventplus.Domains;
using webapi.eventplus.Interfaces;

namespace webapi.eventplus.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        private readonly EventContext c;
        public TipoUsuarioRepository()
        {
            c = new EventContext();
        }
        public void Atualizar(Guid id, TipoUsuario usuarioAtualizado)
        {
            throw new NotImplementedException();
        }

        public TipoUsuario BuscarPorId(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Cadastrar(TipoUsuario usuarioCadastrado)
        {
            try
            {
                c.TipoUsuario.Add(usuarioCadastrado);
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
                TipoUsuario usuarioBuscado = c.TipoUsuario.Find(id)!;

                c.TipoUsuario.Remove(usuarioBuscado);

                c.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<TipoUsuario> ListarTodos()
        {
            try
            {
               return c.TipoUsuario.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
