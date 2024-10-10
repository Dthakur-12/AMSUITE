import React from "react";
import "../../../assets/styles/Shared_Styles/ButtonWithLoader/ButtonWithLoader.scss";
import { default as classNames } from "classnames";

const ButtonWithLoader = props => {
  return (
    <React.Fragment>
      <div style={{ width: 240, height: 63 }}>
        <svg x="0px" y="0px" viewBox="0 0 240 63">
          <line
            class="st6 dashed-line dash-move-opposite"
            x1="0"
            y1="30"
            x2="240"
            y2="30"
          />
        </svg>
      </div>

      <button
        onClick={props.onClick}
        className={classNames(
          "order",
          props.isLoading && "animate",
          props.isSuccess && props.animationEnd && "animateSuccess"
        )}
        onAnimationEnd={props.onAnimationEnd}
      >
        <span className="default">Enviar</span>

        {!props.isLoading && (
          <span className="success">
            Finalizar
            <svg viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>
        )}

        <div className="box"></div>
        <div className="truck">
          <div className="back"></div>
          <div className="front">
            <div className="windows"></div>
          </div>
          <div className="light top"></div>
          <div className="light bottom"></div>
        </div>

        <div className="lines">
          <svg x="0px" y="0px" viewBox="0 0 240 63">
            <line
              class="st6 dashed-line dash-move"
              x1="0"
              y1="30"
              x2="240"
              y2="30"
            />
          </svg>
        </div>
      </button>
    </React.Fragment>
  );
};

export default ButtonWithLoader;
