import { Link, useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import styles from './full-article.module.scss';
import avatar from '../../img/avatar.png';
import { IArticle } from '../articles/Articles';
import Loader from '../loader/Loader';
import api from '../../api/api';
import Modal from '../modal/Modal';
import LikeButton from '../like-button/LikeButton';
import makeDate from '../../helpers/makeDate';
import { stateType } from '../../store/store';

interface IParams {
  slug: string;
}

const FullArticle = () => {
  const { slug } = useParams<IParams>();
  const [isArticleFetching, setIsArticleFetching] = useState(true);
  const [isArticleDeleting, setIsArticleDeleting] = useState(false);
  const [articleError, setArticleError] = useState(null);
  const [article, setArticle] = useState<IArticle | null>(null);

  const { username } = useSelector((state: stateType) => state.user);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [startLikesCount, setStartLikesCount] = useState(0);
  const [startIsLiked, setStartIsLiked] = useState(false);
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
        setStartIsLiked(lArticle.favorited);
      } catch (err) {
        setArticleError(err.message);
        setIsArticleFetching(false);
      }
    };
    getArticle();
  }, [slug]);
  if (articleError) return <div>error</div>;
  return (
    <div>
      {isArticleFetching ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.article}>
          <div className={styles.articleHeader}>
            <div className={styles.left}>
              <div>
                <span className={styles.title}>{article?.title}</span>
                <LikeButton
                  slug={slug}
                  startIsLiked={startIsLiked}
                  startLikesCount={startLikesCount}
                />
              </div>
              {article?.tagList.map((tag) => (
                <div className={styles.tag} key={tag}>
                  {tag}
                </div>
              ))}
              <div className={styles.subtitle}>{article?.description}</div>
            </div>
            <div className={styles.right}>
              <div className={styles.profile}>
                <div className={styles.fullname}>{article?.author?.username}</div>
                <div className={styles.date}>{makeDate(article?.createdAt as string)}</div>
                <img src={article?.author.image || avatar} alt="avatar" className={styles.avatar} />
              </div>
              {username !== article?.author.username ? null : (
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

          <div className={styles.body}>
            <ReactMarkdown>{article?.body || ''}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullArticle;
