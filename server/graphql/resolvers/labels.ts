import { getConnection } from 'typeorm';
import { Labels } from '../../db/entity/labels';

interface IGetLabelsInput { labelId: number; }

const getLabels = async ({ labelId }: IGetLabelsInput) => {
  try {
    const repo = getConnection().getRepository(Labels);

    if (labelId) {
      const authorsListById = await repo.find({ relations: ['authors'], where: { id: labelId } });

      return authorsListById;
    }

    const authorsList = await repo.find({ relations: ['authors'] });

    return authorsList;
  } catch (e) {
    throw new Error(e.message as string);
  }
};

export default {
  getLabels,
};
