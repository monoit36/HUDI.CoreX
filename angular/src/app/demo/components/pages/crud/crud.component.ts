import { Component, OnInit } from '@angular/core';
import { DemoProductDto, DemoProductServiceProxy, CreateDemoProductDto, UpdateDemoProductDto } from '@shared/service-proxies/service-proxies';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: DemoProductDto[] = [];

    product: any = {}; // Use any here temporarily to handle form data and validation

    selectedProducts: DemoProductDto[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private demoProductService: DemoProductServiceProxy, private messageService: MessageService) { }

    ngOnInit() {
        this.loadProducts();

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'INSTOCK' },
            { label: 'LOWSTOCK', value: 'LOWSTOCK' },
            { label: 'OUTOFSTOCK', value: 'OUTOFSTOCK' }
        ];
    }

    loadProducts() {
        this.demoProductService.getAll('', 0, 1000).subscribe(result => {
            this.products = result.items || [];
        });
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: any) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: any) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        
        let idsToDelete = this.selectedProducts.map(p => p.id);
        
        // Optionally create a loop to delete them via service, then reload:
        idsToDelete.forEach(id => {
            if (id !== undefined) {
                 this.demoProductService.delete(id).subscribe(() => {
                     this.loadProducts();
                 });
            }
        });

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        if (this.product.id) {
             this.demoProductService.delete(this.product.id).subscribe(() => {
                 this.loadProducts();
             });
        }
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // Update
                let updateDto = new UpdateDemoProductDto();
                updateDto.init(this.product);
                this.demoProductService.update(updateDto).subscribe(() => {
                     this.loadProducts();
                     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                });
            } else {
                // Create
                let createDto = new CreateDemoProductDto();
                createDto.init(this.product);
                this.demoProductService.create(createDto).subscribe(() => {
                     this.loadProducts();
                     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                });
            }

            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
