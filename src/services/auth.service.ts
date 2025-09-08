import { ProviderEnum } from '../enums/account.provider.enum.js';
import { AccountModel } from '../models/account.model.js';
import { UserModel } from '../models/user.model.js';
import mongoose, { Types } from 'mongoose';
import { WorkspaceModel } from '../models/workspace.model.js';
import {
  NotFoundError,
  UserAlreadyExistsError
} from '../middlewares/error-handler/index.js';
import { MemberModel } from '../models/member.model.js';
import { RoleModel } from '../models/role.permission.model.js';
import { Roles } from '../enums/role.enum.js';

export const registerService = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = data;

  const session = await mongoose.startSession();
  const userId = new Types.ObjectId();
  const workspaceId = new Types.ObjectId();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) {
      throw new UserAlreadyExistsError('User already exists');
    }

    const user = new UserModel({
      _id: userId,
      name,
      email,
      password,
      currentWorkSpace: workspaceId
    });
    await user.save({ session });

    const account = new AccountModel({
      userId,
      provider: ProviderEnum.EMAIL,
      providerId: email
    });
    await account.save({ session });

    const workspace = new WorkspaceModel({
      _id: workspaceId,
      name: 'My Workspace',
      owner: userId
    });
    await workspace.save({ session });
    const ownerRole = await RoleModel.findOne({ name: Roles.OWNER }).session(
      session
    );
    if (!ownerRole) {
      throw new NotFoundError('Owner role not found');
    }
    const member = new MemberModel({
      userId,
      workspaceId,
      role: ownerRole._id,
      joinedAt: new Date()
    });
    await member.save({ session });

    await session.commitTransaction();
    return { user };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};
