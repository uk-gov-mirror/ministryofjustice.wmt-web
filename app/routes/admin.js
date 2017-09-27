const Link = require('../../app/services/domain/link')
const userRoleService = require('../services/user-role-service')
const UserRole = require('../services/domain/user-role')
const Authorisation = require('../authorisation')
const Roles = require('../constants/roles')
const FieldValidator = require('../services/validators/field-validator')
const ErrorHandler = require('../services/validators/error-handler')

module.exports = function (router) {
  router.get('/admin', function (req, res) {
    var userRole
    try {
      if (Authorisation.hasRole(req, Roles.DATA_ADMIN)) {
        userRole = Roles.DATA_ADMIN
      } else if (Authorisation.hasRole(req, Roles.SYSTEM_ADMIN)) {
        userRole = Roles.SYSTEM_ADMIN
      }
      return res.render('admin', {
        title: 'Admin',
        userRole: userRole
      })
    } catch (error) {
      res.status(401).redirect('/')
    }
  })

  router.get('/admin/user', function (req, res) {
    var breadcrumbs = [
      new Link('User Rights', '/admin/user'),
      new Link('Admin', '/admin')
    ]

    var fail = req.query.fail

    var failureText = fail ? 'Invalid username specified' : null

    return res.render('user', {
      title: 'User rights',
      breadcrumbs: breadcrumbs,
      failureText: failureText
    })
  })

  router.post('/admin/user-rights', function (req, res, next) {
    var breadcrumbs = [
      new Link('User Rights', '/admin/user-rights'),
      new Link('Admin', '/admin')
    ]

    var username = req.body.username

    if (!isValidUsername(username)) {
      return res.redirect(302, '/admin/user?fail=true')
    }

    return userRoleService.getRoleByUsername(username).then(function (role) {
      return res.render('user-rights', {
        title: 'User rights',
        username: username,
        rights: role.role,
        breadcrumbs: breadcrumbs
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/admin/user-rights/:username', function (req, res, next) {
    var rights = req.body.rights
    var username = req.params.username
    var loggedInUsername = req.user.username

    if (rights === Roles.STAFF) {
      removeUserRole(username, next)
    } else {
      addUpdateUserRole(username, rights, loggedInUsername)
    }

    return res.render('user', {
      title: 'User rights',
      userRights: { username: username, rights: rights }
    })
  })
}

var removeUserRole = function (username, next) {
  var user
  return userRoleService.getUser(username).then(function (result) {
    user = result
    if (user !== undefined) {
      return userRoleService.removeUserRoleByUserId(user.id).then(function () {
        return userRoleService.removeUserByUsername(user.username)
      })
    }
  }).catch(function (error) {
    next(error)
  })
}

var addUpdateUserRole = function (username, rights, loggedInUsername) {
  var loggedInUser
  var user
  var role
  return userRoleService.getUser(loggedInUsername).then(function (result) {
    loggedInUser = result
    return userRoleService.getUser(username).then(function (result) {
      user = result
      return userRoleService.getRole(rights).then(function (result) {
        role = result
        return userRoleService.updateUserRole(user.id, role.id, loggedInUser.id).then(function (result) {
          return result
        })
      })
    }).catch(function (noUserExist) {
      return userRoleService.getRole(rights).then(function (result) {
        role = result
        return userRoleService.addUser(username).then(function (result) {
          var userId = result
          var newUserRole = new UserRole(userId, role.id, new Date(), loggedInUser.id)
          return userRoleService.addUserRole(newUserRole).then(function (result) {
            return result
          })
        })
      })
    })
  })
}

var isValidUsername = function (username) {
  var errors = ErrorHandler()

  FieldValidator(username, 'username', errors)
    .isValidUsername(username)

  if (errors.get()) {
    return false
  }
  return true
}
