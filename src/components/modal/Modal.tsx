import { Button } from 'antd';
import cn from 'classnames';
import React from 'react';
import styles from './modal.module.scss';

interface IModal {
  isVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  onHide: (e: React.MouseEvent<HTMLElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (e: React.MouseEvent<HTMLElement>) => void;
}

const Modal: React.FC<IModal> = ({ isVisible, onHide, onDelete }: IModal) => (
  <div className={cn(styles.modal, { [styles.visible]: isVisible })}>
    <div className={styles.confirm}>Are you sure to delete this article?</div>
    <div className={styles.buttons}>
      <Button size="small" onClick={onHide}>
        No
      </Button>
      <Button className={styles.yesBtn} onClick={onDelete} size="small" type="primary">
        Yes
      </Button>
    </div>
  </div>
);

export default Modal;
