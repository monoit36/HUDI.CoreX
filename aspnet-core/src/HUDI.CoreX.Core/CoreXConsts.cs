using HUDI.CoreX.Debugging;

namespace HUDI.CoreX
{
    public class CoreXConsts
    {
        public const string LocalizationSourceName = "CoreX";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "9ba3b084554548e7b55579b2bb9447d8";
    }
}
