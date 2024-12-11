// Получение категории из URL
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // Установка заголовка в зависимости от категории
    document.getElementById('catalogTitle').innerText = category;

    // Загрузка товаров на основе выбранной категории
    loadCatalogItems(category);
});

// Данные о товарах, структурированные для легкого доступа
const items = {
    'Цепи': {
        images: [
            { src: 'chain1.png', name: 'Цепь 1', description: 'Цепь из золота, цвет: желтый, вес: 10 г, цена: 500 BYN' },
            { src: 'chain2.png', name: 'Цепь 2', description: 'Цепь из белого золота, цвет: белый, вес: 12 г, цена: 600 BYN' },
            { src: 'chain3.png', name: 'Цепь 3', description: 'Цепь из серебра, цвет: серебряный, вес: 8 г, цена: 400 BYN' }
        ]
    },
    'Подвески': {
        images: [
            { src: 'pendant1.png', name: 'Подвеска 1', description: 'Подвеска из серебра, цвет: белый, вес: 5 г, цена: 300 BYN' },
            { src: 'pendant2.png', name: 'Подвеска 2', description: 'Подвеска с камнем, цвет: красный, вес: 6 г, цена: 350 BYN' },
            { src: 'pendant3.png', name: 'Подвеска 3', description: 'Подвеска из золота, цвет: желтый, вес: 4 г, цена: 450 BYN' }
        ]
    },
    'Кольца': {
        images: [
            { src: 'ring1.png', name: 'Кольцо 1', description: 'Кольцо с камнем, цвет: красный, вес: 8 г, цена: 700 BYN' },
            { src: 'ring2.png', name: 'Кольцо 2', description: 'Кольцо из белого золота, цвет: белый, вес: 9 г, цена: 800 BYN' },
            { src: 'ring3.png', name: 'Кольцо 3', description: 'Кольцо с сапфиром, цвет: синий, вес: 7 г, цена: 900 BYN' }
        ]
    },
    'Серьги': {
        images: [
            { src: 'earrings1.png', name: 'Серьги 1', description: 'Серьги из золота, цвет: желтый, вес: 4 г, цена: 400 BYN' },
            { src: 'earrings2.png', name: 'Серьги 2', description: 'Серьги с бриллиантами, цвет: белый, вес: 5 г, цена: 500 BYN' },
            { src: 'earrings3.png', name: 'Серьги 3', description: 'Серьги из серебра, цвет: серебряный, вес: 3 г, цена: 350 BYN' }
        ]
    }
};

let currentItem = null; // Хранит текущий выбранный товар

function loadCatalogItems(category) {
    const catalogItems = document.getElementById('catalogItems');
    catalogItems.innerHTML = ''; // Очистить предыдущие товары

    if (items[category]) {
        items[category].images.forEach((item) => {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.name; // Улучшено: используем имя товара в alt
            img.style.width = '200px'; // Задаем ширину для изображений
            img.style.margin = '10px'; // Добавляем отступ для пространства
            img.setAttribute('data-category', category); // Добавляем атрибут для поиска

            // Обработчик клика для отображения деталей товара
            img.onclick = () => {
                currentItem = item; // Сохраняем текущий товар
                showImageDetails(item); // Передаем объект item
            };
            catalogItems.appendChild(img);
        });
    } else {
        console.error('Категория не найдена:', category); // Для отладки
    }
}

function showImageDetails(item) {
    if (item && item.name && item.src && item.description) {
        document.getElementById('imageTitle').innerText = item.name; // Используем имя товара
        document.getElementById('selectedImage').src = item.src;
        document.getElementById('imageCharacteristics').innerText = item.description;

        // Показать детали изображения и скрыть каталог
        document.getElementById('imageDetails').style.display = 'block';
        document.getElementById('catalogItems').style.display = 'none'; // Скрыть каталог
    } else {
        console.error('Ошибка: недостающие данные для отображения товара', item); // Для отладки
        document.getElementById('imageTitle').innerText = 'Неизвестный товар'; // Резервный вариант
        document.getElementById('imageCharacteristics').innerText = 'Нет описания'; // Резервный вариант
    }
}

function goBack() {
    const category = document.getElementById('catalogTitle').innerText;
    loadCatalogItems(category); // Перезагрузить товары для выбранной категории
    document.getElementById('imageDetails').style.display = 'none'; // Скрыть детали изображения
    document.getElementById('catalogItems').style.display = 'block'; // Показать каталог
}

function goHome() {
    window.location.href = 'index.html'; // Перейти на главную страницу
}

// Функция поиска с предложениями
function searchItems() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = ''; // Очистить предыдущие предложения

    if (input) {
        Object.keys(items).forEach(category => {
            items[category].images.forEach(item => {
                if (item.name.toLowerCase().includes(input) || item.description.toLowerCase().includes(input)) {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.textContent = item.name;
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.onclick = () => {
                        document.getElementById('searchInput').value = item.name; // Установить в поле ввода
                        showImageDetails(item); // Показать детали товара
                        suggestions.innerHTML = ''; // Очистить предложения
                    };
                    suggestions.appendChild(suggestionItem);
                }
            });
        });
        suggestions.style.display = suggestions.innerHTML ? 'block' : 'none'; // Показать или скрыть предложения
    } else {
        suggestions.style.display = 'none'; // Скрыть предложения, если поле пустое
    }
}

// Добавление обработчика события для ввода
document.getElementById('searchInput').addEventListener('input', searchItems);

// Функции для избранного и корзины
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToFavorites() {
    if (currentItem && !favorites.some(fav => fav.src === currentItem.src)) {
        favorites.push(currentItem);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${currentItem.description} добавлено в Избранное!`);
    } else {
        alert(`${currentItem.description} уже в Избранном.`);
    }
}

function addToCart() {
    if (currentItem && !cart.some(cartItem => cartItem.src === currentItem.src)) {
        cart.push(currentItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${currentItem.description} добавлено в Корзину!`);
    } else {
        alert(`${currentItem.description} уже в Корзине.`);
    }
}