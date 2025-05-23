import { Environment, environments } from "@dzcode.io/utils/dist/config/environment";
import { IsOptional, IsString, Matches } from "class-validator";
import { readFileSync } from "fs-extra";

let bundleInfo = { version: require("../../package.json").version }; // eslint-disable-line @typescript-eslint/no-require-imports
try {
  bundleInfo = JSON.parse(readFileSync(".bundle-info.json").toString());
} catch (error) {
  console.error(error);
}

export class EnvRecord {
  PORT = 7070;

  @Matches("(" + environments.join(")|(") + ")")
  NODE_ENV!: Environment;

  @IsString()
  FETCH_CACHE_PATH = "./fetch_cache";

  @IsString()
  SQLITE_DB_PATH = "./sqlite_db";

  @IsString()
  @IsOptional()
  GITHUB_TOKEN?: string;

  @IsOptional()
  BUNDLE_INFO: { version: string } = bundleInfo;
}
