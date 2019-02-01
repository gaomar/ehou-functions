'use strict';

exports.handler = function (event, context, callback) {
    var response = {
        statusCode: 200,
        headers: {},
        body: ""
    };
    
    var speechText = "";
    var requestJson = JSON.parse(event.body).request;
    var endFlg = false;
    
    if (requestJson.type === 'LaunchRequest') {
        // 起動時処理
        speechText = '恵方巻きの方角を知りたい場合は「今年の方角は」と言ってください。それではどうぞ！';

        responseCall(speechText, endFlg, response, callback);
        
    } else if (requestJson.type === 'SessionEndedRequest') {
        
        speechText = 'また知りたくなったら、呼びかけてくださいね！';
        endFlg = true;
    
        responseCall(speechText, endFlg, response, callback);
        
    } else if (requestJson.type === 'IntentRequest') {

        if (requestJson.intent.name === 'EndIntent' || requestJson.intent.name === 'Clova.NoIntent') {
            // 終了処理
            speechText = 'また知りたくなったら、呼びかけてくださいね！';
            endFlg = true;
        
            responseCall(speechText, endFlg, response, callback);
            
        } else if (requestJson.intent.name === 'Clova.GuideIntent') {
            speechText = 'その年の恵方を答えます。知りたい年を西暦でお答えください。では、どうぞ。';
            
            responseCall(speechText, endFlg, response, callback);
            
        } else if (requestJson.intent.name === 'Clova.YesIntent') {
            speechText = '知りたい西暦を答えてください。。';
            
            responseCall(speechText, endFlg, response, callback);
            
        } else if (requestJson.intent.name === 'MainIntent') {
            
            if (requestJson.intent.slots == null) {
                speechText = "西暦を正しくお応えください。";
                
                responseCall(speechText, endFlg, response, callback);
                
            } else {
                var dt = new Date();
                //年
                var myYear = dt.getFullYear();
                
                if (requestJson.intent.slots.yearword != undefined) {
                    myYear = requestJson.intent.slots.yearword.value.substr(0, 4);
                } else {
                    myYear = requestJson.intent.slots.year.value.substr(0, 4);
                }
                
                var num = myYear % 10;
                var wk;

                switch (num) {
                    case 2: case 7: 
                        wk = "北北西"; break;
                    case 4: case 9:
                        wk = "東北東"; break;
                    case 1: case 3: case 6: case 8:
                        wk = "南南東"; break;
                    default:
                        wk = "西南西"; break;
                }

                speechText = myYear + "年は、" + wk + "です。他に知りたい年はありますか？";  
                responseCall(speechText, endFlg, response, callback);
            }
        }
    }

    
};

// レスポンス処理
function responseCall(speechText, endFlg, response, callback) {
    var responseJson = JSON.stringify({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SimpleSpeech",
                "values": {
                    "type":"PlainText",
                    "lang":"ja",
                    "value": speechText
                }
            },
            "card": {},
            "directives": [],
            "shouldEndSession": endFlg
        }
    });
    
    response.body = responseJson;
    
    callback(null, response);
    
}