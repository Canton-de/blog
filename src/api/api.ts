import axios from 'axios';
import { baseUrl } from '../config';
import isLogged from '../helpers/islogged';
import authService from '../AuthService';
import { IArticle } from '../models/articlesModel';
import { IChangeProfileForm } from '../models/changeProfileMode';
import { IUserForm } from '../models/registrationPage';
import { IFormCreateArticle } from '../models/editArticleModel';

interface IReqUser {
  token: string;
  username: string;
  email: string;
  image: string | null;
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
  baseURL: baseUrl,
});

class Api {
  public register = async (data: IUserForm) => {
    const response = await axiosInstance.post<IResDataUser>(`users`, {
      user: data,
    });
    return response;
  };

  public getUserData = async () => {
    const response = await axiosInstance.get<IResDataUser>('user', {
      withCredentials: true,
      headers: {
        ...authService.authHeader(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    });
    return response.data.user;
  };

  public updateUser = async (data: IChangeProfileForm) => {
    await axiosInstance.put(
      `user`,
      { user: { ...data } },
      {
        headers: authService.authHeader(),
      }
    );
  };

  public createArticle = async (data: Partial<IFormCreateArticle>, tags: string[]) => {
    await axiosInstance.post(
      `articles`,
      { article: { ...data, tagList: tags } },
      {
        headers: authService.authHeader(),
      }
    );
  };

  public deleteArticle = async (slug: string) => {
    await axiosInstance.delete(`articles/${slug}`, {
      headers: authService.authHeader(),
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
        headers: authService.authHeader(),
      }
    );
  };

  public favoriteArticle = async (slug: string) => {
    await axiosInstance.post(
      `articles/${slug}/favorite`,
      {},
      {
        headers: authService.authHeader(),
      }
    );
  };

  public unfavoriteArticle = async (slug: string) => {
    await axiosInstance.delete(`articles/${slug}/favorite`, {
      headers: authService.authHeader(),
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
      console.log(authService.authHeader());
      console.log(12212112);
      data = await axiosInstance.get<IArticles>(`articles?limit=10&offset=${(page - 1) * 10}`, {
        headers: authService.authHeader(),
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
        headers: authService.authHeader(),
      });
    } else {
      data = await axiosInstance.get<IDataArticle>(`articles/${slug}`);
    }
    return data;
  };
}

export default new Api();
