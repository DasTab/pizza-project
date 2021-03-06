import React, { useState } from "react";
import PropTypes from "prop-types";

// при вызове MEMO в Categories, ререндер не производится
// т.к делает лишь поверхностное сравнение (Н: сравнивает ссылку, но не сравнивает пропсы)
const Categories = React.memo(function Categories({
  activeCategoryIndex,
  items,
  showMeCategory,
}) {
  // const [activeItem, setActiveItem] = React.useState(null);

  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategoryIndex === null ? "active" : ""}
          onClick={() => showMeCategory(null)}
        >
          Все
        </li>
        {items &&
          items.map((categoryName, index) => (
            <li
              className={activeCategoryIndex === index ? "active" : ""}
              onClick={() => showMeCategory(index)}
              key={`${categoryName}_${index}`}
            >
              {categoryName}
            </li>
          ))}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  // activeCategoryIndex: PropTypes.oneOf([PropTypes.number, null]),
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  showMeCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = { activeCategoryIndex: null, items: [] };

export default Categories;

// строчка 9 означает что берем все данные из items <Categories />,
// и применяем к нему метод массива map
// далее переназначаем массив и даем ему имя categoryName,
// теперь в пропсах App.js <Categories /> мы можем рендерить необходимые <li>

// Если мы рендерим элементы с помощью map
// то добавляем key {index} чисто для уникальности па индексу, так как могут добавть такой же элемент,
// Н: "Мясные" [0], "Мясные"[1] и.т.д

// <li onClick={() => kickAss(categoryName)} key={`${categoryName}_${index}`}>{categoryName}</li>
// Хуки setState, сейчас при нажатии на категорию вызывается onClick
// После вместо kickAss(categoryName), вставим метод setActiveItem, он будет обновлять компонент (по индексу)

// Чтобы категория подсвечивалась черным  (т.е был класс active), добавляем ей
// следующую проверку className={activeItem === index ? 'active' : ''}

// items &&, защита если в items App.js ничего не будет (это простой JS!)
