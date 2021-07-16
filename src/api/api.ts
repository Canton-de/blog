import axios from "axios";
import { IFormCreateArticle } from "../components/create-article/CreateArticle";
import { IUserForm } from "../components/registration-page/RegistrationPage";
interface IReqUser {
  token: string;
}

interface IResData {
  user: IReqUser;
}

interface IResponse {
  data: IResData;
}
export default class Api {
  baseUrl = "https://conduit.productionready.io/api";
  public register = async (data: IUserForm) => {
    const response = await axios.post<any, IResponse>(`${this.baseUrl}/users`, {
      user: {
        ...data,
      },
    });

    return response;
  };

  public updateUser = async (data: IUserForm) => {
    const token = localStorage.getItem("token");
    console.log(token, data);
    await axios.put(
      `${this.baseUrl}/user`,
      { user: { ...data } },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  };

  public createArticle = async (
    data: Partial<IFormCreateArticle>,
    tags: string[]
  ) => {
    const token = localStorage.getItem("token");
    await axios.post(
      `${this.baseUrl}/articles`,
      { article: { ...data, tagList: tags } },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  };

  public deleteArticle = async (slug: string) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${this.baseUrl}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  };

  public updateArticle = async (
    slug: string,
    data: IFormCreateArticle,
    tags: string[]
  ) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `${this.baseUrl}/articles/${slug}`,
      {
        article: {
          ...data,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  };
  public favoriteArticle = async (slug: string) => {
    const token = localStorage.getItem("token");
    console.log(slug);
    await axios.post(
      `${this.baseUrl}/articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  };
  public unfavoriteArticle = async (slug: string) => {
    const token = localStorage.getItem("token");
    console.log(slug);
    await axios.delete(`${this.baseUrl}/articles/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  };
}
