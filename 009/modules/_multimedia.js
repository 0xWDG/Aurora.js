/*
                         _
                        (_)
                         _    _____
                        | |  / ____|
                        | |  | (___
                    _   | |  \___  \
     ______    _   | |__| |  ____) |
    |______|  (_)   \____/  |______/
                              v0.0.7

    https://www.github.com/wesdegroot/_.js/
    or https://www.wdgwv.com

    Git:     https://github.com/wesdegroot/_.js
    Todo:    https://github.com/wesdegroot/_.js/issues
    Licence: https://github.com/wesdegroot/_.js/blob/master/LICENCE.md (CC BY 4.0)
    Latest:  https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/_.js
*/
if (typeof _ !== 'function') {
  window.alert('Please make sure _.js is loaded!')
} else {
  window.players = {} // the media players
  window.video = 'video' // video -> video (if user forgets '')
  window.audio = 'audio' // audio -> audio (if user forgets '')
  window.MMActive = '' // Wich player is active?
  window.MMTime = 0 // What is the playing time?
  window.MMLTime = 0 // What is the (last) playing time?
  window.MMisSeek = false // Is seeking?

  /**
   * multimedia
   *
   * Add a nice multimedia parser
   *
   * @param object object
   * @param data the configuration array.
   * @see https://github.com/wesdegroot/_.js/wiki/module_multimedia
   * @example _().multimedia()
   */
  window._.fn.multimedia = function (data) {
    var len = this.length
    while (len--) {
      var mediaType = {
        mp3: 'audio',
        ogg: 'ERROR',
        wav: 'audio',
        mp4: 'video',
        webm: 'video'
      }
      var audioTypes = {
        mp3: 'audio/mpeg',
        ogg: 'audio/ogg',
        wav: 'audio/wav',
        webm: 'audio/webm'
      }
      var videoTypes = {
        mp4: 'video/mp4',
        ogg: 'video/ogg',
        webm: 'video/webm'
      }
      var options = {
        autoplay: true,
        controls: false,
        visible: false, // Deprecated. (yes that's soon, it's useless (use's parent class ;))
        default: true,
        type: 'ERROR'
      }

      // is "data" a object (array thing)
      if (typeof data === 'object') {
        // if file is undefined, break.
        if (this.isUndefined(data['file'])) {
          console.error('Need a file!')
          console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia')
          break
        } else {
          // if object has options
          if (typeof data['options'] !== 'undefined') {
            // and a type!
            if (typeof data['options']['type'] !== 'undefined') {
              options['type'] = data['options']['type']
            } else {
              if (typeof data['file'] === 'object') {
                options['type'] = mediaType[data['file'][0].substr(data['file'][0].indexOf('.') + 1)]
              } else {
                options['type'] = mediaType[data['file'].substr(data['file'].indexOf('.') + 1)]
              }
            }

            // autoplay on? off?
            if (typeof data['options']['autoplay'] !== 'undefined') options['autoplay'] = data['options']['autoplay']

            // controls visible?
            if (typeof data['options']['controls'] !== 'undefined') options['controls'] = data['options']['controls']

            // must the player be visible?
            if (typeof data['options']['visible'] !== 'undefined') options['visible'] = data['options']['visible']

            // Not the default config anymore!
            options['default'] = false
          } else {
            // no options given, so default ones.
            options['type'] = mediaType[data['file'].substr(data['file'].indexOf('.') + 1)]
          }

          // shit, default, but it's an ogg (audio or video...)
          if (options['type'] === 'ERROR') {
            console.error("File extension is .ogg!, we can't detect if it is a audio or a video file. sorry.")
            console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia')
          }
        }

        // Clean out the placeholder
        this[len].innerHTML = ''

        // Play ad (before)
        if (!this.isUndefined(data['before'])) {
          // has his own data :D
          if (typeof data['before'] === 'object') {
            // Parse things
            console.error('Not yet supported :(')
            console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia')
          } else {
            // even better. our default data.

            // Create "MMElement" (MultiMediaElement)
            var MMElement = document.createElement(mediaType[data['before'].substr(data['before'].indexOf('.') + 1)])

            // Does it need controls? [AD NEED NEVER CONTOLS]
            // if (options['controls'])
            //    MMElement.setAttribute("controls", "yes")

            // Pre load ;)
            MMElement.setAttribute('preload', 'auto')

            // Set Height (100%)
            MMElement.setAttribute('height', '100%')

            // Set width
            MMElement.setAttribute('width', '100%')

            // And hack it ;)
            MMElement.setAttribute('style', 'width:100%;height:100%;')

            // Set the id
            MMElement.setAttribute('id', 'MMMain0')

            // Autobuffer ;) (we dont like delay)
            MMElement.autobuffer = true

            // Create the source
            var source = document.createElement('source')

            // What is the type of the file?
            if (mediaType[data['before'].substr(data['before'].indexOf('.') + 1)] !== 'video') {
              source.type = audioTypes[data['before'].substr(data['before'].indexOf('.') + 1)]
            } else {
              source.type = videoTypes[data['before'].substr(data['before'].indexOf('.') + 1)]
            }

            // And the SouRCe
            source.src = data['before']

            // Append source to "MMElement"
            MMElement.appendChild(source)

            // Start loading
            MMElement.load()

            // Do we have autoplay?
            if (options['autoplay']) MMElement.play()

            window.MMActive = 0

            // Kill seeking (skipping ad)
            MMElement.addEventListener('seeking', function (event) {
              // Warn the 'timeupdate' that the user is seeking, don't save anything!
              window.MMisSeek = true

              // if seeked more then now, then revert

              if (this.currentTime > window.MMLTime) {
                this.currentTime = window.MMLTime
              }

              // + unset seeking action (always)
              window.MMisSeek = false
            })

            MMElement.addEventListener('timeupdate', function (event) {
              // save the time
              if (!window.MMisSeek) {
                // save the 'last' time (seeking sets time)
                window.MMLTime = window.MMTime

                // set the time
                window.MMTime = this.currentTime
              }
            })

            // On end play the next.
            MMElement.addEventListener('ended', function () {
              // Pause this one
              this.pause()

              // make me hidden
              this.style.visibility = 'hidden'
              this.style.display = 'none'

              // make the second visible
              document.getElementById('MMMain1').style.visibility = ''
              document.getElementById('MMMain1').style.display = 'block'

              // Play the next
              document.getElementById('MMMain1').play()

              // Wich player is active
              window.MMActive = 1

              // Reset player time
              window.MMTime = 0
            })

            // Add to HTML
            this[len].appendChild(MMElement)

            // Add Player to the global window.players list (for skip, pause, active, multiple files)
            window.players = this.merge(window.players, {MMMain0: {file: data['before'], html: MMElement, options: options}})
          }
        }

        if (typeof data['file'] !== 'object') {
          data['file'] = [data['file']]
        }

        for (var i = 0; i < data['file'].length; i++) {
          var now = this.isUndefined(data['before']) ? i : i + 1

          // Main file
          // Create "MMElement" (MultiMediaElement)
          MMElement = document.createElement(mediaType[data['file'][i].substr(data['file'][i].indexOf('.') + 1)])

          // Does it need controls?
          if (options['controls']) MMElement.setAttribute('controls', 'yes')

          // Pre load ;)
          MMElement.setAttribute('preload', 'auto')

          // Set Height (100%)
          MMElement.setAttribute('height', '100%')

          // Set width
          MMElement.setAttribute('width', '100%')

          // And hack it ;)
          if (this.isUndefined(data['before'])) {
            MMElement.setAttribute('style', 'width:100%;height:100%;')
          } else {
            MMElement.setAttribute('style', 'visibility:hidden;display:none;width:100%;height:100%;')
          }

          // Set the id
          MMElement.setAttribute('id', 'MMMain' + now)

          // Wich player is active
          if (this.isUndefined(data['before'])) window.MMActive = MMElement

          // No ad, but autoplay ;)
          if (options['autoplay'] && this.isUndefined(data['before'])) MMElement.play()

          // Autobuffer ;) (we dont like delay)
          MMElement.autobuffer = true

          // Create the source
          source = document.createElement('source')

          // What is the type of the file?
          if (options['type'] !== 'video') {
            source.type = audioTypes[data['file'][i].substr(data['file'][i].indexOf('.') + 1)]
          } else {
            source.type = videoTypes[data['file'][i].substr(data['file'][i].indexOf('.') + 1)]
          }

          // And the SouRCe
          source.src = data['file'][i]

          // Append source to "MMElement"
          MMElement.appendChild(source)

          // Start loading
          MMElement.load()

          MMElement.addEventListener('ended', function () {
            // Wich one is playing now?
            now = window.MMActive

            // Does the second exists?
            if (document.getElementById('MMMain' + (now + 1)) != null) {
              // Pause this one
              this.pause()

              // make me hidden
              this.style.visibility = 'hidden'
              this.style.display = 'none'

              // make the second visible
              document.getElementById('MMMain' + (now + 1)).style.visibility = ''
              document.getElementById('MMMain' + (now + 1)).style.display = 'block'

              // Play the next
              document.getElementById('MMMain' + (now + 1)).play()

              // Wich player is active
              window.MMActive = now + 1

              // Reset playing time
              window.MMTime = 0
            }
          })

          // Add to HTML
          this[len].appendChild(MMElement)

          // Add Player to the global window.players list (for skip, pause, active, multiple files)
          /*eslint-disable */
          eval('window.players=this.merge(window.players,{MMMain' + now + ":{file:data['file'][i],html:MMElement,options:options}});")
        /* eslint-enable */
        }

        // Ad on end.
        if (!this.isUndefined(data['after'])) {
          if (typeof data['after'] === 'object') {
            // Parse things
            console.error('Not yet supported :(')
            console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia')
          } else {
            // Create "MMElement" (MultiMediaElement)
            MMElement = document.createElement(mediaType[data['after'].substr(data['after'].indexOf('.') + 1)])

            // Does it need controls? [AD NEED NEVER CONTOLS]
            // if (options['controls'])
            //    MMElement.setAttribute("controls", "yes")

            // Pre load ;)
            MMElement.setAttribute('preload', 'auto')

            // Set Height (100%)
            MMElement.setAttribute('height', '100%')

            // Set width
            MMElement.setAttribute('width', '100%')

            // And hack it ;)
            MMElement.setAttribute('style', 'visibility:hidden;display:none;width:100%;height:100%;')

            // Set the id
            MMElement.setAttribute('id', 'MMMain' + (now + 1))

            // Autobuffer ;) (we dont like delay)
            MMElement.autobuffer = true

            // Create the source
            source = document.createElement('source')

            // What is the type of the file?
            if (mediaType[data['after'].substr(data['after'].indexOf('.') + 1)] !== 'video') {
              source.type = audioTypes[data['after'].substr(data['after'].indexOf('.') + 1)]
            } else {
              source.type = videoTypes[data['after'].substr(data['after'].indexOf('.') + 1)]
            }

            // What is the type of the file?
            source.src = data['after']

            // Append source to "MMElement"
            MMElement.appendChild(source)

            // Start loading
            MMElement.load()

            // Kill seeking (skipping ad)
            MMElement.addEventListener('seeking', function (event) {
              // Warn the 'timeupdate' that the user is seeking, don't save anything!
              window.MMisSeek = true

              // if seeked more then now, then revert

              if (this.currentTime > window.MMLTime) {
                this.currentTime = window.MMLTime
              }

              // + unset seeking action (always)
              window.MMisSeek = false
            })

            MMElement.addEventListener('timeupdate', function (event) {
              // save the time
              if (!window.MMisSeek) {
                // save the 'last' time (seeking sets time)
                window.MMLTime = window.MMTime

                // set the time
                window.MMTime = this.currentTime
              }
            })

            // On end pause
            MMElement.addEventListener('ended', function () {
              // Pause, all done my friend.
              this.pause()

              // And reset playing time
              window.MMTime = 0
            })

            // Add to HTML
            this[len].appendChild(MMElement)

            // Add Player to the global window.players list (for skip, pause, active, multiple files)
            /*eslint-disable */
            eval('window.players=this.merge(window.players,{MMMain' + (now + 1) + ":{file:data['after'],html:MMElement,options:options}});")
          /* eslint-enable */
          }
        }
      } else {
        console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia')
      }
    }
  }

  /**
   * multimedia_start
   *
   * multimedia player, start
   *
   * @param object object
   * @see https://github.com/wesdegroot/_.js/wiki/module_multimedia
   * @example _().multimedia_start()
   */
  window._.fn.multimedia_start = function () {
    // Start current player
    document.getElementById('MMMain' + window.MMActive).play()
  }

  /**
   * multimedia_pause
   *
   * multimedia player, pause
   *
   * @param object object
   * @see https://github.com/wesdegroot/_.js/wiki/module_multimedia
   * @example _().multimedia_pause()
   */
  window._.fn.multimedia_pause = function () {
    // Start current player
    document.getElementById('MMMain' + window.MMActive).pause()
  }

  /**
   * multimedia_stop
   *
   * multimedia player, stop
   *
   * @param object object
   * @see https://github.com/wesdegroot/_.js/wiki/module_multimedia
   * @example _().multimedia_stop()
   */
  window._.fn.multimedia_stop = function () {
    // Start current player
    document.getElementById('MMMain' + window.MMActive).pause()

    // Reset playing time
    window.MMTime = 0

    // And reset time on element
    document.getElementById('MMMain' + window.MMActive).currentTime = 0
  }

  /**
   * multimedia_skip
   *
   * multimedia player, skip
   *
   * @param object object
   * @see https://github.com/wesdegroot/_.js/wiki/module_multimedia
   * @example _().multimedia_skip()
   */
  window._.fn.multimedia_skip = function () {
    // Is there one more?
    if (document.getElementById('MMMain' + (window.MMActive + 1)) != null) {
      // Pause this one
      document.getElementById('MMMain' + window.MMActive).pause()

      // make me hidden
      document.getElementById('MMMain' + window.MMActive).style.visibility = 'hidden'
      document.getElementById('MMMain' + window.MMActive).style.display = 'none'

      // make the second visible
      document.getElementById('MMMain' + (window.MMActive + 1)).style.visibility = ''
      document.getElementById('MMMain' + (window.MMActive + 1)).style.display = 'block'

      // Play the next
      document.getElementById('MMMain' + (window.MMActive + 1)).play()

      // Wich player is active
      window.MMActive = window.MMActive + 1

      // Reset playing time
      window.MMTime = 0
    } else {
      console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia')
    }
  }
}
