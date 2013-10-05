exports.action = function(data, callback, config){

  // Retrieve config
  config = config.modules.vera;
  if (!config.api_url){
    console.log("Missing Vera config");
    return;
  }
  
  // Build URL
  var url = config.api_url + '&SceneNum='+data.scene;
  console.log("Sending request to: " + url);
  
  // Send Request
  var request = require('request');
  request({ 'uri' : url }, function (err, response, body){
    
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
      return;
    }
    
    console.log(body);
    
    // Callback with TTS
    var phrase_success = new Array();
	phrase_success[1] = 'C\'est fait !';
	phrase_success[2] = 'Je m\'en occupe !';
	phrase_success[3] = 'Ok';
	phrase_success[4] = 'Voilà qui est fait !';
	phrase_success[5] = 'Tout de suite !';

  random = Math.floor((Math.random()*(phrase_success.length-1))+1);
			phrase_select = phrase_success[random];
			callback({'tts': phrase_select});
  });
}
