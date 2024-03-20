import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

interface CorsLiteOptions {
  origins: string | string[];
  methods: string | string[];
  allowedHeaders: string | string[];
  exposedHeaders: string | string[];
  credentials: boolean;
  maxAge: number;
}

class CorsLite {
  private options: CorsLiteOptions;

  constructor(configPath: string) {
    this.options = this.loadConfig(configPath);
  }

  private loadConfig(configPath: string): CorsLiteOptions {
    try {
      const yamlContent = fs.readFileSync(path.resolve(configPath), 'utf8');
      const config = yaml.load(yamlContent) as CorsLiteOptions;
      return config;
    } catch (error) {
      console.error(`Error reading the YAML config file: ${error.message}`);
      process.exit(1);
    }

    // Default policy (if YAML file isn't provided or is invalid)
    return {
      origins: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: [],
      exposedHeaders: [],
      credentials: false,
      maxAge: 3600,
    };
  }

  public init = (req: Request, res: Response, next: NextFunction) => {
    const corsOptions: cors.CorsOptions = {
      origin: this.options.origins,
      methods: this.options.methods,
      allowedHeaders: this.options.allowedHeaders,
      exposedHeaders: this.options.exposedHeaders,
      credentials: this.options.credentials,
      maxAge: this.options.maxAge,
    };

    cors(corsOptions)(req, res, next);
  };
}

export default CorsLite;
