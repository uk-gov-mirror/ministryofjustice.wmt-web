const Link = require('../../app/services/domain/link')
const userRoleService = require('../services/user-role-service')
const UserRole = require('../services/domain/user-role')
const Authorisation = require('../authorisation')

module.exports = function (router) {
  router.get('/admin', function (req, res) {
    var userRole
    try {
      if (Authorisation.isDataAdmin(req)) {
        userRole = 'DataAdmin'
      } else if (Authorisation.isSystemAdmin(req)) {
        userRole = 'SystemAdmin'
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

    var failureText = fail ? 'No valid username specified' : null

    return res.render('user', {
      title: 'User rights',
      breadcrumbs: breadcrumbs,
      failureText: failureText
    })
  })

  router.post('/admin/user-rights', function (req, res) {
    var breadcrumbs = [
      new Link('User Rights', '/admin/user-rights'),
      new Link('Admin', '/admin')
    ]

    var username = req.body.username

    if (!isValidUsername(username)) {
      return res.redirect(302, '/admin/user?fail=true')
    }

    return userRoleService.getRoleByUsername(username).then(function (role) {
      var rights
      if (role !== undefined) {
        rights = role.role
      }
      return res.render('user-rights', {
        title: 'User rights',
        username: username,
        rights: rights,
        breadcrumbs: breadcrumbs
      })
    })
  })

  router.post('/admin/user-rights/:username', function (req, res) {
    var rights = req.body.rights
    var username = req.params.username
    var loggedInUser = req.user.username

    if (rights === 'Staff') {
      removeUserRole(username, )
    } else {
      addUpdateUserRole(username, rights, loggedInUser)
    }

    return res.render('user', {
      title: 'User rights',
      userRights: { username: username, rights: rights }
    })
  })
}

var removeUserRole = function (username) {
  var user
  return userRoleService.getUser(username).then(function (result) {
    user = result
    if (user !== undefined) {
      return userRoleService.removeUserRoleByUserId(user.id).then(function () {
        return userRoleService.removeUserByUsername(user.username)
      })
    }
  })
}

var addUpdateUserRole = function (username, rights, loggedInUser) {
  var user
  var role
  return userRoleService.getUser(username).then(function (result) {
    user = result
    return userRoleService.getRole(rights).then(function (result) {
      role = result
      return userRoleService.updateUserRole(user.id, role.id, loggedInUser).then(function (result) {
        return result
      })
    })
  }).catch(function (noUserExist) {
    return userRoleService.getRole(rights).then(function (result) {
      role = result
      return userRoleService.addUser(username).then(function (result) {
        var userId = result
        var newUserRole = new UserRole(userId, role.id, new Date(), loggedInUser)
        return userRoleService.addUserRole(newUserRole).then(function (result) {
          return result
        })
      })
    })
  })
}

var isValidUsername = function (username) {
  var result = true
  if (username === undefined || username.length === 0) {
    result = false
  }
  return result
}
