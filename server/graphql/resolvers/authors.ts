import { getConnection } from "typeorm";

import { authors } from "../../db/entity/authors";

type getAuthorsInput = { labelId: number };

const getAuthors = async ({ labelId }: getAuthorsInput) => {
  try {
    const repo = getConnection().getRepository(authors);

    if (labelId) {
      const author = await repo.find({ relations: ["label", "label.authors"], where: { label: { id: labelId } } });

      return author;
    }
    const author = await repo.find({ relations: ["label", "label.authors"] });

    return author;
  } catch (e) {
    throw new Error(e.message as string);
  }
};

export default {
  getAuthors
};
