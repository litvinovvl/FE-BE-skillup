import { getConnection } from "typeorm";
import { genres } from "../../db/entity/genres";

const getGenres = async () => {
  try {
    const repo = getConnection().getRepository(genres);
    const genresRes = await repo.find();

    return genresRes;
  } catch (e) {
    throw new Error(e.message as string);
  }
};

export default {
  getGenres
};
