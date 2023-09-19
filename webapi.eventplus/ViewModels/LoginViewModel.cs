using System.ComponentModel.DataAnnotations;

namespace webapi.eventplus.ViewModels
{
    public class LoginViewModel
    {
      [Required(ErrorMessage = "Email obrigatório!")]
      public string? Email { get; set; }

      [Required(ErrorMessage = "Senha obrigatória!")]
      public string? Senha { get; set; } 
    }
}
