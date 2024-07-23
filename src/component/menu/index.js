import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "@/constants";
import { actionItemClick,menuItemClick} from "@/slice/menuSlice";
import cx from "classnames";

export const Menu = () => {
  const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    
    const handleMenuItemClick = (item) => {
      dispatch(menuItemClick(item));
      
  };
  const handleActioItemClick = (itemName) => {
    dispatch(actionItemClick(itemName))
}
  return (
    <div className={styles.menuContainer}>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => handleMenuItemClick(MENU_ITEMS.PENCIL)}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => handleMenuItemClick(MENU_ITEMS.ERASER)}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>
      <div className={styles.iconWrapper} onClick={()=>handleActioItemClick(MENU_ITEMS.UNDO)}>
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </div>
      <div className={styles.iconWrapper} onClick={()=>handleActioItemClick(MENU_ITEMS.REDO)}>
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </div>
      <div className={styles.iconWrapper} onClick={()=>handleActioItemClick(MENU_ITEMS.DOWNLOAD)}>
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </div>
    </div>
  )
};
