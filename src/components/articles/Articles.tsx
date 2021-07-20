import { Pagination } from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Article from '../article/Article';
import styles from './articles.module.scss';
import Loader from '../loader/Loader';
import Api from '../../api/api';
import Monthes from '../../config';

interface IAuthor {
  username: string;
  image: string;
}

export interface IArticle {
  author: IAuthor;
  description: string;
  createdAt: string;
  slug: string;
  tagList: string[];
  body?: string;
  favoritesCount: number;
  favorited: boolean;
}

export const makeDate = (md: string) => {
  const date = new Date(md);
  return `${Monthes[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

interface IParams {
  page: string;
}

const api = new Api();

const Articles = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const { page } = useParams<IParams>();
  const [articles, setArticles] = useState<IArticle[]>([]);
  const history = useHistory();
  const loadArticles = async (lPage = 1) => {
    setIsFetching(true);
    try {
      const lArticles = await api.getArticles(lPage);
      setIsFetching(false);
      setArticles(lArticles);
    } catch (err) {
      setError(err);
      setIsFetching(false);
      setArticles([]);
    }
  };
  const changePage = (pg: number) => history.push(`/articles/page/${pg}`);
  useEffect(() => {
    loadArticles(+page);
  }, [page]);
  if (error) return <div>ОШИБКА</div>;
  return (
    <div className={styles['articles-wrapper']}>
      {isFetching ? (
        <Loader />
      ) : (
        articles.map((article) => (
          <Article
            date={makeDate(article.createdAt)}
            author={article.author}
            text={article.description}
            slug={article.slug}
            tags={article.tagList}
            key={article.slug}
            likesCount={article.favoritesCount}
            favorited={article.favorited}
          />
        ))
      )}

      <Pagination
        current={page ? +page : 1}
        onChange={changePage}
        defaultCurrent={1}
        total={500}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Articles;
