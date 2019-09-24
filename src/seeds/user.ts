import models from "../models";

export const createUserWithMessages = async () => {
    const user1 = new models.User({
        username: 'pasha',
        password: 'test',
        gender: 'male',
    });
    const user2 = new models.User({
        username: 'username',
        password: 'password',
        gender: 'male',
    });

    const post1 = new models.Post({
        text: 'First Post of Pasha Perec',
        user: user1.id,
    });
    const post2 = new models.Post({
        text: 'Hello!!',
        user: user1.id,
    });
  

    await user1.save();
    await user2.save();

    await post1.save();
    await post2.save();
}