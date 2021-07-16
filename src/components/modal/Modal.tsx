import { Button } from "antd";
import styles from "./modal.module.scss";
import cn from "classnames";
import React from "react";

interface IModal {
  isVisible: boolean;
  onHide: (e: React.MouseEvent<HTMLElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLElement>) => void;
}

const Modal: React.FC<IModal> = ({ isVisible, onHide, onDelete }) => {
  return (
    <div className={cn(styles.modal, { [styles.visible]: isVisible })}>
      <div className={styles.confirm}>Are you sure to delete this article?</div>
      <div className={styles.buttons}>
        <Button size="small" onClick={onHide}>
          No
        </Button>
        <Button
          className={styles.yesBtn}
          onClick={onDelete}
          size="small"
          type="primary"
        >
          Yes
        </Button>
      </div>
    </div>
  );
};

export default Modal;
