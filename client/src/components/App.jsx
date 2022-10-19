import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmOrderBtn from "./ConfirmOrderBtn";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizzas, setSelected] = useState([]);

  function AddPizza(event) {
    const { name, value } = event.target;

    setSelected((prevSelected) => {
      let duplicate = false;
      const newSelected = prevSelected.map((selected) => {
        if (selected.name === name) {
          selected.quantity += 1;
          duplicate = true;
        }
        return selected;
      });
      if (duplicate) return newSelected;
      else
        return [
          ...prevSelected,
          {
            name: name,
            price: value,
            quantity: 1,
          },
        ];
    });
  }

  useEffect(() => {
    const allPizzas = axios.create({
      baseURL: "/api/pizzas",
    });

    allPizzas
      .get()
      // .then((response) => {
      //   console.log(response.data);
      // })
      .then((data) => {
        setPizzas(data.data.data.pizzas);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <section className="section-pizzas">
        <div className="container center-text">
          <h2 className="heading-secondary">Pizza Order App</h2>
        </div>
        <div class="container grid grid--3-cols margin-bottom-md">
          {pizzas.map((pizza, index) => {
            return (
              <div className="pizza-card">
                <ul>
                  <li className="pizza-li">
                    <h3 className="subheading">{pizza.name}</h3>
                    <p>
                      <strong>Price ${pizza.price}</strong>
                    </p>
                    <span>
                      <strong>Ingredients</strong>
                    </span>
                    <ul>
                      {pizza.ingredients.map((ing) => {
                        return <li>{ing}</li>;
                      })}
                    </ul>
                  </li>
                </ul>
                <button
                  onClick={AddPizza}
                  name={pizza.name}
                  value={pizza.price}
                  className="btn-custom btn-add"
                >
                  Add
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <ConfirmOrderBtn
        key={1}
        selectedPizzas={selectedPizzas}
        setSelected={setSelected}
      />
    </div>
  );
}

export default App;
