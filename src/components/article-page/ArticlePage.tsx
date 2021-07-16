import * as styles from "./article-page.module.scss";
import avatar from "../../img/avatar.png";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IArticle, makeDate } from "../articles/Articles";
import Loader from "../loader/Loader";
import { Button } from "antd";
import { useSelector } from "react-redux";
import Api from "../../api/api";
import Modal from "../modal/Modal";

const api = new Api();

export interface ArticlePageProps {}
interface IParams {
  slug: string;
}

interface IData {
  article: IArticle;
}

const ArticlePage: React.FC<ArticlePageProps> = () => {
  const slug = useParams<IParams>().slug;
  const [isArticleFetching, setIsArticleFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState<IArticle | null>(null);
  const username = useSelector((state: any) => state.userReducer.username);
  const history = useHistory();

  const [modal, setModal] = useState(false);

  const deleteArticle = async () => {
    setIsDeleting(true);
    try {
      await api.deleteArticle(slug);

      history.push("/articless/1");
    } catch (e) {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const getArticle = async () => {
      setIsArticleFetching(true);
      try {
        const data = await axios.get<IData>(
          `https://conduit.productionready.io/api/articles/${slug}`
        );
        setIsArticleFetching(false);
        setArticle(data.data.article);
      } catch (err) {
        setError(err.message);
        setIsArticleFetching(false);
      }
    };
    getArticle();
  }, [slug]);
  if (error) return <div>error</div>;
  return (
    <div style={{ marginBottom: "20px" }}>
      {isArticleFetching ? (
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          <Loader />
        </div>
      ) : (
        <div className={styles.article}>
          <div className={styles.articleHeader}>
            <div className={styles.left}>
              <div className={styles.title}>{article?.slug}</div>
              {article?.tagList.map((tag) => (
                <div className={styles.tag}>{tag}</div>
              ))}
              <div className={styles.subtitle}>{article?.description}</div>
            </div>
            <div className={styles.right}>
              <div className={styles.profile}>
                <div className={styles.fullname}>
                  {article?.author?.username}
                </div>
                <div className={styles.date}>
                  {makeDate(article?.createdAt as string)}
                </div>
                <img
                  src={article?.author.image || avatar}
                  alt="avatar"
                  className={styles.avatar}
                />
              </div>
              {username !== article?.author.username ? null : (
                <div className={styles.btnBlock}>
                  <Button
                    danger
                    disabled={isDeleting}
                    onClick={() => setModal(true)}
                  >
                    Delete
                    <Modal
                      onDelete={(e: React.MouseEvent<HTMLElement>) => {
                        e.stopPropagation();
                        setModal(false);
                        deleteArticle();
                      }}
                      isVisible={modal}
                      onHide={(e: React.MouseEvent<HTMLElement>) => {
                        e.stopPropagation();
                        setModal(false);
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

export default ArticlePage;
