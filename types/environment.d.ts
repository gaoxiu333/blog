// environment.d.t 将会被Typescript自动加载，而不用手动添加到tsconfig.json
import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
    }
  }
}
