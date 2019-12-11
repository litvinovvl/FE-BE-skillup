export {}
const { getConnection } = require('typeorm');
const { podcasts } = require('../../db/entity/podcasts');

const cloudinary = require('cloudinary').v2;

const getPodcasts = async () => {
  try {
    const repo = getConnection().getRepository(podcasts);
    const podcastsList = await repo.find({ relations: ['genre', 'author', 'author.label'] });

    return podcastsList;
  } catch (e) {
    throw new Error(e.message);
  }
};

const addPodcast = async (podcast) => {
  try {
    const { createReadStream } = await podcast.input.thumbnail;

    let resultSecureUrl = '';
    const cloudinaryUpload = async ({ stream }) => {
      try {
        await new Promise((resolve, reject) => {
          const streamLoad = cloudinary.uploader.upload_stream(function (error, result) {
            if (result) {
              resultSecureUrl = result.secure_url;
              resolve(resultSecureUrl)
            } else {
              reject(error);
            }
          });
          stream.pipe(streamLoad);
        });
      }
      catch (e) {
        throw new Error(`Failed to upload thumbnail! Err:${e}`);
      }
    };

    await cloudinaryUpload({ stream: createReadStream() });

    const repo = getConnection().getRepository(podcasts);

    const podcastToSave = repo.create({
      ...podcast.input,
      thumbnail: resultSecureUrl,
      release_date: podcast.input.date
    });

    const resPodcast = await repo.save(podcastToSave);

    return resPodcast;
  } catch (e) {
    throw new Error(e.message);
  }
}

const removePodcast = async ({ input: { id } }) => {
  try {
    const repo = getConnection().getRepository(podcasts);
    await repo.delete(id);

    return { id };
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
  addPodcast,
  getPodcasts,
  removePodcast
};
