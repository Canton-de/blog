import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import unregisterPage from "../hocs/unregisterPage";
import * as styles from "./create-article.module.scss";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import Api from "../../api/api";
import { Link, useHistory } from "react-router-dom";
import { useRef } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  body: yup.string().required("text is required filed"),
});

const CreateArticle: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const onSubmit = async (data: IFormCreateArticle) => {
    setIsFetching(true);
    try {
      await api.createArticle(data, tags.map((tag) => tag.value).reverse());
      history.push("/articless/1");
    } catch (err) {
      setError("something went wrong");
      setIsFetching(false);
    }
  };
  const [tags, setTags] = useState<ITag[]>([
    { id: "1", value: "qqq" },
    { id: "2", value: "qweeq" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IFormCreateArticle>({
    resolver: yupResolver(ArticleSchema),
  });
  const deleteTag = (id: string) =>
    setTags((tags) => tags.filter((tag) => tag.id !== id));
  const addTag = () => {
    if (inputValue.trim()) {
      setTags((tags) => [
        ...tags,
        {
          id: `${new Date().getTime()}`,
          value: inputValue,
        },
      ]);
    }
    setInputValue("");
  };
  const changeTag = (
    tagInput: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setTags((tags) =>
      tags.map((tag) => {
        return tag.id === id ? { id, value: tagInput.target.value } : tag;
      })
    );
    console.log(tags);
  };
  const onInputChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(input.target.value);
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
            {...register("title")}
          />
          <div className={styles.errors}>{errors.title?.message}</div>
          <label htmlFor="description" className={styles.subtitle}>
            Short description
          </label>
          <input
            id="description"
            type="text"
            className={styles.input}
            placeholder="Short Description"
            {...register("description")}
          />
          <div className={styles.errors}>{errors.description?.message}</div>
          <label htmlFor="text">Text</label>
          <textarea
            style={{ height: "150px", resize: "none" }}
            id="text"
            className={styles.input}
            placeholder="Text"
            {...register("body")}
          />
          <div className={styles.errors}>{errors.body?.message}</div>
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
          <Button
            disabled={isFetching}
            htmlType="submit"
            type="primary"
            style={{ width: "30%" }}
          >
            Send
          </Button>
        </div>
      </div>
    </form>
  );
};

export default unregisterPage(CreateArticle, false);
