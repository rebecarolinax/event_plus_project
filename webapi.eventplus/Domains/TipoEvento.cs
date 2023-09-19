using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.eventplus.Domains
{
    [Table(nameof(TipoEvento))]
    public class TipoEvento
    {
        [Key]
        public Guid IdTipoEvento { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "Título do evento é obrigatório!")]
        public string? Titulo { get; set; }
    }
}
