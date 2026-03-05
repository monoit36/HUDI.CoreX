import { CoreXTemplatePage } from './app.po';

describe('CoreX App', function() {
  let page: CoreXTemplatePage;

  beforeEach(() => {
    page = new CoreXTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
