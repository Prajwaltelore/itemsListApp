import { Component } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  items: any[] = [];
  filteredItems: any[] = [];
  filterText: string = '';
  sortField: string = 'id';
  sortDirection: string = 'asc';

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      this.filteredItems = [...this.items];
      this.applySort();
    });
  }

  filterItems(): void {
    const lowerCaseFilterText = this.filterText.toLowerCase();

    this.filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(lowerCaseFilterText) || 
      item.id.toString().includes(lowerCaseFilterText) 
    );

    this.applySort(); 
  }
  applySort(): void {
    const sortMultiplier = this.sortDirection === 'asc' ? 1 : -1;
    
    this.filteredItems.sort((a, b) => {
      let valueA = a[this.sortField];
      let valueB = b[this.sortField];

      // For sorting by title, convert strings to lowercase to ensure case-insensitive sorting
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return -1 * sortMultiplier;
      if (valueA > valueB) return 1 * sortMultiplier;
      return 0;
    });
  }

  // Handle changes to the sort field (id or title)
  onSortFieldChange(): void {
    this.applySort();
  }

  // Handle changes to the sort direction (ascending or descending)
  onSortDirectionChange(): void {
    this.applySort();
  }
}
