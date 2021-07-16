import * as styles from "./article.module.scss";
import avatar from "../../img/avatar.png";
import { HeartFilled, HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import Api from "../../api/api";

interface IAuthor {
  username: string;
  image: string;
}

export interface ArticleProps {
  text: string;
  slug: string;
  favorited: boolean;
  author: IAuthor;
  date: string;
  tags: string[];
  isLogged: boolean;
  likesCount: number;
}

const api = new Api();

const Article: React.FC<ArticleProps> = ({
  text,
  favorited,
  author,
  slug,
  date,
  tags,
  likesCount,
  isLogged,
}) => {
  const [isLiked, setIsLiked] = useState(favorited);
  const [isLikeFetching, setIsLikeFetching] = useState(false);
  const [curLikesCount, setCurLikesCount] = useState(likesCount);
  const history = useHistory();
  const onLike = async () => {
    if (!isLogged) {
      history.push("/sign-in");
      return;
    }
    setIsLikeFetching(true);
    try {
      if (!isLiked) {
        await api.favoriteArticle(slug);
        setIsLiked(true);
        setCurLikesCount((likes) => likes + 1);
        setIsLikeFetching(false);
      } else {
        await api.unfavoriteArticle(slug);
        setIsLiked(false);
        setCurLikesCount((likes) => likes - 1);
        setIsLikeFetching(false);
      }
    } catch (e) {
      setIsLikeFetching(false);
    }
  };
  return (
    <div className={styles.article}>
      <div className={styles.left}>
        <div>
          <Link to={`/articles/${slug}/`} className={styles.link}>
            <span className={styles.title}>{slug}</span>
          </Link>
          <label className={styles.likeLabel}>
            <input
              type="checkbox"
              className={styles.likeCheckbox}
              onChange={onLike}
              checked={isLiked}
              disabled={isLikeFetching}
            />
            <span className={styles.likeCount}>
              {isLiked ? (
                <HeartFilled className={styles.heart} />
              ) : (
                <HeartOutlined className={styles.heart} />
              )}
              {curLikesCount}
            </span>
          </label>
        </div>
        {tags.map((tag) => (
          <div className={styles.tag} key={tag}>
            {tag}
          </div>
        ))}
        <div className={styles.subtitle}>{text}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.username}>{author.username}</div>
        <div className={styles.date}>{date}</div>
        <img
          src={author.image || avatar}
          alt="avatar"
          className={styles.avatar}
        />
      </div>
    </div>
  );
};

export default Article;
