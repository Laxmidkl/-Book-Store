

const admin = require('../../firebaseAdmin'); // Firebase Admin SDK

// 🚀 DELETE Firebase Auth User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user is an admin in MongoDB
    const User = require('./user.model');
    const adminUser = await User.findOne({ firebaseUid: id });
    if (adminUser) {
      return res.status(403).json({ message: "Cannot delete admin user from Firebase" });
    }

    // Delete user from Firebase Auth
    await admin.auth().deleteUser(id);

    res.status(200).json({ message: 'User successfully deleted from Firebase Auth' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map(userRecord => ({
      uid: userRecord.uid,
      email: userRecord.email,
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error('Error listing users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};