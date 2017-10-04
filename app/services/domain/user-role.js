class UserRole {
  constructor (userId, roleId, lastUpdated, lastUpdatedBy) {
    this.userId = userId
    this.roleId = roleId
    this.lastUpdated = lastUpdated
    this.lastUpdatedBy = lastUpdatedBy
  }
}

module.exports = UserRole
