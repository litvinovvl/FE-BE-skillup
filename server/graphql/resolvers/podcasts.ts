export {}
const { getConnection } = require('typeorm');
const { podcasts } = require('../../db/entity/podcasts');

const cloudinary = require('cloudinary').v2;

const getPodcasts = async () => {
  const repo = getConnection().getRepository(podcasts);

  return await repo.find({ relations: ['genre', 'author', 'author.label'] });
};

const addPodcast = async (podcast) => {
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
    catch (err) {
      throw new Error(`Failed to upload thumbnail! Err:${err}`);
    }
  };

  await cloudinaryUpload({ stream: createReadStream() });

  const repo = getConnection().getRepository(podcasts);

  const podcastToSave = repo.create({
    ...podcast.input,
    thumbnail: resultSecureUrl,
    release_date: podcast.input.date
   });

   return await repo.save(podcastToSave);
}

const removePodcast = async ({ input: { id } }) => {
  const repo = getConnection().getRepository(podcasts);

  await repo.delete(id);

  return { id };
}

module.exports = {
  addPodcast,
  getPodcasts,
  removePodcast
};
