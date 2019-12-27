import { getConnection } from 'typeorm';

import { Authors } from '../../db/entity/authors';

interface IGetAuthorsInput { labelId: number; }

const getAuthors = async ({ labelId }: IGetAuthorsInput) => {
  try {
    const repo = getConnection().getRepository(Authors);

    if (labelId) {
      const author = await repo.find(
        { relations: ['label', 'label.authors'], where: { label: { id: labelId } } },
      );

      return author;
    }
    const authorsList = await repo.find({ relations: ['label', 'label.authors'] });

    return authorsList;
  } catch (e) {
    throw new Error(e.message as string);
  }
};

export default {
  getAuthors,
};
