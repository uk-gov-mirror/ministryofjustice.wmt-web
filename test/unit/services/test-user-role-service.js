const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')

const proxyquire = require('proxyquire')
const config = require('../../../config')
const userRole = require('../../../app/constants/user-roles.js')

var STAFF_USER = 'Staff.Test@' + config.ACTIVE_DIRECTORY_DOMAIN
var SYSTEM_USER = 'System.AdminTest@' + config.ACTIVE_DIRECTORY_DOMAIN
var DATA_USER = 'Data.AdminTest@' + config.ACTIVE_DIRECTORY_DOMAIN
var MANAGER_USER = 'Manager.Test@' + config.ACTIVE_DIRECTORY_DOMAIN

var getRoleByUsername
var userRoleService

beforeEach(function () {
  getRoleByUsername = sinon.stub()

  userRoleService =
    proxyquire('../../../app/services/user-role-service',
      {
        './services/user-role-service': getRoleByUsername
      })
})

describe('services/user-role-service', function () {
  describe('Get role by username', function () {
    it('should return Staff role object with the right information', function () {
      return userRoleService.getRoleByUsername(STAFF_USER)
        .then(function (result) {
          expect(result.roleId).to.equal(0)
          expect(result.role).to.equal(userRole.STAFF)
        })
    })

    it('should return System Admin user role object for a system admin user', function () {
      return userRoleService.getRoleByUsername(SYSTEM_USER)
        .then(function (result) {
          expect(result.roleId).to.be.a('number')
          expect(result.role).to.equal(userRole.SYSTEM_ADMIN)
        })
    })

    it('should return Data Admin user role object for a data admin user', function () {
      return userRoleService.getRoleByUsername(DATA_USER)
        .then(function (result) {
          expect(result.roleId).to.be.a('number')
          expect(result.role).to.equal(userRole.DATA_ADMIN)
        })
    })

    it('should return Manager Admin user role object for a manager user', function () {
      return userRoleService.getRoleByUsername(MANAGER_USER)
        .then(function (result) {
          expect(result.roleId).to.be.a('number')
          expect(result.role).to.equal(userRole.MANAGER)
        })
    })
  })

  describe('Get role', function () {
    it('should return a system admin role object with the right information', function () {
      return userRoleService.getRole(userRole.SYSTEM_ADMIN)
        .then(function (result) {
          expect(result.id).to.be.a('number')
          expect(result.role).to.equal(userRole.SYSTEM_ADMIN)
        })
    })
    it('should return a data admin role object with the right information', function () {
      return userRoleService.getRole(userRole.DATA_ADMIN)
        .then(function (result) {
          expect(result.id).to.be.a('number')
          expect(result.role).to.equal(userRole.DATA_ADMIN)
        })
    })
    it('should return a manager role object with the right information', function () {
      return userRoleService.getRole(userRole.MANAGER)
        .then(function (result) {
          expect(result.id).to.be.a('number')
          expect(result.role).to.equal(userRole.MANAGER)
        })
    })
  })

  describe('Get user', function () {
    it('should return a user object with the right information', function () {
      return userRoleService.getUser(MANAGER_USER)
        .then(function (result) {
          expect(result.id).to.be.a('number')
          expect(result.username + '@' + config.ACTIVE_DIRECTORY_DOMAIN).to.equal(MANAGER_USER)
        })
    })
  })

  describe('Add user', function () {
    it('should add a user', function () {
      return userRoleService.addUser(STAFF_USER)
        .then(function (id) {
          expect(id).to.be.a('number')
          return userRoleService.removeUserByUsername(STAFF_USER)
          .then(function (result) {
            expect(result).to.be.greaterThan(0)
          })
        })
    })
  })
})
