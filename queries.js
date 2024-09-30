const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blog",
  password: "ahmed@123",
  port: 5432,
});

const createtable = async (req, res) => {
  try {
    console.log("hy im here");
    const query = `CREATE TABLE "blog"(
            id serial primary key,
            blogName varchar(100),
            blogTitle varchar(50) UNIQUE,
            blogBody varchar(50),
            "createdAt" bigint,
            "updatedAt" bigint,
            userId int,
            CONSTRAINT fk_user
                FOREIGN KEY (userId) 
                REFERENCES "user"(id)
                ON DELETE CASCADE
        )`;

    const result = await pool.query(query);

    console.log("hy hy hyh hy ");

    res.json({
      affected: result.rowCount,
      message: `Table created successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const createblog = async (req, res) => {
  try {
    const { blogName, blogTitle, blogBody, userId } = req.body;
    const query = `
            INSERT INTO "blog" 
            (blogName, blogTitle,blogBody,userId,"createdAt", "updatedAt") VALUES 
            ($1, $2, $3, $4, $5, $6)`;
    result = await pool.query(query, [
      blogName,
      blogTitle,
      blogBody,
      userId,
      timeStamp(),
      timeStamp(),
    ]);
    res.json({
      message: `Blog saved  successfull`,
      affected: result.rowCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await pool.query(`SELECT * FROM "blog"`);
    if (response.rowCount <= 0) {
      res.json({
        users: null,
        message: "blog table is empty",
      });
    }

    res.json({
      blogs: response.rows,
      message: "blog list",
    });
  } catch (error) {
    res.json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await pool.query(`SELECT * FROM "blog" WHERE id = $1`, [
      req.params.id,
    ]);
    if (response.rowCount <= 0) {
      res.json({
        user: null,
        message: "Blog does not exist",
      });
    }

    res.json({
      user: response.rows[0],
      message: "blog",
    });
  } catch (error) {
    res.json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const del = async (req, res) => {
  try {
    const response = await pool.query(
      `DELETE FROM "blog" WHERE id = $1 RETURNING *`,
      [req.params.id]
    );

    if (response.rowCount <= 0) {
      return res.json({
        user: null,
        message: "blog does not exist",
      });
    }

    return res.json({
      user: response.rows[0],
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const { blogName, blogTitle, blogBody } = req.body;
    const response = await pool.query(
      `UPDATE "blog" SET blogName=$1,blogTitle=$2,blogBody=$3 WHERE id=$4 RETURNING *`,
      [blogName, blogTitle, blogBody, id]
    );

    if (response.rowCount <= 0) {
      return res.json({
        user: null,
        message: "blog does not exist",
      });
    }

    return res.json({
      user: response.rows[0],
      message: "Blog updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//Users Table
const create_userTable = async (req, res) => {
  try {
    const query = `CREATE TABLE  IF NOT EXISTS "user"(
            id serial primary key,
            firstName varchar(100),
            lastName varchar(150),
            email varchar(150),
            password varchar(150),
            "createdAt" bigint,
            "updatedAt" bigint
        )`;

    const result = await pool.query(query);

    res.json({
      affected: result.rowCount,
      message: `User Table created successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const create_user = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const query = `
            INSERT INTO "user" 
            (firstName, lastName, email,password,"createdAt", "updatedAt") VALUES 
            ($1, $2, $3, $4, $5,$6)`;
    result = await pool.query(query, [
      firstName,
      lastName,
      email,
      password,
      timeStamp(),
      timeStamp(),
    ]);
    res.json({
      message: `user created   successfull`,
      affected: result.rowCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const get_users = async (req, res) => {
  console.log("i m here");
  try {
    const response = await pool.query(`SELECT * FROM "user"`);
    if (response.rowCount <= 0) {
      res.json({
        users: null,
        message: "user table is empty",
      });
    }

    res.json({
      users: response.rows,
      message: "user list",
    });
  } catch (error) {
    res.json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const get_user = async (req, res) => {
  try {
    const response = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [
      req.params.id,
    ]);
    if (response.rowCount <= 0) {
      res.json({
        user: null,
        message: "User does not exist",
      });
    }

    res.json({
      user: response.rows[0],
      message: "user",
    });
  } catch (error) {
    res.json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const del_user = async (req, res) => {
  try {
    const response = await pool.query(
      `DELETE FROM "user" WHERE id = $1 RETURNING *`,
      [req.params.id]
    );

    if (response.rowCount <= 0) {
      return res.json({
        user: null,
        message: "user does not exist",
      });
    }

    return res.json({
      user: response.rows[0],
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const get_user_blogs = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await pool.query(
      `SELECT * FROM "blog" WHERE "userid" = $1`,
      [userId]
    );
    if (response.rowCount <= 0) {
      res.json({
        blog: null,
        message: "User does not exist",
      });
    }

    res.json({
      blogs: response.rows,
      message: "user",
    });
  } catch (error) {
    res.json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// utility function
const timeStamp = () => {
  const time = +new Date();
  return time;
};

module.exports = {
  createtable,
  createblog,
  getAll,
  get,
  del,
  updateBlog,
  create_userTable,
  create_user,
  get_users,
  get_user,
  del_user,
  get_user_blogs,
};
