import styles from "./articles.module.scss";
import Article from "../article/Article";
import ArticlePage from "../article-page/ArticlePage";
import { Pagination } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import Loader from "../loader/Loader";

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

interface IArticles {
  articles: IArticle[];
}

const Monthes = [
  "January",
  "Febrary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
];

export interface ArticlesProps {}

export const makeDate = (d: string) => {
  const date = new Date(d);
  return `${Monthes[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

interface IParams {
  page: string;
}

const Articles: React.FC<ArticlesProps> = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const page = useParams<IParams>().page;
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLogged, setIslogged] = useState(false);
  const history = useHistory();
  const loadArticles = async (p: number = 1) => {
    setIsFetching(true);
    try {
      const token = localStorage.getItem("token");
      let data;
      if (token) {
        setIslogged(true);
        data = await axios.get<IArticles>(
          `https://conduit.productionready.io/api/articles?limit=10&offset=${
            (p - 1) * 10
          }`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      } else {
        data = await axios.get<IArticles>(
          `https://conduit.productionready.io/api/articles?limit=10&offset=${
            (p - 1) * 10
          }`
        );
      }
      console.log(data.data.articles);
      setIsFetching(false);
      setArticles(data.data.articles);
    } catch (err) {
      setError(err);
      setIsFetching(false);
      setArticles([]);
    }
  };
  const changePage = (p: number) => history.push(`/articless/${p}`);
  useEffect(() => {
    loadArticles(+page);
  }, [page]);
  if (error) return <div>ОШИБКА</div>;
  return (
    <div className={styles["articles-wrapper"]}>
      {isFetching ? (
        <Loader />
      ) : (
        articles.map((article) => {
          return (
            <Article
              date={makeDate(article.createdAt)}
              author={article.author}
              text={article.description}
              slug={article.slug}
              tags={article.tagList}
              key={article.slug}
              likesCount={article.favoritesCount}
              favorited={article.favorited}
              isLogged={isLogged}
            />
          );
        })
      )}

      <Pagination
        current={+page}
        onChange={changePage}
        defaultCurrent={1}
        total={500}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Articles;
