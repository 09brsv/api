import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ObjectSchema, Maybe, AnyObject, ValidationError } from 'yup';

type TGetSchema = <T extends Maybe<AnyObject>>(
  objectSchema: ObjectSchema<T>
) => ObjectSchema<T>;

type TGetAllSchemas = (getSchema: TGetSchema) => ObjectSchema<any>;

type TValidation = (schema: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getSchema) => async (req: Request, res: Response, next: NextFunction) => {
    const schemas = getSchema((schema) => schema);

    const errors: Record<string, string> = {};
    try {
      schemas.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      const yupError = error as ValidationError;
      yupError.inner.forEach((error) => {
        if (!error.path) return;
        errors[error.path] = error.message;
      });
    }
    Object.entries(errors)[0] ? res.status(400).json(errors) : next();
  };
