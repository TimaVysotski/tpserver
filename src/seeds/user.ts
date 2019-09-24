import models from "../models";

export const createUserWithMessages = async () => {
    const user1 = new models.User({
        username: 'pasha.perec@gmail.com',
        password: 'test',
    });

    const post1 = new models.Post({
        text: 'First Post of Pash Perec',
        user: user1.id,
    });
    const post2 = new models.Post({
        text: 'Hello!!',
        user: user1.id,
    });
  

    await user1.save();

    await post1.save();
    await post2.save();
}