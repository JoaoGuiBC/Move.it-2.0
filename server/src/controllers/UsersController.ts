import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { compare, hash } from 'bcrypt';

import User from "../models/User";

export default {
  async index(_: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find({
      select: [
        "challengesCompleted",
        "currentExperience",
        "imagePath",
        "level",
        "username",
      ],
      order: {
        level: 'DESC',
        currentExperience: 'DESC',
      },
      take: 10,
    });

    return response.json(users);
  },

  async show(request: Request, response: Response) {
    const { username, password } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: {
      username,
    }});

    if (!user) {
      return response.status(404).json({ message: 'Wrong combination of username/password.' });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      return response.status(404).json({ message: 'Wrong combination of username/password.' });
    }

    return response.status(202).json(user);
  },

  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const usersRepository = getRepository(User);

    const checkIfUserExists = await usersRepository.findOne({ where: {
      username,
    }});

    if (checkIfUserExists) {
      return response.status(406).json({ message: 'Username already in use.' });
    }

    const hashedPassword = await hash(password, 7);

    const userImage = request.file as Express.Multer.File;

    const imagePath = userImage.filename;

    const user = usersRepository.create({
      username,
      password: hashedPassword,
      imagePath,
      level: 1,
      challengesCompleted: 0,
      currentExperience: 0,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  },

  async update(request: Request, response: Response) {
    const { 
      level, 
      currentExperience, 
      challengesCompleted, 
      userId
    } = request.body;

    const usersRepository = getRepository(User);

    await usersRepository.update(userId, { 
      level, 
      currentExperience, 
      challengesCompleted 
    });

    return response.status(204).send();
  }
}
