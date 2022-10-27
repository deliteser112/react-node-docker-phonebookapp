const express = require('express');
const { users } = require('../models');

const db = require('../models');
// db.sequelize.sync({ force: true });
db.sequelize.sync();

const User = db.users;

exports.findAll = async (req, res) => {
  try {
    const data = await User.findAll({
      order: [['nama', 'Asc']],
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || 'Some error occurred while retrieving users.',
    });
  }
};

exports.findAllUserActive = async (req, res) => {
  try {
    const data = await User.findAll({
      where: { disable: 0 },
      order: [['nama', 'Asc']],
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || 'Some error occurred while retrieving users.',
    });
  }
};

const getUserData = req => {
  return {
    nama: req.body.nama,
    iklan: req.body.iklan || false,
    streaming_lagu: req.body.streaming_lagu || false,
    streaming_karaoke: req.body.streaming_karaoke || false,
    karaoke: req.body.karaoke || false,
    share_karaoke: req.body.share_karaoke || false,
    live_streaming: req.body.live_streaming || false,
    share_live_streaming: req.body.share_live_streaming || false,
    disable: req.body.disable || false,
  };
};

exports.create = async (req, res) => {
  if (!req.body.nama) {
    res.status(400).send({
      message: 'Nama can not be empty!',
    });
    return;
  }

  try {
    const user = getUserData(req);
    const data = await User.create(user);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while creating the User.',
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body.nama) {
    res.status(400).send({
      message: 'Nama can not be empty!',
    });
    return;
  }

  try {
    const { id } = req.params;
    const { nama, disable } = req.body;
    const newDisable = disable || false;

    await User.update(
      { nama, disable: newDisable },
      {
        where: { id },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while updating the User.',
    });
  }
};

exports.clearChecked = async (req, res) => {
  try {
    await User.update(
      {
        iklan: false,
        streaming_lagu: false,
        streaming_karaoke: false,
        karaoke: false,
        share_karaoke: false,
        live_streaming: false,
        share_live_streaming: false,
      },
      { where: { disable: false } }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

exports.updateByField = async (req, res) => {
  try {
    const { id } = req.params;
    const { fieldName, newStatus } = req.body;

    await User.update(
      { [fieldName]: newStatus },
      {
        where: { id },
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
