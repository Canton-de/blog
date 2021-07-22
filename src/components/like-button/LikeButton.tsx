import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import React, { useState, useEffect } from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import isLogged from '../../helpers/islogged';
import styles from './like-button.module.scss';
import debounce from '../../helpers/debounce';
import Api from '../../api/api';
import savePathname from '../../store/actions/historyActions';

const api = new Api();

const serverLike = debounce(async (isLiked: boolean, slug: string) => {
  try {
    if (!isLiked) await api.favoriteArticle(slug);
    else await api.unfavoriteArticle(slug);
    // eslint-disable-next-line no-empty
  } catch (e) {}
}, 150);

interface ILikeButton {
  slug: string;
  startLikesCount: number;
  startIsLiked: boolean;
}

const LikeButton: React.FC<ILikeButton> = ({
  slug,
  startLikesCount,
  startIsLiked,
}: ILikeButton) => {
  const [isLiked, setIsLiked] = useState(startIsLiked);
  const [curLikesCount, setCurLikesCount] = useState(startLikesCount);
  const { pathname } = useLocation();
  useEffect(() => {
    setCurLikesCount(startLikesCount);
    setIsLiked(startIsLiked);
  }, [startLikesCount, startIsLiked]);
  const dispatch = useDispatch();
  const history = useHistory();
  const onLike = async () => {
    if (!isLogged()) {
      dispatch(savePathname(pathname));
      history.push('/sign-in');
      return;
    }
    setIsLiked((isLike) => {
      setCurLikesCount((count) => (!isLike ? count + 1 : count - 1));
      serverLike(isLiked, slug);
      return !isLike;
    });
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <label
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      className={styles.likeLabel}
    >
      <input type="checkbox" className={styles.likeCheckbox} onChange={onLike} checked={isLiked} />
      <span className={styles.likeCount}>
        {isLiked ? (
          <HeartFilled className={styles.heart} />
        ) : (
          <HeartOutlined className={styles.heart} />
        )}
        {curLikesCount}
      </span>
    </label>
  );
};

export default LikeButton;
