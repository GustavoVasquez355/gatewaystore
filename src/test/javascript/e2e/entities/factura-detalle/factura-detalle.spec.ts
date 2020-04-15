import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FacturaDetalleComponentsPage, FacturaDetalleDeleteDialog, FacturaDetalleUpdatePage } from './factura-detalle.page-object';

const expect = chai.expect;

describe('FacturaDetalle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let facturaDetalleComponentsPage: FacturaDetalleComponentsPage;
  let facturaDetalleUpdatePage: FacturaDetalleUpdatePage;
  let facturaDetalleDeleteDialog: FacturaDetalleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FacturaDetalles', async () => {
    await navBarPage.goToEntity('factura-detalle');
    facturaDetalleComponentsPage = new FacturaDetalleComponentsPage();
    await browser.wait(ec.visibilityOf(facturaDetalleComponentsPage.title), 5000);
    expect(await facturaDetalleComponentsPage.getTitle()).to.eq('gatewaystoreApp.facturaDetalle.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(facturaDetalleComponentsPage.entities), ec.visibilityOf(facturaDetalleComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FacturaDetalle page', async () => {
    await facturaDetalleComponentsPage.clickOnCreateButton();
    facturaDetalleUpdatePage = new FacturaDetalleUpdatePage();
    expect(await facturaDetalleUpdatePage.getPageTitle()).to.eq('gatewaystoreApp.facturaDetalle.home.createOrEditLabel');
    await facturaDetalleUpdatePage.cancel();
  });

  it('should create and save FacturaDetalles', async () => {
    const nbButtonsBeforeCreate = await facturaDetalleComponentsPage.countDeleteButtons();

    await facturaDetalleComponentsPage.clickOnCreateButton();

    await promise.all([
      facturaDetalleUpdatePage.setProductoIdInput('5'),
      facturaDetalleUpdatePage.setCantidadInput('5'),
      facturaDetalleUpdatePage.setPrecioUnictarioInput('5')
    ]);

    expect(await facturaDetalleUpdatePage.getProductoIdInput()).to.eq('5', 'Expected productoId value to be equals to 5');
    expect(await facturaDetalleUpdatePage.getCantidadInput()).to.eq('5', 'Expected cantidad value to be equals to 5');
    expect(await facturaDetalleUpdatePage.getPrecioUnictarioInput()).to.eq('5', 'Expected precioUnictario value to be equals to 5');

    await facturaDetalleUpdatePage.save();
    expect(await facturaDetalleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await facturaDetalleComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last FacturaDetalle', async () => {
    const nbButtonsBeforeDelete = await facturaDetalleComponentsPage.countDeleteButtons();
    await facturaDetalleComponentsPage.clickOnLastDeleteButton();

    facturaDetalleDeleteDialog = new FacturaDetalleDeleteDialog();
    expect(await facturaDetalleDeleteDialog.getDialogTitle()).to.eq('gatewaystoreApp.facturaDetalle.delete.question');
    await facturaDetalleDeleteDialog.clickOnConfirmButton();

    expect(await facturaDetalleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
