/*

                         _    _____ 
                        | |  / ____|
                        | |  | (___  
                    _   | |  \___  \ 
     ______    _   | |__| |  ____) |
    |______|  (_)   \____/  |______/ 
                              v0.0.5

    https://www.github.com/wesdegroot/_.js/
    or https://www.wdgwv.com

    Git:     https://github.com/wesdegroot/_.js
    Todo:    https://github.com/wesdegroot/_.js/issues
    Licence: https://github.com/wesdegroot/_.js/blob/master/LICENCE.md (CC BY 4.0)
    Latest:  https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/_.js
*/

/*
  audio.addEventListener('ended',function(){
        audio.src = "new url";
        audio.pause();
        audio.load();
        audio.play();
  });

  Or even better.
  Multiple (so no delay on load ;) )

*/
if(!window._) 
{
	alert("MISSING SOMETHING!");
}
else
{
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
      var _JSMultimedia = '', //HTML5 Placeholder.
          audioTag      = '<video id=\'THE_ID\' width="WIDTH" height="HEIGHT" CONTROLS><source src="SOURCE" type="TYPE"></video>',
          videoTag      = '<audio id=\'THE_ID\'CONTROLS><source src="SOURCE" type="TYPE"></audio>';
          audioTypes    = {mp3: 'audio/mpeg', ogg: 'audio/ogg', wav: 'audio/wav', webm: 'audio/webm'}, //MP3, OGG, WAV, (wikipedia: WEBM) {Best mp3}
          videoTypes    = {mp4: 'video/mp4',  ogg: 'video/ogg', webm: 'video/webm'}, //MP4, OGG, WEBM {Best mp4}
          controls      = false; // Default = no controls, for ads, etc.

      if (typeof data == 'object') // is a array.
      {        
        if (!this.isUndefined(data['before']))
        {
          if (typeof data['before'] == 'object') //has parameters.
          {
            //Parse things
          }
          else
            var fileBefore = {file: data[before]}; // Copy Options.
        }
        
        if (this.isUndefined(data['file']))
          console.error('Need a file!');

        if (!this.isUndefined(data['after']))
        {
          if (typeof data['after'] == 'object') //has parameters.
          {
            //Parse things
          }
          else
            var fileAfter = {file: data[after]}; // Copy Options.
        }
        
      }
      else
      {
        console.error('Please see: https://github.com/wesdegroot/_.js/wiki/module_multimedia');
      }
      //this[len].innerHTML = ''; // HTML5 Music Controls
    }
  };
}