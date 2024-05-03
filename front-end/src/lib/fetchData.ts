"use client";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
interface FetchDataOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  lang?: string;
  body?: any;
  cache?: RequestInit["cache"];
  token?: string;
  headers?: Record<string, string>;
  revalidate?: string;
  withOutStringify?: boolean;
  noHadar?: boolean;
  next?: {
    revalidate: number;
  };
}

interface ApiResponse<T> {
  data?: T;
  error?: string | Response;
}

export async function fetchData<T>(
  url: string,
  options?: FetchDataOptions
): Promise<ApiResponse<T>> {
  const { method = "GET", body, cache, next, revalidate } = options || {};

  const option: RequestInit = {
    cache,
    next,
    method,

    body: JSON.stringify(body),

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options?.headers || {}),
    },
  };

  const fetchURL = "/api" + url;
  try {
    const res = await fetch(fetchURL, option);
    if (!res.ok) {
      throw res;
    }
    const responseData: ApiResponse<T> = {};

    if (revalidate) {
      revalidatePath(revalidate, "page");
    }
    responseData.data = await res.json();

    return responseData;
  } catch (error: any) {
    if (error.status === 500) {
      throw new Error("Internal Server Error");
    } else if (error.status === 404) {
      notFound();
    }

    return error.json().then((errorMessage: any) => {
      throw errorMessage;
    });
  }
}
