import React from "react";
import { Link } from "react-router-dom";
import EndingStt from "./EndingStt";
import EndingMsg from "./EndingMsg";
import ButtonEnding from "./ButtonEnding";

import styles from "./EndingStatusBox.module.css";

export default function EndingStatusBox(props) {
  return (
    <article className={styles.endingStatusBox}>
      <div>
        {" "}
        <h2>We will be handling your order very soon!</h2>
        <h2>You can keep track with your order on this screen.</h2>
      </div>
      <div>
        <h3>Status:</h3>
        <EndingStt />
        <EndingMsg />
      </div>
      <Link to="/">
        <ButtonEnding />
      </Link>
      {props.children}
    </article>
  );
}
