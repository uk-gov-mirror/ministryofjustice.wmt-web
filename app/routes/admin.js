const Link = require('../../app/services/domain/link')
const userRoleService = require('../services/user-role-service')
const UserRole = require('../services/domain/user-role')
const fieldValidator = require('../services/validators/field-validator')
const errorHandler = require('../services/validators/error-handler')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unathorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden

module.exports = function (router) {
  router.get('/admin', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }
    var userRole
    var noAuth = false
    if (!req.user) {
      noAuth = true
    } else {
      userRole = req.user.user_role
    }
    return res.render('admin', {
      title: 'Admin',
      userRole: userRole,
      noAuth: noAuth
    })
  })

  router.get('/admin/user', function (req, res) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }

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
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }

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
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }
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
  return userRoleService.getUserByUsername(username).then(function (user) {
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
  return userRoleService.getUserByUsername(loggedInUsername).then(function (result) {
    var loggedInUser = result
    return userRoleService.getUserByUsername(username).then(function (result) {
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
