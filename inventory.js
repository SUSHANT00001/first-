const form = document.getElementById('inventoryForm');
const inventoryTable = document.getElementById('inventoryTable');
const saveButton = document.getElementById('saveInventory');
const viewButton = document.getElementById('viewInventory');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const medicineName = document.getElementById('medicineName').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${medicineName}</td>
        <td>${quantity}</td>
        <td>${price}</td>
        <td>
            <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            <button class="delete-saved-btn" onclick="deleteSavedItem('${medicineName}')">Delete Saved</button>
        </td>
    `;

    inventoryTable.appendChild(row);

    // Clear the form
    form.reset();
});

saveButton.addEventListener('click', function() {
    const rows = inventoryTable.querySelectorAll('tr');
    const inventory = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            inventory.push({
                medicineName: cells[0].textContent,
                quantity: cells[1].textContent,
                price: cells[2].textContent
            });
        }
    });

    localStorage.setItem('inventory', JSON.stringify(inventory));
    alert('Inventory saved successfully!');
});

viewButton.addEventListener('click', function() {
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
        const inventory = JSON.parse(savedInventory);
        inventoryTable.innerHTML = ''; // Clear the table before loading
        inventory.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.medicineName}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td>
                    <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
                    <button class="delete-saved-btn" onclick="deleteSavedItem('${item.medicineName}')">Delete Saved</button>
                </td>
            `;
            inventoryTable.appendChild(row);
        });
        alert('Previous inventory loaded successfully!');
    } else {
        alert('No saved inventory found!');
    }
});

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    inventoryTable.removeChild(row);
}

function deleteSavedItem(medicineName) {
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
        let inventory = JSON.parse(savedInventory);
        inventory = inventory.filter(item => item.medicineName !== medicineName);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        alert(`Saved item "${medicineName}" deleted successfully!`);
        viewButton.click(); // Refresh the table
    } else {
        alert('No saved inventory found!');
    }
}