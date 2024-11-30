const searchBar = document.getElementById('searchBar');
const sortDropdown = document.getElementById('sortDropdown');
const categoryDropdown = document.getElementById('categoryDropdown');
const productCards = document.querySelectorAll('.product-card');

searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase();
  productCards.forEach(card => {
    const productName = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = productName.includes(searchTerm) ? '' : 'none';
  });
});


function sortProducts(order, sortBy) {
  const productContainer = document.querySelector('.product-container');
  const products = Array.from(productCards);
  
  products.sort((a, b) => {
    if (sortBy === 'price') {
      const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
      const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    } else {
      const nameA = a.querySelector('h3').textContent.toLowerCase();
      const nameB = b.querySelector('h3').textContent.toLowerCase();
      return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
  });

  products.forEach(card => productContainer.appendChild(card));
}

categoryDropdown.addEventListener('change', (e) => {
  const selectedCategory = e.target.value.toLowerCase();
  productCards.forEach(card => {
    const category = card.querySelector('.category').textContent.toLowerCase();
    card.style.display = !selectedCategory || category.includes(selectedCategory) ? '' : 'none';
  });
});



sortDropdown.addEventListener('change', (e) => {
  if (e.target.value) {
    const [sortBy, order] = e.target.value.split('-');
    sortProducts(order, sortBy);
  }
});
