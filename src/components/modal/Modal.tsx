import { Button } from 'antd';
import cn from 'classnames';
import React from 'react';
import { IModal } from '../../models/modal.model';
import styles from './modal.module.scss';

const Modal: React.FC<IModal> = ({ isVisible, onHide, onDelete }) => (
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
