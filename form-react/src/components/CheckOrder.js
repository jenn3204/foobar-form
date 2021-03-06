import React, { useState } from "react";
import styles from "./CheckOrder.modules.css";
import { useHistory } from "react-router-dom";
import EditAmount from "./EditAmount.js";
import Mug from "./Mug.js";
import { useMediaPredicate } from "react-media-hook";
import ButtonBack from "./ButtonBack";

// import buttonStyles from "./PaymentScreen.module.css";
export default function CheckOrder(props) {
  let history = useHistory();
  const isMin615px = useMediaPredicate("(min-width: 615px)");
  const [info, setInfo] = useState(props.orders);

  function editOrder() {
    return (
      <>
        <section id="checkOrder-grid">
          {info.map((data) => {
            if (data.name !== undefined) {
              return (
                <article id="editWrapper" key={data.name}>
                  {console.log(data.count)}
                  <div className="mug">
                    <Mug name={data.name} />
                  </div>
                  <h3>{data.name}</h3>
                  <h4>{data.count * 25} kr</h4>
                  <EditAmount id="check-order-amount" startAt={data.count} page={"CheckOrder"} countBeers={{ count: data.count, name: data.name }} onClickButton={amountOfBeer} />
                </article>
              );
            }
          })}
        </section>
      </>
    );
  }

  function amountOfBeer(beers) {
    const nextState = [...info];
    if (beers.count === 0) {
      const withoutBeer = nextState.filter((order) => order.name !== beers.name);
      setInfo(withoutBeer);
    } else {
      const newState = nextState.map((obj) => (obj.name === beers.name ? beers : obj));
      setInfo(newState);
    }
  }

  function totalCount() {
    let total = 0;

    info.forEach((elm) => {
      if (elm.name !== undefined) {
        total = elm.count + total;
      }
    });
    return total;
  }
  return (
    <main id="checkOrder">
      {isMin615px ? (
        <article id="editOrder">
          <h2>Edit your order</h2>
          {editOrder()}
          <div
            onClick={() => {
              props.sendBackOrders(info);
              props.getState("Gone back");
              history.push("/select");
            }}
            className="checkOrderBackButton"
          >
            {" "}
            <ButtonBack />
          </div>
        </article>
      ) : (
        <article id="editOrder">
          <details>
            <summary>Edit your order</summary>
            {editOrder()}
          </details>
          <div className="checkOrderBackButton">
            {" "}
            <ButtonBack />
          </div>
        </article>
      )}

      <article id="your-order">
        <h2>Your order</h2>

        {info.map((data) => {
          if (data.name !== undefined) {
            return (
              <article id="amountWrapperCheckOrder" key={info.indexOf(data)}>
                <h3 className="name">
                  {data.name} x {data.count}
                </h3>
                <h4>{data.count * 25} kr</h4>
              </article>
            );
          }
        })}
        <section id="allWrapper">
          <h2 id="beerAmount">Total: {totalCount()}</h2>
          <section>
            <h3 className="allBeers">{totalCount() * 25} kr</h3>
          </section>
        </section>
        <button
          disabled={totalCount() === 0}
          id="goToPayment"
          className="navigationButton"
          onClick={() => {
            props.sendBackOrders(info);
            history.push("/payment");
          }}
        >
          Go to payment
        </button>
      </article>
    </main>
  );
}
