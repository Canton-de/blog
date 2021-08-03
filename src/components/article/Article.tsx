import { Link } from 'react-router-dom';
import React from 'react';
import styles from './article.module.scss';
import avatar from '../../img/avatar.png';
import LikeButton from '../like-button/LikeButton';

interface IAuthor {
  username: string;
  image: string;
}

export interface ArticleProps {
  text: string;
  title: string;
  favorited: boolean;
  slug: string;
  author: IAuthor;
  date: string;
  tags: string[];
  likesCount: number;
}

const Article: React.FC<ArticleProps> = ({
  text,
  favorited,
  author,
  title,
  date,
  tags,
  likesCount,
  slug,
}) => (
  <div className={styles.article}>
    <div className={styles.left}>
      <div>
        <Link to={`/articles/${slug}/`} className={styles.link}>
          <span className={styles.title}>{title}</span>
        </Link>
        <LikeButton slug={slug} startIsLiked={favorited} startLikesCount={likesCount} />
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
      <img src={author.image || avatar} alt="avatar" className={styles.avatar} />
    </div>
  </div>
);

export default Article;
