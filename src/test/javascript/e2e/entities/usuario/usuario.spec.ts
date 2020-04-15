import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  UsuarioComponentsPage,
  /* UsuarioDeleteDialog, */
  UsuarioUpdatePage
} from './usuario.page-object';

const expect = chai.expect;

describe('Usuario e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let usuarioComponentsPage: UsuarioComponentsPage;
  let usuarioUpdatePage: UsuarioUpdatePage;
  /* let usuarioDeleteDialog: UsuarioDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Usuarios', async () => {
    await navBarPage.goToEntity('usuario');
    usuarioComponentsPage = new UsuarioComponentsPage();
    await browser.wait(ec.visibilityOf(usuarioComponentsPage.title), 5000);
    expect(await usuarioComponentsPage.getTitle()).to.eq('gatewaystoreApp.usuario.home.title');
    await browser.wait(ec.or(ec.visibilityOf(usuarioComponentsPage.entities), ec.visibilityOf(usuarioComponentsPage.noResult)), 1000);
  });

  it('should load create Usuario page', async () => {
    await usuarioComponentsPage.clickOnCreateButton();
    usuarioUpdatePage = new UsuarioUpdatePage();
    expect(await usuarioUpdatePage.getPageTitle()).to.eq('gatewaystoreApp.usuario.home.createOrEditLabel');
    await usuarioUpdatePage.cancel();
  });

  /* it('should create and save Usuarios', async () => {
        const nbButtonsBeforeCreate = await usuarioComponentsPage.countDeleteButtons();

        await usuarioComponentsPage.clickOnCreateButton();

        await promise.all([
            usuarioUpdatePage.setNombreInput('nombre'),
            usuarioUpdatePage.setApellidoInput('apellido'),
            usuarioUpdatePage.setDireccionInput('direccion'),
            usuarioUpdatePage.userSelectLastOption(),
        ]);

        expect(await usuarioUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
        expect(await usuarioUpdatePage.getApellidoInput()).to.eq('apellido', 'Expected Apellido value to be equals to apellido');
        expect(await usuarioUpdatePage.getDireccionInput()).to.eq('direccion', 'Expected Direccion value to be equals to direccion');

        await usuarioUpdatePage.save();
        expect(await usuarioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await usuarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Usuario', async () => {
        const nbButtonsBeforeDelete = await usuarioComponentsPage.countDeleteButtons();
        await usuarioComponentsPage.clickOnLastDeleteButton();

        usuarioDeleteDialog = new UsuarioDeleteDialog();
        expect(await usuarioDeleteDialog.getDialogTitle())
            .to.eq('gatewaystoreApp.usuario.delete.question');
        await usuarioDeleteDialog.clickOnConfirmButton();

        expect(await usuarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
