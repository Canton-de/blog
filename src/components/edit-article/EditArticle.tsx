import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../api/api';
import * as styles from './edit-article.module.scss';
import authRequired from '../hocs/authRequired';
import Loader from '../loader/Loader';
import { IParams } from '../../models/slugParams';
import { ITag } from '../../models/tagParams';
import { IFormCreateArticle } from '../../models/editArticleModel';

const ArticleSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required('text is required filed'),
});

const EditArticle: React.FC = () => {
  const { slug } = useParams<IParams>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const [tags, setTags] = useState<ITag[]>([]);

  const [inputValue, setInputValue] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IFormCreateArticle>({
    mode: 'all',
    resolver: yupResolver(ArticleSchema),
  });

  const deleteTag = (id: string) => setTags((tags2) => tags2.filter((tag) => tag.id !== id));

  const addTag = () => {
    if (inputValue.trim()) {
      setTags((tags2) => [
        ...tags2,
        {
          id: `${new Date().getTime()}`,
          value: inputValue,
        },
      ]);
    }
    setInputValue('');
  };

  const changeTag = (tagInput: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setTags((tags2) =>
      tags2.map((tag) => (tag.id === id ? { id, value: tagInput.target.value } : tag))
    );
  };

  const onInputChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(input.target.value);
  };

  useEffect(() => {
    api.getFullArticle(slug).then((response) => {
      setValue('title', response.data.article.title);
      setValue('description', response.data.article.description);
      setValue('body', response.data.article.body as string);
      setTags((tags2) => [
        ...tags2,
        ...response.data.article.tagList.map((tag) => ({ value: tag, id: tag })),
      ]);
      setIsLoading(false);
    });
  }, []);

  const onSubmit = async (data: IFormCreateArticle) => {
    setIsFetching(true);
    try {
      await api.updateArticle(slug, data, tags.map((tag) => tag.value).reverse());
      history.push(`/articles/${slug}/`);
    } catch (err) {
      setError('something went wrong');
      setIsFetching(false);
    }
  };
  if (isLoading) return <Loader />;
  if (error) return <div>{error}</div>;
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className={styles.pageWrapper}>
        <div className={styles.page}>
          <div className={styles.title}>Edit article</div>
          <label htmlFor="title" className={styles.subtitle}>
            Title
          </label>
          <input
            className={styles.input}
            id="title"
            type="text"
            placeholder="Title"
            {...register('title')}
          />
          <div className={styles.error}>{errors.title?.message}</div>
          <label htmlFor="description" className={styles.subtitle}>
            Short description
          </label>
          <input
            id="description"
            type="text"
            className={styles.input}
            placeholder="Short Description"
            {...register('description')}
          />
          <div className={styles.error}>{errors.description?.message}</div>
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            className={`${styles.input} ${styles.area}`}
            placeholder="Text"
            {...register('body')}
          />
          <div className={styles.error}>{errors.body?.message}</div>
          <div>Tags</div>
          {tags.map((tag) => (
            <div key={tag.id}>
              <input
                className={styles.tag}
                onChange={(tagInput) => changeTag(tagInput, tag.id)}
                type="text"
                value={tag.value}
              />
              <Button danger onClick={() => deleteTag(tag.id)}>
                Delete
              </Button>
            </div>
          ))}
          <div>
            <input
              className={styles.tag}
              value={inputValue}
              type="text"
              placeholder="Tag"
              onChange={onInputChange}
            />
            <Button onClick={() => addTag()}>Add tag</Button>
          </div>
          <Button disabled={isFetching} htmlType="submit" type="primary" style={{ width: '30%' }}>
            Send
          </Button>
        </div>
      </div>
    </form>
  );
};

export default authRequired(EditArticle);
