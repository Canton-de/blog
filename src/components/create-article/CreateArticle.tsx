import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Api from '../../api/api';
import * as styles from './create-article.module.scss';
import authRequired from '../hocs/authRequired';

export interface IFormCreateArticle {
  title: string;
  description: string;
  body: string;
}

interface ITag {
  id: string;
  value: string;
}

const api = new Api();

const ArticleSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required('text is required filed'),
});

const CreateArticle: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const history = useHistory();
  const [tags, setTags] = useState<ITag[]>([]);
  const [inputValue, setInputValue] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors },
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
  const onSubmit = async (data: IFormCreateArticle) => {
    setIsFetching(true);
    try {
      await api.createArticle(data, tags.map((tag) => tag.value).reverse());
      history.push('/articles/page/1');
    } catch (err) {
      setIsFetching(false);
    }
  };
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className={styles.pageWrapper}>
        <div className={styles.page}>
          <div className={styles.title}>Create new article</div>
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
            style={{ height: '150px', resize: 'none' }}
            id="text"
            className={styles.input}
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

export default authRequired(CreateArticle);
