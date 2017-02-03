var spectron = require('spectron')
var path = require('path')
var tape = require('tape')

// tape('init', function (t) {
//   t.test('should be able to boot up the app', function (t) {
//     var app = createApp()
//     waitForLoad(app)
//       .then(() => app.browserWindow.isVisible())
//       .then((val) => t.equal(val, true))
//       .then(() => app.client.getWindowCount())
//       .then((val) => t.equal(val, 1, 'getWindowCount'))
//       .then(() => app.browserWindow.isMinimized())
//       .then((val) => t.equal(val, false, 'isMinimized'))
//       .then(() => app.browserWindow.isDevToolsOpened())
//       .then((val) => t.equal(val, false, 'isDevToolsOpened'))
//       .then(() => app.browserWindow.isVisible())
//       .then((val) => t.equal(val, true, 'isVisible'))
//       .then(() => app.browserWindow.isFocused())
//       .then((val) => t.equal(val, true, 'isFocused'))
//       .then(() => app.browserWindow.getBounds())
//       .then((val) => t.notEqual(val.width, 0, 'getBounds'))
//       .then(() => app.browserWindow.getBounds())
//       .then((val) => t.notEqual(val.height, 0, 'getBounds'))
//       .then(() => endTest(app, t), (err) => endTest(app, t, err || 'error'))
//   })
// })

tape('onboarding', function (t) {
  // t.test('welcome screen should appear, and be dismissable', function (t) {
  //   var app = createApp()
  //   waitForLoad(app)
  //     .then(() => app.browserWindow.isVisible())
  //     .then((isVisible) => t.equal(isVisible, true))
  //     .then(() => app.client.click('button'))
  //     .then(() => app.browserWindow.getTitle())
  //     .then((title) => t.equal(title, 'Dat Desktop'))
  //     .then(() => endTest(app, t), (err) => endTest(app, t, err || 'error'))
  // })

  // t.test('welcome screen should show every time you open the app as long as you have no dats', function (t) {
  //   var app = createApp()
  //   waitForLoad(app)
  //     .then(() => app.browserWindow.isVisible())
  //     .then((isVisible) => t.equal(isVisible, true))
  //     .then(() => app.client.click('button'))
  //     .then(() => app.browserWindow.getTitle())
  //     .then((title) => t.equal(title, 'Dat Desktop'))
  //     .then(() => app.stop())
  //     .then(() => Promise.resolve(app = createApp()))
  //     .then(() => waitForLoad(app))
  //     .then(() => app.browserWindow.isVisible())
  //     .then((isVisible) => t.equal(isVisible, true))
  //     .then(() => app.client.click('button'))
  //     .then(() => app.browserWindow.getTitle())
  //     .then((title) => t.equal(title, 'Dat Desktop'))
  //     .then(() => endTest(app, t), (err) => endTest(app, t, err || 'error'))
  // })

  t.test('make sure you can minimize, full screen, resize, and move the window')
  t.test('after clicking away welcome screen you should see an empty list with import dat and create new dat', function (t) {
    var app = createApp()
    waitForLoad(app)
      .then(() => app.browserWindow.isVisible())
      .then((isVisible) => t.equal(isVisible, true))
      .then(() => app.client.click('button'))
      .then(wait)
      .then(() => app.client.getText('import dat'))
      .then(() => app.client.getText('create new dat'))
      .then(() => endTest(app, t), (err) => endTest(app, t, err || 'error'))
  })
})

tape('working with dats', function (t) {
  t.test('click "create new dat" and share a local folder, you should see a new item in the list')
  t.test('click the link icon and it should copy the dat link to your clipboard')
})

// Create a new app instance
function createApp () {
  return new spectron.Application({
    path: path.join(__dirname, '../node_modules/.bin/electron'),
    args: [path.join(__dirname, '../index.js')],
    env: { NODE_ENV: 'test' }
  })
}

// Starts the app, waits for it to load, returns a promise
function waitForLoad (app, t, opts) {
  if (!opts) opts = {}
  return app.start().then(function () {
    return app.client.waitUntilWindowLoaded()
  }).then(function () {
    // Switch to the main window
    return app.client.windowByIndex(0)
  }).then(function () {
    return app.client.waitUntilWindowLoaded()
  })
}

// Returns a promise that resolves after 'ms' milliseconds. Default: 1 second
function wait (ms) {
  ms = ms || 1000
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms)
  })
}

// Quit the app, end the test, either in success (!err) or failure (err)
function endTest (app, t, err) {
  return app.stop().then(function () {
    t.end(err)
  })
}
