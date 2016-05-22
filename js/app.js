// Require annyang
const annyang = require('annyang');

var CONFIG = {
    appName: 'Samantha OS2',
    userName: 'ポンダッド',

    voiceRecognitionLanguage: 'ja-JP',
    voiceSpeakingLanguage: 'Japanese Female',

    resHello: "こんにちは世界!",

    resGreeting: ["はい、なんでしょう。", "呼ばれて飛び出てジャジャジャジャーン", "何かご用ですか？"],

    resGoodbye: ["忘れないで。 貴方がネットにアクセスするとき、私は必ず貴方の傍らにいる。",　"さぁて、どこへ行こうかしらね。ネットは広大だわ。"],

    resQuickSpeech: ["生麦生米生卵", "隣の客は良く柿食う客だ", "すももも桃も桃のうち", "かえるぴょこぴょこ みぴょこぴょこ あわせてぴょこぴょこ むぴょこぴょこ", "庭には２羽鶏がいる、裏庭には２羽鶏がいる"],
}

var hello = function() {
    console.log(CONFIG.resHello);
    document.getElementById('caption').textContent = CONFIG.resHello;
    say(CONFIG.resHello);
  };

var greeting = function() {
    resGreeting = randomSentence(CONFIG.resGreeting)
    console.log(resGreeting);
    document.getElementById('caption').textContent = resGreeting;
    say(resGreeting);
  };

var googbye = function() {
    resGoodbye = randomSentence(CONFIG.resGoodbye)
    console.log(resGoodbye);
    document.getElementById('caption').textContent = resGoodbye;
    say(resGoodbye);
  };

var moment = moment();

var currentTime = function(){
    console.log(moment.format("YYYY年MM月DD日 HH時mm分" + "です"));
    document.getElementById('caption').textContent = moment.format("YYYY年MM月DD日 HH時mm分" + "です");
    say(moment.format("YYYY年MM月DD日 HH時mm分" + "です"));
}

var quickSpeech = function() {
    resQuickSpeech = randomSentence(CONFIG.resQuickSpeech)
    console.log(resQuickSpeech);
    document.getElementById('caption').textContent = resQuickSpeech;
    say(resQuickSpeech);
  };

var repeatLastSentence = function(){
    say(lastSentence);
};

var commands = {
  'こんにちは': hello,
  '(ヘイ)(オーケー)(OK)サマンサ': greeting,
  'さようなら': googbye,
  '今何時(いまなんじ)': currentTime,
  '早口言葉(話して)(はなして)': quickSpeech,
  'もう一回(話して)(はなして)': repeatLastSentence,
};

if (annyang) {
  annyang.setLanguage(CONFIG.voiceRecognitionLanguage)
  annyang.addCommands(commands);
  annyang.start();
  console.log('Voice recognition ready');
}

var lastSentence = null;

function say(msg, callback) {
  console.log('Pause annyang');
  console.log('Saying: ' + msg);
  lastSentence=msg;
  annyang.abort();

  function voiceErrorCallback() {
      console.log("Voice error");
  }

  function voiceEndCallback() {
      console.log('Resume annyang');
  }

  var parameters = {
      onerror: voiceErrorCallback,
      onend: voiceEndCallback
  }

  responsiveVoice.speak(msg, CONFIG.voiceSpeakingLanguage, parameters);
  annyang.start();
}

function randomSentence(arr) {
    if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
    return arr;
}
