const USERS = [
  { id: 1, name: "Mariia", age: 22, sex: { key: 1, value: "F" } },
  { id: 2, name: "Kristina", age: 22, sex: { key: 1, value: "F" } },
  { id: 3, name: "Karina", age: 21, sex: { key: 1, value: "F" } },
  { id: 4, name: "Ulyana", age: 21, sex: { key: 1, value: "F" } },
  // { id: 5, name: "Mariia", age: 22, sex: { key: 1, value: "F" } },
  // { id: 6, name: "Kristina", age: 22, sex: { key: 1, value: "F" } },
  // { id: 7, name: "Karina", age: 21, sex: { key: 1, value: "F" } },
  // { id: 8, name: "Ulyana", age: 21, sex: { key: 1, value: "F" } },
  // { id: 9, name: "Mariia", age: 22, sex: { key: 1, value: "F" } },
  // { id: 10, name: "Kristina", age: 22, sex: { key: 1, value: "F" } },
  // { id: 11, name: "Karina", age: 21, sex: { key: 1, value: "F" } },
  // { id: 12, name: "Ulyana", age: 21, sex: { key: 1, value: "F" } },
  // { id: 13, name: "Mariia", age: 22, sex: { key: 1, value: "F" } },
  // { id: 14, name: "Kristina", age: 22, sex: { key: 1, value: "F" } },
  // { id: 15, name: "Karina", age: 21, sex: { key: 1, value: "F" } },
  // { id: 16, name: "Ulyana", age: 21, sex: { key: 1, value: "F" } },
];

export const getAll = async (req, res, next) => {
  const sorting = {
    direction: req.query.sortDirection,
    key: req.query.sortKey
  }
  const pagination = {
    skip: req.query.skip,
    take: req.query.take
  };
  try {
    let users = structuredClone(USERS);
    if (sorting.direction && sorting.key)
      users = sort(sorting.direction, sorting.key, users);
    if (pagination.skip && pagination.take)
      users = paginate(pagination.skip, pagination.take, users);

    res.status(200).json({
      data: users,
      totalCount: USERS.length
    });
  } catch (e) {
    console.log("*getAll service");
    next(e);
  }
};

const paginate = (skip, take, users) => {
  return users.slice(skip, skip + take);
}

const sort = (direction, key, users) => {
  if (direction === '') {
    return users;
  }

  users.sort((a, b) => {
    let valueA = a[key];
    let valueB = b[key];

    switch (key) {
      case 'sex':
        valueA = valueA.value;
        valueB = valueB.value;
        break;
    }

    return (
      (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1)
    );
  });

  return users;
}

export const addUser = async (req, res, next) => {
  const name = req.body?.name;
  const age = req.body?.age;
  const sex = req.body?.sex;

  try {
    const newUser = {
      name, age, sex
    }
    USERS.push(newUser);
    res.status(200).json(newUser);
  } catch (e) {
    console.log("*addUser service");
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  const id = req.body?.id;
  const name = req.body?.name;
  const age = req.body?.age;
  const sex = req.body?.sex;

  try {
    let userToUpdate = USERS.find(user => user.id === id);
    if (!userToUpdate) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
    userToUpdate = {
      name: name || userToUpdate.name,
      age: age || userToUpdate.age,
      sex: sex || userToUpdate.sex
    };
    const index = USERS.findIndex(user => user.id === id);
    USERS[index] = userToUpdate;

    res.status(200).json(userToUpdate);
  } catch (e) {
    console.log("*updateUser service");
    next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.body?.id;
  try {
    const index = USERS.findIndex(user => user.id === id);
    if (index < 0) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
    const userToDelete = USERS[index];
    USERS.splice(index, 1);

    res.status(200).json(userToDelete);
  } catch (e) {
    console.log("*deleteUser service");
    next(e);
  }
};
