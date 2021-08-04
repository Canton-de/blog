import React from 'react';

export interface IModal {
  isVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  onHide: (e: React.MouseEvent<HTMLElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (e: React.MouseEvent<HTMLElement>) => void;
}
