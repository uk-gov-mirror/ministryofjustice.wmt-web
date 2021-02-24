const Link = require('../../app/services/domain/link')
const userRoleService = require('../services/user-role-service')
const UserRole = require('../services/domain/user-role')
const fieldValidator = require('../services/validators/field-validator')
const errorHandler = require('../services/validators/error-handler')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const User = require('../services/domain/user')
const ValidationError = require('../services/errors/validation-error')
const log = require('../logger')

module.exports = function (router) {
  router.get('/admin/user', function (req, res) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }

    const breadcrumbs = [
      new Link('User Rights', '/admin/user'),
      new Link('Admin', '/admin')
    ]

    const fail = req.query.fail

    const failureText = fail ? 'Invalid username specified' : null
    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return res.render('user', {
      title: 'User rights',
      breadcrumbs: breadcrumbs,
      failureText: failureText,
      userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
      authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
    })
  })

  router.post('/admin/user-rights', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }

    const breadcrumbs = [
      new Link('User Rights', '/admin/user-rights'),
      new Link('Admin', '/admin')
    ]

    const username = req.body.username

    if (!isValidUsername(username)) {
      return res.redirect(302, '/admin/user?fail=true')
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return userRoleService.getRoleByUsername(userRoleService.removeDomainFromUsername(username)).then(function (role) {
      return res.render('user-rights', {
        title: 'User rights',
        username: username,
        fullname: role.fullname,
        rights: role.role,
        breadcrumbs: breadcrumbs,
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
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
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }
    const rights = req.body.rights
    const username = req.params.username
    const loggedInUsername = req.user.username

    let thisUser
    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    try {
      thisUser = new User(req.body.fullname)
    } catch (error) {
      if (error instanceof ValidationError) {
        const breadcrumbs = [
          new Link('User Rights', '/admin/user-rights'),
          new Link('Admin', '/admin')
        ]
        return res.render('user-rights', {
          title: 'User rights',
          username: username,
          fullname: req.body.fullname,
          rights: req.body.rights,
          errors: error.validationErrors,
          breadcrumbs: breadcrumbs,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
        })
      } else {
        next(error)
      }
    }

    if (rights === roles.STAFF) {
      removeUserRole(username, next)
    } else {
      addUpdateUserRole(username, rights, loggedInUsername, thisUser.name)
    }

    return res.render('user', {
      title: 'User rights',
      userRights: { username: username, rights: rights },
      userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
      authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
    })
  })
}

const removeUserRole = function (username, next) {
  return userRoleService.getUserByUsername(userRoleService.removeDomainFromUsername(username)).then(function (user) {
    if (user) {
      return userRoleService.removeUserRoleByUserId(user.id).then(function () {
        return userRoleService.removeUserByUsername(userRoleService.removeDomainFromUsername(user.username))
      })
    }
  }).catch(function (error) {
    next(error)
  })
}

const addUpdateUserRole = function (username, rights, loggedInUsername, fullname) {
  return userRoleService.getUserByUsername(loggedInUsername).then(function (result) {
    const loggedInUser = result
    return userRoleService.getUserByUsername(userRoleService.removeDomainFromUsername(username)).then(function (result) {
      const user = result
      return userRoleService.updateUser(user.id, fullname).then(function () {
        return userRoleService.getRole(rights).then(function (role) {
          return userRoleService.updateUserRole(user.id, role.id, loggedInUser.id).then(function (result) {
            return result
          })
        })
      })
    }).catch(function (noUserExist) {
      log.error(noUserExist)
      return userRoleService.getRole(rights).then(function (result) {
        const role = result
        return userRoleService.addUser(userRoleService.removeDomainFromUsername(username), fullname).then(function (userId) {
          const newUserRole = new UserRole(userId, role.id, new Date(), loggedInUser.id)
          return userRoleService.addUserRole(newUserRole).then(function (result) {
            return result
          }).catch(function (unableToAddUserRole) {
            // If its not able to add the user role then the added user needs to be removed
            return userRoleService.removeUserByUsername(userRoleService.removeDomainFromUsername(username)).then(function (result) {
              return result
            })
          })
        })
      })
    })
  })
}

const isValidUsername = function (username) {
  const errors = errorHandler()

  fieldValidator(username, 'username', errors)
    .isValidUsername(username)

  if (errors.get()) {
    return false
  }
  return true
}
