import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { NotificacionComponentsPage, NotificacionDeleteDialog, NotificacionUpdatePage } from './notificacion.page-object';

const expect = chai.expect;

describe('Notificacion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let notificacionComponentsPage: NotificacionComponentsPage;
  let notificacionUpdatePage: NotificacionUpdatePage;
  let notificacionDeleteDialog: NotificacionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Notificacions', async () => {
    await navBarPage.goToEntity('notificacion');
    notificacionComponentsPage = new NotificacionComponentsPage();
    await browser.wait(ec.visibilityOf(notificacionComponentsPage.title), 5000);
    expect(await notificacionComponentsPage.getTitle()).to.eq('gatewaystoreApp.notificacionesmicroservicioNotificacion.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(notificacionComponentsPage.entities), ec.visibilityOf(notificacionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Notificacion page', async () => {
    await notificacionComponentsPage.clickOnCreateButton();
    notificacionUpdatePage = new NotificacionUpdatePage();
    expect(await notificacionUpdatePage.getPageTitle()).to.eq(
      'gatewaystoreApp.notificacionesmicroservicioNotificacion.home.createOrEditLabel'
    );
    await notificacionUpdatePage.cancel();
  });

  it('should create and save Notificacions', async () => {
    const nbButtonsBeforeCreate = await notificacionComponentsPage.countDeleteButtons();

    await notificacionComponentsPage.clickOnCreateButton();

    await promise.all([
      notificacionUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      notificacionUpdatePage.setMensajeInput('mensaje'),
      notificacionUpdatePage.setFechaSendInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      notificacionUpdatePage.setUserIdInput('5')
    ]);

    expect(await notificacionUpdatePage.getFechaInput()).to.contain('2001-01-01T02:30', 'Expected fecha value to be equals to 2000-12-31');
    expect(await notificacionUpdatePage.getMensajeInput()).to.eq('mensaje', 'Expected Mensaje value to be equals to mensaje');
    expect(await notificacionUpdatePage.getFechaSendInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fechaSend value to be equals to 2000-12-31'
    );
    expect(await notificacionUpdatePage.getUserIdInput()).to.eq('5', 'Expected userId value to be equals to 5');

    await notificacionUpdatePage.save();
    expect(await notificacionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await notificacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Notificacion', async () => {
    const nbButtonsBeforeDelete = await notificacionComponentsPage.countDeleteButtons();
    await notificacionComponentsPage.clickOnLastDeleteButton();

    notificacionDeleteDialog = new NotificacionDeleteDialog();
    expect(await notificacionDeleteDialog.getDialogTitle()).to.eq(
      'gatewaystoreApp.notificacionesmicroservicioNotificacion.delete.question'
    );
    await notificacionDeleteDialog.clickOnConfirmButton();

    expect(await notificacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
