import { ReadStream, WriteStream } from 'fs';
import { getConnection } from 'typeorm';
import { Podcasts } from '../../db/entity/podcasts';
import { IPodcast } from '../../typings';

const cloudinary = require('cloudinary').v2;

const getPodcasts = async () => {
  try {
    const repo = getConnection().getRepository(Podcasts);
    const podcastsList = await repo.find({ relations: ['genre', 'author', 'author.label'] });

    return podcastsList;
  } catch (e) {
    throw new Error(e.message as string);
  }
};

const addPodcast = async (podcast: { input: IPodcast }) => {
  try {
    const { createReadStream } = await podcast.input.thumbnail;

    let resultSecureUrl = '';

    const cloudinaryUpload = async (stream: ReadStream): Promise<void> => {
      try {
        await new Promise((resolve, reject) => {
          const streamLoad: WriteStream
            = cloudinary.uploader.upload_stream((error: Error, result: { secure_url: string }) => {
              if (result) {
                resultSecureUrl = result.secure_url;
                resolve(resultSecureUrl);
              } else {
                reject(error);
              }
            });

          stream.pipe(streamLoad);
        });
      } catch (e) {
        throw new Error(`Failed to upload thumbnail! Err:${e as Error}`);
      }
    };

    await cloudinaryUpload(createReadStream());

    const repo = getConnection().getRepository(Podcasts);

    const { date, ...input } = podcast.input;

    const podcastToSave = repo.create({
      ...input,
      thumbnail: resultSecureUrl,
      release_date: date,
    });

    const resPodcast = await repo.save(podcastToSave);

    return resPodcast;
  } catch (e) {
    throw new Error(e.message as string);
  }
};

interface IRemovepodcastInput { input: { id: number }; }

const removePodcast = async ({ input: { id } }: IRemovepodcastInput) => {
  try {
    const repo = getConnection().getRepository(Podcasts);
    await repo.delete(id);

    return { id };
  } catch (e) {
    throw new Error(e.message as string);
  }
};

export default {
  addPodcast,
  getPodcasts,
  removePodcast,
};
