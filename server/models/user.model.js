module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    nama: {
      type: Sequelize.STRING,
    },

    iklan: {
      type: Sequelize.BOOLEAN,
    },

    streaming_lagu: {
      type: Sequelize.BOOLEAN,
    },

    streaming_karaoke: {
      type: Sequelize.BOOLEAN,
    },

    karaoke: {
      type: Sequelize.BOOLEAN,
    },

    share_karaoke: {
      type: Sequelize.BOOLEAN,
    },

    live_streaming: {
      type: Sequelize.BOOLEAN,
    },

    share_live_streaming: {
      type: Sequelize.BOOLEAN,
    },

    disable: {
      type: Sequelize.BOOLEAN,
    },
  });

  return User;
};
