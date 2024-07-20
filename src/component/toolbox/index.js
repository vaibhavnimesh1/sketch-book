import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { changeColor, changeBrushSize } from "@/slice/toolboxSlice";
import cx from "classnames";
import { COLORS, MENU_ITEMS } from "@/constants";
const Toolbox = () => {
  const dispatch = useDispatch();
  const menuItemClick = useSelector((state) => state.menu.activeMenuItem);
  const { color } = useSelector((state) => state.toolbox[menuItemClick]);
  const showPencil = menuItemClick === MENU_ITEMS.PENCIL;
  const showEraser = menuItemClick === MENU_ITEMS.ERASER;
  const updateColor = (newColor) => {
    dispatch(changeColor({ item: menuItemClick, color: newColor }));
  };
  const updateBrushSize = (e) => {
    dispatch(
      changeBrushSize({ item: menuItemClick, brushSize: e.target.value })
    );
  };
  return (
    <div className={styles.toolboxContainer}>
      {showPencil && (
        <>
          <div className={styles.toolItem}>
            <h4 className={styles.toolText}>Stroke Color</h4>
            <div className={styles.itemContainer}>
              <div
                className={cx(styles.colorBox, {
                  [styles.active]: color === COLORS.BLACK,
                })}
                style={{ backgroundColor: COLORS.BLACK }}
                onClick={() => updateColor(COLORS.BLACK)}
              />
              <div
                className={cx(styles.colorBox, {
                  [styles.active]: color === COLORS.RED,
                })}
                style={{ backgroundColor: COLORS.RED }}
                onClick={() => updateColor(COLORS.RED)}
              />
              <div
                className={cx(styles.colorBox, {
                  [styles.active]: color === COLORS.GREEN,
                })}
                style={{ backgroundColor: COLORS.GREEN }}
                onClick={() => updateColor(COLORS.GREEN)}
              />
              <div
                className={cx(styles.colorBox, {
                  [styles.active]: color === COLORS.BLUE,
                })}
                style={{ backgroundColor: COLORS.BLUE }}
                onClick={() => updateColor(COLORS.BLUE)}
              />
              <div
                className={cx(styles.colorBox, {
                  [styles.active]: color === COLORS.ORANGE,
                })}
                style={{ backgroundColor: COLORS.ORANGE }}
                onClick={() => updateColor(COLORS.ORANGE)}
              />
              <div
                className={cx(styles.colorBox, {
                  [styles.active]: color === COLORS.YELLOW,
                })}
                style={{ backgroundColor: COLORS.YELLOW }}
                onClick={() => updateColor(COLORS.YELLOW)}
              />
            </div>
          </div>
          <div className={styles.toolItem}>
            <h4 className={styles.toolText}>Brush Size</h4>
            <div className={styles.itemContainer}>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                onChange={updateBrushSize}
              />
            </div>
          </div>
        </>
      )}
      {showEraser && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { Toolbox };
