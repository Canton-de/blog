import { Link, useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import styles from './full-article.module.scss';
import avatar from '../../img/avatar.png';
import { IArticle } from '../articles/Articles';
import Loader from '../loader/Loader';
import Api from '../../api/api';
import Modal from '../modal/Modal';
import LikeButton from '../like-button/LikeButton';
import makeDate from '../../helpers/makeDate';

const api = new Api();

interface FullArticleProps {}
interface IParams {
  slug: string;
}

const FullArticle: React.FC<FullArticleProps> = () => {
  const { slug } = useParams<IParams>();
  const [isArticleFetching, setIsArticleFetching] = useState(true);
  const [isArticleDeleting, setIsArticleDeleting] = useState(false);
  const [articleError, setArticleError] = useState(null);
  const [article, setArticle] = useState<IArticle | null>(null);

  const currentUserUsername = useSelector((state: any) => state.userReducer.username);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [startLikesCount, setStartLikesCount] = useState(0);
  const [startIsLiked, setStartIsIsLiked] = useState(false);
  const deleteArticle = async () => {
    setIsArticleDeleting(true);
    try {
      await api.deleteArticle(slug);
      history.push('/articles/page/1');
    } catch (e) {
      setIsArticleDeleting(false);
    }
  };

  useEffect(() => {
    const getArticle = async () => {
      setIsArticleFetching(true);
      try {
        const { data } = await api.getFullArticle(slug);
        const { article: lArticle } = data;
        setIsArticleFetching(false);
        setArticle(lArticle);
        setStartLikesCount(lArticle.favoritesCount);
        setStartIsIsLiked(lArticle.favorited);
      } catch (err) {
        setArticleError(err.message);
        setIsArticleFetching(false);
      }
    };
    getArticle();
  }, [slug]);
  if (articleError) return <div>error</div>;
  return (
    <div style={{ marginBottom: '20px' }}>
      {isArticleFetching ? (
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <Loader />
        </div>
      ) : (
        <div className={styles.article}>
          <div className={styles.articleHeader}>
            <div className={styles.left}>
              <div>
                <span className={styles.title}>{article?.slug}</span>
                <LikeButton
                  slug={slug}
                  startIsLiked={startIsLiked}
                  startLikesCount={startLikesCount}
                />
              </div>
              {article?.tagList.map((tag) => (
                <div className={styles.tag}>{tag}</div>
              ))}
              <div className={styles.subtitle}>{article?.description}</div>
            </div>
            <div className={styles.right}>
              <div className={styles.profile}>
                <div className={styles.fullname}>{article?.author?.username}</div>
                <div className={styles.date}>{makeDate(article?.createdAt as string)}</div>
                <img src={article?.author.image || avatar} alt="avatar" className={styles.avatar} />
              </div>
              {currentUserUsername !== article?.author.username ? null : (
                <div className={styles.btnBlock}>
                  <Button danger disabled={isArticleDeleting} onClick={() => setModalOpen(true)}>
                    Delete
                    <Modal
                      onDelete={(e: React.MouseEvent<HTMLElement>) => {
                        e.stopPropagation();
                        setModalOpen(false);
                        deleteArticle();
                      }}
                      isVisible={modalOpen}
                      onHide={(e: React.MouseEvent<HTMLElement>) => {
                        e.stopPropagation();
                        setModalOpen(false);
                      }}
                    />
                  </Button>
                  <Link to="edit">
                    <Button className={styles.editBtn}>Edit</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className={styles.body}>{article?.body}</div>
        </div>
      )}
    </div>
  );
};

export default FullArticle;
