import { Request } from "express";

interface IParsedQueryParams {
  parsedLimit?: number;
  parsedOffset?: number;
  parsedSort: string;
}

export const parseQueryParams = (req: Request): IParsedQueryParams => {
  const { limit, offset, sort } = req.query;
  const parsedLimit = limit ? Number(limit) : undefined;
  const parsedOffset = offset ? Number(offset) : undefined;
  const parsedSort = sort ? String(sort) : "desc";

  return { parsedLimit, parsedOffset, parsedSort };
};
