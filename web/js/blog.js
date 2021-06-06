;(function Blog() {
  'use strict'

  var offlineIcon
  var isOnline = 'onLine' in navigator ? navigator.onLine : true
  var isLoggedIn = /isLoggedIn=1/.test(document.cookie.toString() || '')
  var usingSW = 'serviceWorker' in navigator
  var swRegistration
  var svcwoker

  document.addEventListener('DOMContentLoaded', ready, false)
  initServiceWorker().catch(console.error)

  // **********************************

  function ready() {
    offlineIcon = document.getElementById('connectivity-status')

    if (!isOnline) {
      offlineIcon.classList.remove('hidden')
    }

    window.addEventListener('online', function online() {
      offlineIcon.classList.add('hidden')
      isOnline = true
    })

    window.addEventListener('offline', function offline() {
      offlineIcon.classList.remove('hidden')
      console.log(offlineIcon)
      isOnline = false
    })
  }

  async function initServiceWorker() {
    swRegistration = await navigator.serviceWorker.register('./sw.js', {
      updateViaCache: 'none',
    })

    svcwoker =
      swRegistration.installing ||
      swRegistration.waiting ||
      swRegistration.active

    navigator.serviceWorker.addEventListener(
      'controllerchange',
      function onController() {
        svcwoker = navigator.serviceWorker.controller
      }
    )
  }
})()
