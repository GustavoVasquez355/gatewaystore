import { element, by, ElementFinder } from 'protractor';

export class NotificacionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-notificacion div table .btn-danger'));
  title = element.all(by.css('jhi-notificacion div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class NotificacionUpdatePage {
  pageTitle = element(by.id('jhi-notificacion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fechaInput = element(by.id('field_fecha'));
  mensajeInput = element(by.id('field_mensaje'));
  fechaSendInput = element(by.id('field_fechaSend'));
  userIdInput = element(by.id('field_userId'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFechaInput(fecha: string): Promise<void> {
    await this.fechaInput.sendKeys(fecha);
  }

  async getFechaInput(): Promise<string> {
    return await this.fechaInput.getAttribute('value');
  }

  async setMensajeInput(mensaje: string): Promise<void> {
    await this.mensajeInput.sendKeys(mensaje);
  }

  async getMensajeInput(): Promise<string> {
    return await this.mensajeInput.getAttribute('value');
  }

  async setFechaSendInput(fechaSend: string): Promise<void> {
    await this.fechaSendInput.sendKeys(fechaSend);
  }

  async getFechaSendInput(): Promise<string> {
    return await this.fechaSendInput.getAttribute('value');
  }

  async setUserIdInput(userId: string): Promise<void> {
    await this.userIdInput.sendKeys(userId);
  }

  async getUserIdInput(): Promise<string> {
    return await this.userIdInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class NotificacionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-notificacion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-notificacion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
