import mongoose from 'mongoose';

// export const Role = mongoose.model(
//   'Role',
//   new mongoose.Schema({
//     name: { type: String, required: true },
//   })
// );

export interface Role {
  name: string;
}

const roleSchema = new mongoose.Schema({
  name: { type: String },
});

export const RoleModel = mongoose.model<Role>('role', roleSchema);
