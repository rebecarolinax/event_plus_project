using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.eventplus.Domains
{
    [Table(nameof(Evento))]
    public class Evento
    {
        [Key]
        public Guid IdEvento { get; set; } = Guid.NewGuid();

        [Column(TypeName = "DATE")]
        [Required(ErrorMessage = "Data do evento é obrigatória!")]
        public DateTime DataEvento { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "Nome do evento é obrigatório!")]
        public string? NomeEvento { get; set; }

        [Column(TypeName = "TEXT")]
        [Required(ErrorMessage = "Descrição do evento é obrigatória!")]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "Tipo de evento é obrigatório!")]
        public Guid IdTipoEvento { get; set; }

        [ForeignKey(nameof(IdTipoEvento))]
        public TipoEvento? TipoEvento { get; set; }

        [Required(ErrorMessage = "A instituição é obrigátoria!")]
        public Guid IdInstituicao { get; set; }

        [ForeignKey(nameof(IdInstituicao))]
        public Instituicao? Instituicao { get; set; }

    }
}
