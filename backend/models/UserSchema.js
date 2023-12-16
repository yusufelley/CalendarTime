const userSchema = new Schema({
  userID: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  workTimePreferences: workTimePreferencesSchema,
  staticTimeBlocks: [timeBlockSchema],
  events: [eventSchema] // Array of event schemas
});

const User = mongoose.model("User", userSchema);

export default User;