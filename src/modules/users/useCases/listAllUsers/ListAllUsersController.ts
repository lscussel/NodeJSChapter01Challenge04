import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;
      const all = this.listAllUsersUseCase.execute({
        user_id: String(user_id),
      });

      return response.status(200).json(all);
    } catch (error) {
      const { message } = error;
      if (message === "UserDoesNotExist") {
        return response.status(400).json({ error: message });
      }
      return response.status(400).json({ error: message });
    }
  }
}

export { ListAllUsersController };
