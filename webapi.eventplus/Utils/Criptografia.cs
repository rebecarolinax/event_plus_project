namespace webapi.eventplus.Utils
{
    public static class Criptografia
    {
        public static string GerarHash(string senha)
        {
            return BCrypt.Net.BCrypt.HashPassword(senha);
        }
        public static bool CompararHash(string senhaForm, string senhaBanc)
        {
            return BCrypt.Net.BCrypt.Verify(senhaForm, senhaBanc);
        }
    }
}
