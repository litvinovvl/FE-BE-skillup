import { getConnection } from "typeorm";
import { labels } from "../../db/entity/labels";

type getLabelsInput = { labelId: number };

const getLabels = async ({ labelId }: getLabelsInput) => {
  try {
    const repo = getConnection().getRepository(labels);

    if (labelId) {
      const authorsList = await repo.find({ relations: ["authors"], where: { id: labelId } });

      return authorsList;
    }

    const authorsList = await repo.find({ relations: ["authors"]});

    return authorsList;
  } catch (e) {
    throw new Error(e.message as string);
  }
};

export default {
  getLabels
};
