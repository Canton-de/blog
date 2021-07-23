import axios from 'axios';
import { IArticle } from '../components/articles/Articles';
import { IFormCreateArticle } from '../components/create-article/CreateArticle';
import { IUserForm } from '../components/registration-page/RegistrationPage';
import getToken from '../helpers/getToken';
import isLogged from '../helpers/islogged';

interface IReqUser {
  token: string;
}

interface IResDataUser {
  user: IReqUser;
}

interface IResponseUser {
  data: IResDataUser;
}

interface IDataArticle {
  article: IArticle;
}

interface IArticles {
  articles: IArticle[];
}

const axiosInstance = axios.create({
  baseURL: 'https://conduit.productionready.io/api/',
});

export default class Api {
  baseUrl = 'https://conduit.productionready.io/api';

  public register = async (data: IUserForm) => {
    const response = await axiosInstance.post<any, IResponseUser>(`users`, {
      user: {
        ...data,
      },
    });

    return response;
  };

  public getUserData = async () => {
    const { data } = await axiosInstance.get('user', {
      withCredentials: true,
      headers: {
        Authorization: `Token ${getToken()}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    });
    return data.user;
  };

  public updateUser = async (data: IUserForm) => {
    await axiosInstance.put(
      `user`,
      { user: { ...data } },
      {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    );
  };

  public createArticle = async (data: Partial<IFormCreateArticle>, tags: string[]) => {
    await axiosInstance.post(
      `articles`,
      { article: { ...data, tagList: tags } },
      {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    );
  };

  public deleteArticle = async (slug: string) => {
    await axiosInstance.delete(`articles/${slug}`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
  };

  public updateArticle = async (slug: string, data: IFormCreateArticle, tags: string[]) => {
    await axiosInstance.put(
      `articles/${slug}`,
      {
        article: {
          ...data,
          tagList: tags,
        },
      },
      {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    );
  };

  public favoriteArticle = async (slug: string) => {
    await axiosInstance.post(
      `articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      }
    );
  };

  public unfavoriteArticle = async (slug: string) => {
    await axiosInstance.delete(`articles/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
  };

  public login = async (data: any) =>
    axiosInstance.post<any, IResponseUser>('users/login', {
      user: {
        email: data.email,
        password: data.password,
      },
    });

  public getArticles = async (page: number) => {
    let data;
    if (isLogged()) {
      data = await axiosInstance.get<IArticles>(`articles?limit=10&offset=${(page - 1) * 10}`, {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });
    } else {
      data = await axiosInstance.get<IArticles>(`articles?limit=10&offset=${(page - 1) * 10}`);
    }
    return data.data.articles;
  };

  public getFullArticle = async (slug: string) => {
    let data;
    if (isLogged()) {
      data = await axiosInstance.get<IDataArticle>(`articles/${slug}`, {
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });
    } else {
      data = await axiosInstance.get<IDataArticle>(`articles/${slug}`);
    }
    return data;
  };
}
