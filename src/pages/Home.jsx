import React from "react";
import { Categories, SortPopup, PizzaBlock, LoadingBlock } from "../components";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";

const availableCategories = [
  "Мясные",
  "Вегетерианская",
  "Гриль",
  "Острые",
  "Сладкие",
  "Закрытые",
];

const availableSorting = [
  // вместо массива строк, передаем массив объектов
  { name: "популярности", type: "popular" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "name" },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]); // если мы выбираем категории или сортировку то запрашиваем пиццы

  // Используем useCallback чтобы ссылка не менялась,
  // благодаря этому ф-ция создается только один раз,
  // взаимодействует с MEMO в Categories и SortPopup
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddPizzaToCart = obj => {
    dispatch(addPizzaToCart);
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoryIndex={category}
          showMeCategory={onSelectCategory}
          items={availableCategories}
        />
        <SortPopup
          activeSortType={sortBy}
          items={availableSorting}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={obj.id}
                isLoading={true}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <LoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;

// в пропсах вместо набора этого name={obj.name} imageUrl={obj.imageUrl}
// можем написать просто {...obj}, это означает что все свойства находящиеся внутри объекта
// будут проброшены
// "dev": "json-server -p 3001 -w public/db.json"
