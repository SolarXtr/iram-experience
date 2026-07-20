/**
 * datatable.js
 * Vanilla JS implementation for interactive data tables with sorting, filtering, and pagination.
 */

class InteractiveTable {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.data = options.data || [];
        this.columns = options.columns || [];
        this.pageSize = options.pageSize || 25; // Default 25
        this.currentPage = 1;
        this.sortCol = options.defaultSort || null;
        this.sortAsc = options.defaultSortAsc !== false;
        
        // Render wrappers
        this.container.innerHTML = `
            <div class="table-responsive">
                <table class="data-table interactive-table">
                    <thead><tr></tr></thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="pagination-controls" style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
                <div class="page-size-selector">
                    <label>Rows per page: 
                        <select class="pageSizeSelect" style="padding:4px; border-radius:4px; border:1px solid #ccc;">
                            <option value="25" ${this.pageSize === 25 ? 'selected' : ''}>25</option>
                            <option value="50" ${this.pageSize === 50 ? 'selected' : ''}>50</option>
                            <option value="100" ${this.pageSize === 100 ? 'selected' : ''}>100</option>
                            <option value="ALL" ${this.pageSize === 'ALL' ? 'selected' : ''}>All</option>
                        </select>
                    </label>
                </div>
                <div class="page-buttons" style="display:flex; gap:8px;"></div>
            </div>
        `;
        
        this.theadTr = this.container.querySelector('thead tr');
        this.tbody = this.container.querySelector('tbody');
        this.pageSizeSelect = this.container.querySelector('.pageSizeSelect');
        this.pageButtonsContainer = this.container.querySelector('.page-buttons');
        
        this.pageSizeSelect.addEventListener('change', (e) => {
            this.pageSize = e.target.value === 'ALL' ? 'ALL' : parseInt(e.target.value);
            this.currentPage = 1;
            this.render();
        });
        
        this.renderHeaders();
        this.render();
    }
    
    setData(newData) {
        this.data = newData;
        this.currentPage = 1;
        this.render();
    }
    
    renderHeaders() {
        this.theadTr.innerHTML = '';
        this.columns.forEach((col) => {
            const th = document.createElement('th');
            th.textContent = col.label;
            
            if (col.sortable !== false) {
                th.style.cursor = 'pointer';
                th.style.userSelect = 'none';
                
                const icon = document.createElement('span');
                icon.style.marginLeft = '8px';
                icon.style.fontSize = '0.8em';
                icon.innerHTML = '&#8597;'; // default arrows
                
                if (this.sortCol === col.key) {
                    icon.innerHTML = this.sortAsc ? '&#8593;' : '&#8595;';
                    th.style.color = 'var(--primary-color, #2980b9)';
                }
                
                th.appendChild(icon);
                
                th.addEventListener('click', () => {
                    if (this.sortCol === col.key) {
                        this.sortAsc = !this.sortAsc;
                    } else {
                        this.sortCol = col.key;
                        this.sortAsc = true;
                    }
                    this.renderHeaders(); // update icons
                    this.render();
                });
            }
            this.theadTr.appendChild(th);
        });
    }
    
    getProcessedData() {
        let processed = [...this.data];
        
        // Sort
        if (this.sortCol) {
            const colDef = this.columns.find(c => c.key === this.sortCol);
            processed.sort((a, b) => {
                let valA = a[this.sortCol];
                let valB = b[this.sortCol];
                
                // Custom sort function if defined
                if (colDef && colDef.sortFn) {
                    return this.sortAsc ? colDef.sortFn(a, b) : colDef.sortFn(b, a);
                }
                
                if (valA == null) valA = '';
                if (valB == null) valB = '';
                
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();
                
                if (valA < valB) return this.sortAsc ? -1 : 1;
                if (valA > valB) return this.sortAsc ? 1 : -1;
                return 0;
            });
        }
        
        return processed;
    }
    
    render() {
        let processedData = this.getProcessedData();
        
        // Pagination
        let totalItems = processedData.length;
        let totalPages = this.pageSize === 'ALL' ? 1 : Math.ceil(totalItems / this.pageSize);
        
        if (this.currentPage > totalPages && totalPages > 0) {
            this.currentPage = totalPages;
        }
        
        let pagedData = processedData;
        if (this.pageSize !== 'ALL') {
            const startIdx = (this.currentPage - 1) * this.pageSize;
            pagedData = processedData.slice(startIdx, startIdx + this.pageSize);
        }
        
        // Render Body
        this.tbody.innerHTML = '';
        if (pagedData.length === 0) {
            this.tbody.innerHTML = `<tr><td colspan="${this.columns.length}" style="text-align:center; padding:20px;">No data available</td></tr>`;
        } else {
            pagedData.forEach(row => {
                const tr = document.createElement('tr');
                this.columns.forEach(col => {
                    const td = document.createElement('td');
                    if (col.render) {
                        td.innerHTML = col.render(row[col.key], row);
                    } else {
                        td.textContent = row[col.key] || '';
                    }
                    tr.appendChild(td);
                });
                this.tbody.appendChild(tr);
            });
        }
        
        this.renderPaginationControls(totalPages);
    }
    
    renderPaginationControls(totalPages) {
        this.pageButtonsContainer.innerHTML = '';
        if (totalPages <= 1) return;
        
        const createBtn = (text, isDisabled, isPrimary, onClick) => {
            const btn = document.createElement('button');
            btn.innerHTML = text;
            btn.style.padding = '4px 10px';
            btn.style.border = '1px solid #ddd';
            btn.style.borderRadius = '4px';
            btn.style.background = isPrimary ? 'var(--primary-color, #2980b9)' : (isDisabled ? '#f9f9f9' : 'white');
            btn.style.color = isPrimary ? 'white' : (isDisabled ? '#aaa' : '#333');
            btn.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
            
            if (!isDisabled) {
                btn.addEventListener('click', onClick);
            }
            return btn;
        };
        
        // Prev
        this.pageButtonsContainer.appendChild(
            createBtn('&laquo; Prev', this.currentPage === 1, false, () => {
                this.currentPage--;
                this.render();
            })
        );
        
        // Page numbers
        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(totalPages, this.currentPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            this.pageButtonsContainer.appendChild(
                createBtn(i, false, i === this.currentPage, () => {
                    this.currentPage = i;
                    this.render();
                })
            );
        }
        
        // Next
        this.pageButtonsContainer.appendChild(
            createBtn('Next &raquo;', this.currentPage === totalPages, false, () => {
                this.currentPage++;
                this.render();
            })
        );
    }
}

window.InteractiveTable = InteractiveTable;
