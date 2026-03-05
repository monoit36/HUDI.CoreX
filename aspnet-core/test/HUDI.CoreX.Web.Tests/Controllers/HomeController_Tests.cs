using System.Threading.Tasks;
using HUDI.CoreX.Models.TokenAuth;
using HUDI.CoreX.Web.Controllers;
using Shouldly;
using Xunit;

namespace HUDI.CoreX.Web.Tests.Controllers
{
    public class HomeController_Tests: CoreXWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}