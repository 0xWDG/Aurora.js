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
  var players = {};

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
                            skip:     false,
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
          }
          else
          {
            // even better. our default data.

            // Create "MMElement" (MultiMediaElement)
            var MMElement = document.createElement('audio'); //TODO: audio OR video ;)

            // Does it need controls?
            if (options['controls'])
                MMElement.setAttribute("controls", "yes");

                // Pre load ;)
                MMElement.setAttribute("preload", "auto");

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

            // On end play the next.
            MMElement.addEventListener('ended',function() {
              this.pause(); //Pause this one
              document.getElementById('MMMain').play(); //Play the next
            });

            this[len].appendChild(MMElement); //Add to HTML

            window.players = this.merge(window.players, {before:{file:data['before'],html:MMElement,options:options}}); // Temporary
          }
        }
        
        // Main file
            var MMElement = document.createElement('audio');
                if (options['controls'])
                  MMElement.setAttribute("controls", "yes");
                    
                MMElement.setAttribute("preload", "auto");
                MMElement.setAttribute("id",      "MMMain");
                MMElement.autobuffer = true;

            var source = document.createElement('source');
                source.type = audioTypes[data['file'].substr(data['file'].indexOf('.')+1)];
                source.src  = data['file'];
            
            MMElement.appendChild(source);
            MMElement.load();
            MMElement.addEventListener('ended',function() {
              this.pause();
              document.getElementById('MMAfter').play();
            });
            this[len].appendChild(MMElement);

            window.players = this.merge(window.players,{main:{file:data['file'],html:MMElement,options:options}}); // Temporary

        // Ad on end.
        if (!this.isUndefined(data['after']))
        {
          if (typeof data['after'] == 'object') //has parameters.
          {
            //Parse things
          }
          else
          {
            var MMElement = document.createElement('audio');
                if (options['controls'])
                  MMElement.setAttribute("controls", "yes");
                    
                MMElement.setAttribute("preload", "auto");
                MMElement.setAttribute("id",      "MMAfter");
                MMElement.autobuffer = true;

            var source = document.createElement('source');
                source.type = audioTypes[data['after'].substr(data['after'].indexOf('.')+1)];
                source.src  = data['after'];
            
            MMElement.appendChild(source);
            MMElement.load();
            MMElement.addEventListener('ended',function() {
              this.pause();
            });
            this[len].appendChild(MMElement);

            window.players = this.merge(window.players, {
                          after:
                          {
                            file:    data['after'],
                            html:    MMElement,
                            options: options
                          }
                         });
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
    //_()[0].id
  };


  _.fn.merge = function() 
  {
    var obj={},
          i=0,
         il=arguments.length,
        key;

    for (; i < il; i++) 
    {
        for (key in arguments[i]) 
        {
            if (arguments[i].hasOwnProperty(key)) 
            {
                obj[key] = arguments[i][key];
            }
        }
    }
   return obj;
  };
}