export {}
const { getConnection } = require('typeorm');
const { podcasts } = require('../../db/entity/podcasts');

const cloudinary = require('cloudinary').v2;

cloudinary.config('cloudinary://899685619679277:qfEsJzWHCycuDLrmjoHy158JDBU@spawn1');

const getPodcasts = async () => {
  const repo = getConnection().getRepository(podcasts);

  return await repo.find({ relations: ['genre', 'author', 'author.label'] });
};

const addPodcast = async (podcast) => {
  const { createReadStream } = await podcast.input.thumbnail;

  let resultSecureUrl = '';
  const cloudinaryUpload = async ({stream}) => {
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
      throw new Error(`Failed to upload thumbnail! Err:${err.message}`);
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

module.exports = {
  addPodcast,
  getPodcasts
};
