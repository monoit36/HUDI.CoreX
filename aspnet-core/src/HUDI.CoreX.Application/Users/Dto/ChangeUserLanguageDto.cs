using System.ComponentModel.DataAnnotations;

namespace HUDI.CoreX.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}