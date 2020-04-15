import { element, by, ElementFinder } from 'protractor';

export class ClienteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cliente div table .btn-danger'));
  title = element.all(by.css('jhi-cliente div h2#page-heading span')).first();
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

export class ClienteUpdatePage {
  pageTitle = element(by.id('jhi-cliente-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nombreInput = element(by.id('field_nombre'));
  apellidoInput = element(by.id('field_apellido'));
  identificacionInput = element(by.id('field_identificacion'));

  facturaSelect = element(by.id('field_factura'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async setApellidoInput(apellido: string): Promise<void> {
    await this.apellidoInput.sendKeys(apellido);
  }

  async getApellidoInput(): Promise<string> {
    return await this.apellidoInput.getAttribute('value');
  }

  async setIdentificacionInput(identificacion: string): Promise<void> {
    await this.identificacionInput.sendKeys(identificacion);
  }

  async getIdentificacionInput(): Promise<string> {
    return await this.identificacionInput.getAttribute('value');
  }

  async facturaSelectLastOption(): Promise<void> {
    await this.facturaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async facturaSelectOption(option: string): Promise<void> {
    await this.facturaSelect.sendKeys(option);
  }

  getFacturaSelect(): ElementFinder {
    return this.facturaSelect;
  }

  async getFacturaSelectedOption(): Promise<string> {
    return await this.facturaSelect.element(by.css('option:checked')).getText();
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

export class ClienteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cliente-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cliente'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
