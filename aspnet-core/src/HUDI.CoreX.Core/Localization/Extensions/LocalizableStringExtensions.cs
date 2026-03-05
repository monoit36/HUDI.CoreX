using Abp.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HUDI.CoreX.Localization.Extensions
{
    public static class LocalizableStringExtensions
    {
        public static string GetRawString(this ILocalizableString localizableString)
        {
            return localizableString?.ToString();
        }
    }
}
