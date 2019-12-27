import authors from './authors';
import genres from './genres';
import labels from './labels';
import podcasts from './podcasts';

export default {
  ...labels,
  ...genres,
  ...authors,
  ...podcasts,
};
