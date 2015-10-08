/*

                         _    _____ 
                        | |  / ____|
                        | |  | (___  
                    _   | |  \___  \ 
     ______    _   | |__| |  ____) |
    |______|  (_)   \____/  |______/ 
                              v0.0.5
    UNRELEASED PRE-BETA (TEST VERSION)
    PLEASE REPORT ALL BUGS HERE: https://github.com/wesdegroot/_.js/issues/9

    https://www.github.com/wesdegroot/_.js/
    or https://www.wdgwv.com

    Git:     https://github.com/wesdegroot/_.js
    Todo:    https://github.com/wesdegroot/_.js/issues
    Licence: https://github.com/wesdegroot/_.js/blob/master/LICENCE.md (CC BY 4.0)
    Latest:  https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/_.js
*/

if(!window._) 
{
	alert("MISSING SOMETHING!");
}
else
{
  var players  = {},      // the media players
      video    = 'video', // video -> video (if user forgets '')
      audio    = 'audio', // audio -> audio (if user forgets '')
      MMActive = '';      // Wich player is active?

  /**
   * multimedia
   *
   * Add a nice multimedia parser
   *
   * @param object object
   * @param data the configuration array.
   * @see https://github.com/wesdegroot/_.js/wiki/module_multimedia
   * @example _().multimedia();
   */
  _.fn.multimedia = function(data) {
    var len = this.length;
    while (len--)
    {
      var mediaType     = {
                            mp3:  'audio',
                            ogg:  'ERROR',
                            wav:  'audio',
                            mp4:  'video',
                            webm: 'video'
                          },
          audioTypes    = {
                            mp3:  'audio/mpeg',
                            ogg:  'audio/ogg',
                            wav:  'audio/wav',
                            webm: 'audio/webm'
                          },
          videoTypes    = {
                            mp4:  'video/mp4',
                            ogg:  'video/ogg',
                            webm: 'video/webm'
                          },
          options       = {
                            autoplay: true,
                            controls: false,
                            visible:  false, //Deprecated. (yes that's soon, it's useless (use's parent class ;))
                            default:  true,
                            type:     'ERROR',
                          };

      // is "data" a object (array thing)
      if (typeof data == 'object')
      { 
        // if file is undefined, break.
        if (this.isUndefined(data['file']))
        {
          console.error('Need a file!');
          console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia');
          break;
        }
        else
        {
          // if object has options 
          if (typeof data['options'] != 'undefined')
          {
            // and a type!
            if (typeof data['options']['type'] != 'undefined')
              options['type'] = data['options']['type']
            else //else
              options['type'] = mediaType[data['file'].substr(data['file'].indexOf('.')+1)];

            // autoplay on? off?
            if (typeof data['options']['autoplay'] != 'undefined')
              options['autoplay'] = data['options']['autoplay'];

            // controls visible?
            if (typeof data['options']['controls'] != 'undefined')
              options['controls'] = data['options']['controls'];

            // must the player be visible?
            if (typeof data['options']['visible'] != 'undefined')
              options['visible'] = data['options']['visible'];

            // Not the default config anymore!
            options['default'] = false;
          }
          else
          {
            // no options given, so default ones.
            options['type'] = mediaType[data['file'].substr(data['file'].indexOf('.')+1)];
          }

          // shit, default, but it's an ogg (audio or video...)
          if ( options['type'] == "ERROR" )
          {
            console.error("File extension is .ogg!, we can't detect if it is a audio or a video file. sorry.");
            console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia');
          }
        }

        // Play ad (before)
        if (!this.isUndefined(data['before']))
        {
          // has his own data :D
          if (typeof data['before'] == 'object') //has parameters.
          {
            //Parse things
            console.error('Not yet supported :(');
            console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia');
          }
          else
          {
            // even better. our default data.

            // Create "MMElement" (MultiMediaElement)
            var MMElement = document.createElement(options['type']); //TODO: audio OR video ;)

            // Does it need controls?
            if (options['controls'])
                MMElement.setAttribute("controls", "yes");

                // Pre load ;)
                MMElement.setAttribute("preload", "auto");

                // Set Height (100%)
                MMElement.setAttribute("height",  "100%");

                // Set width
                MMElement.setAttribute("width",   "100%");

                // And hack it ;)
                MMElement.setAttribute("style",   "width:100%;height:100%;");

                // Set the id
                MMElement.setAttribute("id",      "MMFirst");

                // Autobuffer ;) (we dont like delay)
                MMElement.autobuffer = true;

            // Create the source
            var source = document.createElement('source');

                // What is the type of the file?
                source.type = audioTypes[data['before'].substr(data['before'].indexOf('.')+1)];

                // And the SouRCe
                source.src  = data['before'];
            
            // Append source to "MMElement"
            MMElement.appendChild(source);

            // Start loading
            MMElement.load();

            // Do we have autoplay?
            if (options['autoplay'])
              MMElement.play();

            window.MMActive = MMElement;

            // On end play the next.
            MMElement.addEventListener('ended',function() {
              
              //Pause this one
              this.pause();
              
              //Play the next
              document.getElementById('MMMain').play();

              // Wich player is active
              window.MMActive = document.getElementById('MMMain');

            });

            //Add to HTML
            this[len].appendChild(MMElement);

            // Add Player to the global window.players list (for skip, pause, active, multiple files)
            window.players=this.merge(window.players,{before:{file:data['before'],html:MMElement,options:options}});
          }
        }
        
        // Main file
        // Create "MMElement" (MultiMediaElement)
        var MMElement = document.createElement(options['type']);
        
        // Does it need controls?
        if (options['controls'])
            MMElement.setAttribute("controls", "yes");
            
            // Pre load ;) 
            MMElement.setAttribute("preload", "auto");

            // Set Height (100%)
            MMElement.setAttribute("height",  "100%");

            // Set width
            MMElement.setAttribute("width",   "100%");

            // And hack it ;)
            MMElement.setAttribute("style",   "width:100%;height:100%;");
            
            // Set the id
            MMElement.setAttribute("id",      "MMMain");
            
            // Wich player is active
            if (this.isUndefined(data['before']))
              window.MMActive = MMElement;

            //No ad, but autoplay ;)
            if (options['autoplay'] && this.isUndefined(data['before']))
              MMElement.play();

            // Autobuffer ;) (we dont like delay)
            MMElement.autobuffer = true;

            // Create the source
            var source = document.createElement('source');

                // What is the type of the file?
                source.type = audioTypes[data['file'].substr(data['file'].indexOf('.')+1)];

                // And the SouRCe
                source.src  = data['file'];
            
            // Append source to "MMElement"
            MMElement.appendChild(source);

            // Start loading
            MMElement.load();

            if (!this.isUndefined(data['after']))
            {
              // On end play the next.
              MMElement.addEventListener('ended',function() {
              
                //Pause this one
                this.pause(); 
              
                //Play the next
                document.getElementById('MMAfter').play();

                // Wich player is active
                window.MMActive = document.getElementById('MMAfter');

              });
            }
            else
            {
              // We got only this one :)
              MMElement.addEventListener('ended',function() {
              
                //Pause this one
                this.pause(); 

              }); 
            }

            //Add to HTML
            this[len].appendChild(MMElement);

            // Add Player to the global window.players list (for skip, pause, active, multiple files)
            window.players=this.merge(window.players,{main:{file:data['file'],html:MMElement,options:options}});

        // Ad on end.
        if (!this.isUndefined(data['after']))
        {
          if (typeof data['after'] == 'object') //has parameters.
          {
            //Parse things
            console.error('Not yet supported :(');
            console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia');
          }
          else
          {
            // Create "MMElement" (MultiMediaElement)
            var MMElement = document.createElement('audio');
            
            // Does it need controls?
            if (options['controls'])
                MMElement.setAttribute("controls", "yes");
                    
                // Pre load ;) 
                MMElement.setAttribute("preload", "auto");

                // Set Height (100%)
                MMElement.setAttribute("height",  "100%");

                // Set width
                MMElement.setAttribute("width",   "100%");

                // And hack it ;)
                MMElement.setAttribute("style",   "width:100%;height:100%;");

                // Set the id
                MMElement.setAttribute("id",      "MMAfter");

                // Autobuffer ;) (we dont like delay)
                MMElement.autobuffer = true;

            // Create the source
            var source = document.createElement('source');

                // What is the type of the file?
                source.type = audioTypes[data['after'].substr(data['after'].indexOf('.')+1)];

                // What is the type of the file?
                source.src  = data['after'];
            
            // Append source to "MMElement"
            MMElement.appendChild(source);

            // Start loading
            MMElement.load();

            // On end pause
            MMElement.addEventListener('ended',function() {
              
              // Pause, all done my friend.
              this.pause();
            
            });

            //Add to HTML
            this[len].appendChild(MMElement);

            // Add Player to the global window.players list (for skip, pause, active, multiple files)
            window.players=this.merge(window.players,{after:{file:data['after'],html:MMElement,options:options}});
          }
        }

        console.log(window.players);
      }
      else
      {
        console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia');
      }
    }
  };

  _.fn.mmPlayer_start = function ( playerID ) 
  {
    window.MMActive.play();
  };
}