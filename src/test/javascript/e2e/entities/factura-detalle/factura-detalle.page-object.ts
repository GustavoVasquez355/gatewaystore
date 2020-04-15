import { element, by, ElementFinder } from 'protractor';

export class FacturaDetalleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-factura-detalle div table .btn-danger'));
  title = element.all(by.css('jhi-factura-detalle div h2#page-heading span')).first();
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

export class FacturaDetalleUpdatePage {
  pageTitle = element(by.id('jhi-factura-detalle-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  productoIdInput = element(by.id('field_productoId'));
  cantidadInput = element(by.id('field_cantidad'));
  precioUnictarioInput = element(by.id('field_precioUnictario'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setProductoIdInput(productoId: string): Promise<void> {
    await this.productoIdInput.sendKeys(productoId);
  }

  async getProductoIdInput(): Promise<string> {
    return await this.productoIdInput.getAttribute('value');
  }

  async setCantidadInput(cantidad: string): Promise<void> {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput(): Promise<string> {
    return await this.cantidadInput.getAttribute('value');
  }

  async setPrecioUnictarioInput(precioUnictario: string): Promise<void> {
    await this.precioUnictarioInput.sendKeys(precioUnictario);
  }

  async getPrecioUnictarioInput(): Promise<string> {
    return await this.precioUnictarioInput.getAttribute('value');
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

export class FacturaDetalleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-facturaDetalle-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-facturaDetalle'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
