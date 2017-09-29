const Link = require('../../app/services/domain/link')
const userRoleService = require('../services/user-role-service')
const UserRole = require('../services/domain/user-role')
const authorisation = require('../authorisation')
const roles = require('../constants/user-roles')
const fieldValidator = require('../services/validators/field-validator')
const errorHandler = require('../services/validators/error-handler')

module.exports = function (router) {
  router.get('/admin', function (req, res) {
    var userRole
    try {
      if (authorisation.hasRole(req, roles.DATA_ADMIN)) {
        userRole = roles.DATA_ADMIN
      } else if (authorisation.hasRole(req, roles.SYSTEM_ADMIN)) {
        userRole = roles.SYSTEM_ADMIN
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
    if (rights === roles.STAFF) {
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
  return userRoleService.getUser(username).then(function (user) {
    if (user) {
      return userRoleService.removeUserRoleByUserId(user.id).then(function () {
        return userRoleService.removeUserByUsername(user.username)
      })
    }
  }).catch(function (error) {
    next(error)
  })
}

var addUpdateUserRole = function (username, rights, loggedInUsername) {
  return userRoleService.getUser(loggedInUsername).then(function (result) {
    var loggedInUser = result
    return userRoleService.getUser(username).then(function (result) {
      var user = result
      return userRoleService.getRole(rights).then(function (role) {
        return userRoleService.updateUserRole(user.id, role.id, loggedInUser.id).then(function (result) {
          return result
        })
      })
    }).catch(function (noUserExist) {
      return userRoleService.getRole(rights).then(function (result) {
        var role = result
        return userRoleService.addUser(username).then(function (userId) {
          var newUserRole = new UserRole(userId, role.id, new Date(), loggedInUser.id)
          return userRoleService.addUserRole(newUserRole).then(function (result) {
            return result
          }).catch(function (unableToAddUserRole) {
            // If its not able to add the user role then the added user needs to be removed
            return userRoleService.removeUserByUsername(username).then(function (result) {
              return result
            })
          })
        })
      })
    })
  })
}

var isValidUsername = function (username) {
  var errors = errorHandler()

  fieldValidator(username, 'username', errors)
    .isValidUsername(username)

  if (errors.get()) {
    return false
  }
  return true
}
