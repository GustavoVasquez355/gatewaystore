import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FacturaComponentsPage, FacturaDeleteDialog, FacturaUpdatePage } from './factura.page-object';

const expect = chai.expect;

describe('Factura e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let facturaComponentsPage: FacturaComponentsPage;
  let facturaUpdatePage: FacturaUpdatePage;
  let facturaDeleteDialog: FacturaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Facturas', async () => {
    await navBarPage.goToEntity('factura');
    facturaComponentsPage = new FacturaComponentsPage();
    await browser.wait(ec.visibilityOf(facturaComponentsPage.title), 5000);
    expect(await facturaComponentsPage.getTitle()).to.eq('gatewaystoreApp.factura.home.title');
    await browser.wait(ec.or(ec.visibilityOf(facturaComponentsPage.entities), ec.visibilityOf(facturaComponentsPage.noResult)), 1000);
  });

  it('should load create Factura page', async () => {
    await facturaComponentsPage.clickOnCreateButton();
    facturaUpdatePage = new FacturaUpdatePage();
    expect(await facturaUpdatePage.getPageTitle()).to.eq('gatewaystoreApp.factura.home.createOrEditLabel');
    await facturaUpdatePage.cancel();
  });

  it('should create and save Facturas', async () => {
    const nbButtonsBeforeCreate = await facturaComponentsPage.countDeleteButtons();

    await facturaComponentsPage.clickOnCreateButton();

    await promise.all([
      facturaUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      facturaUpdatePage.setValorInput('5'),
      facturaUpdatePage.setFachaPagoInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);

    expect(await facturaUpdatePage.getFechaInput()).to.contain('2001-01-01T02:30', 'Expected fecha value to be equals to 2000-12-31');
    expect(await facturaUpdatePage.getValorInput()).to.eq('5', 'Expected valor value to be equals to 5');
    expect(await facturaUpdatePage.getFachaPagoInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fachaPago value to be equals to 2000-12-31'
    );

    await facturaUpdatePage.save();
    expect(await facturaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await facturaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Factura', async () => {
    const nbButtonsBeforeDelete = await facturaComponentsPage.countDeleteButtons();
    await facturaComponentsPage.clickOnLastDeleteButton();

    facturaDeleteDialog = new FacturaDeleteDialog();
    expect(await facturaDeleteDialog.getDialogTitle()).to.eq('gatewaystoreApp.factura.delete.question');
    await facturaDeleteDialog.clickOnConfirmButton();

    expect(await facturaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
