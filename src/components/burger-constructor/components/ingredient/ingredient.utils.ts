import { SyntheticEvent, useRef } from "react";

/** Костыль, чтобы предотвратить клик по ингредиенту при клике по кнопке удаления. */
export const useOnIngredientClick = (cb: () => void) => {
  const DELETE_BUTTON_SELECTOR = ".constructor-element__action";
  const containerRef = useRef<HTMLDivElement>(null);

  const onClick = (evt: SyntheticEvent) => {
    if (!containerRef.current) return;

    const deleteButtonElement = containerRef.current.querySelector(
      DELETE_BUTTON_SELECTOR
    )!;
    const targetElement = evt.target as Node;

    if (!deleteButtonElement.contains(targetElement)) {
      cb();
    }
  };

  return { containerRef, onClick };
};
