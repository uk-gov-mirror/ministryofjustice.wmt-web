const expect = require('chai').expect
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const config = require('../../../config')
const userRole = require('../../../app/constants/user-roles.js')
const UserRole = require('../../../app/services/domain/user-role')
const removeDomainFromUsername = require('../../../app/services/user-role-service').removeDomainFromUsername

const DOMAIN_USERNAME = 'Staff.Test@' + config.ACTIVE_DIRECTORY_DOMAIN
const STAFF_USER = { id: 0, username: 'Staff.Test', name: 'Staff Test' }

const STAFF_ROLE = { roleId: 0, role: userRole.STAFF }

let userRoleService
let getRoleByUsername
let updateUserRole
let addUserRole
let getRole
let getUserById
let getUserByUsername
let addUser
let removeUserRoleByUserId
let removeUserByUsername

beforeEach(function () {
  getRoleByUsername = sinon.stub()
  removeUserRoleByUserId = sinon.stub()
  removeUserByUsername = sinon.stub()
  getUserByUsername = sinon.stub()
  updateUserRole = sinon.stub()
  addUserRole = sinon.stub()
  getRole = sinon.stub()
  getUserById = sinon.stub()
  addUser = sinon.stub()
  userRoleService =
    proxyquire('../../../app/services/user-role-service',
      {
        './data/remove-user-role-by-user-id': removeUserRoleByUserId,
        './data/remove-user-by-username': removeUserByUsername,
        './data/get-user-role-by-username': getRoleByUsername,
        './data/get-user-by-username': getUserByUsername,
        './data/update-user-role': updateUserRole,
        './data/insert-user-role': addUserRole,
        './data/get-user-by-id': getUserById,
        './data/insert-user': addUser,
        './data/get-role': getRole
      })
})

describe('services/user-role-service', function () {
  it('should return a user role object with the right information', function () {
    getRoleByUsername.resolves(STAFF_ROLE)
    return userRoleService.getRoleByUsername(STAFF_USER.username)
      .then(function (result) {
        expect(result).to.equal(STAFF_ROLE)
      })
  })

  it('should return a role object with the right information', function () {
    getRole.resolves(STAFF_ROLE)
    return userRoleService.getRole(userRole.STAFF)
      .then(function (result) {
        expect(result).to.equal(STAFF_ROLE)
      })
  })

  it('should return a user object with the right information', function () {
    getUserByUsername.resolves(STAFF_USER)
    return userRoleService.getUserByUsername(STAFF_USER.username)
      .then(function (result) {
        expect(result).to.equal(STAFF_USER)
      })
  })

  it('should return a user object with the right information', function () {
    getUserById.resolves(STAFF_USER)
    return userRoleService.getUserById(STAFF_USER.id)
      .then(function (result) {
        expect(result).to.equal(STAFF_USER)
      })
  })

  it('should add a user', function () {
    addUser.resolves(STAFF_ROLE.id)
    return userRoleService.addUser(STAFF_USER.username, STAFF_ROLE.name)
      .then(function (result) {
        expect(result).to.equal(STAFF_ROLE.id)
      })
  })

  it('should add a user role', function () {
    addUserRole.resolves(1)
    return userRoleService.addUserRole(new UserRole(1, 1, new Date(), 1))
      .then(function (result) {
        expect(result).to.equal(1)
      })
  })

  it('should update a user role', function () {
    updateUserRole.resolves(1)
    return userRoleService.updateUserRole(new UserRole(1, 2, new Date(), 1))
      .then(function (result) {
        expect(result).to.equal(1)
      })
  })

  it('should remove a user role by user id', function () {
    removeUserRoleByUserId.resolves(STAFF_ROLE.id)
    return userRoleService.removeUserRoleByUserId(STAFF_ROLE.id)
      .then(function (result) {
        expect(result).to.equal(STAFF_ROLE.id)
      })
  })

  it('should remove a user by username', function () {
    removeUserByUsername.resolves(1)
    return userRoleService.removeUserByUsername(STAFF_USER.username)
      .then(function (result) {
        expect(result).to.equal(1)
      })
  })

  it('should return the username without the domain name', function () {
    const result = removeDomainFromUsername(DOMAIN_USERNAME)
    expect(result).to.equal(STAFF_USER.username)
  })
})
