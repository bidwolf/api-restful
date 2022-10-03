import { Router } from "express";
import User, { IUser } from "../models/User";
const router = Router();
// create user
router.post('/', async (req, res) => {
  const UserActual: IUser = req.body;
  try {
    await User.create(UserActual);
    res.status(201);
    res.json({
      "code": 201,
      "message": "User was registered",
      "user": UserActual
    })
  } catch (error) {
    res.status(500);
    res.json({
      "code": 500,
      "message": error
    });
  }
})
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      "code": 500,
      "message": error
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(422).json({
        "code": 422,
        "message": "Could'not match user id"
      })
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      "code": 500,
      "message": error
    });
  }
});
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const user: IUser = req.body;
  try {
    const updatedUser = await User.updateOne({ _id: id }, user);
    if (updatedUser.matchedCount === 0) {
      res.status(422).json({
        "code": 422,
        "message": "Could'not match user id"
      })
      return;
    }
    if (updatedUser.modifiedCount === 0) {
      res.status(202).json({
        "code": 202,
        "message": "No change made. This can be caused when: 1. No valid parameter is passed; 2. There is no difference between the body of the request and the object to be updated"
      })
    }
    res.status(200).json({
      "code": 200,
      "user": user,
      "message": "User updated.",
      updatedUser
    })
  } catch (error) {
    res.status(500).json({
      "code": 500,
      "message": error
    });
  }
})
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user=await User.findById(id);
    if (!user) {
      res.status(422).json({
        "code": 422,
        "message": "Could'not match user id"
      })
      return;
    }
    const deleteInfo = await user.deleteOne();
    res.status(200).json({
      "code": 200,
      "message": "User deleted.",
      "delete_Info": deleteInfo
    })
  } catch (error) {
    res.status(500).json({
      "code": 500,
      "message": error
    });
  }
})

export default router;