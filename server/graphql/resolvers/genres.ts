import { getConnection } from 'typeorm';
import { Genres } from '../../db/entity/genres';

const getGenres = async () => {
  try {
    const repo = getConnection().getRepository(Genres);
    const genresRes = await repo.find();

    return genresRes;
  } catch (e) {
    throw new Error(e.message as string);
  }
};

export default {
  getGenres,
};
