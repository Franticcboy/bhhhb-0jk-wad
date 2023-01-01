Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="id" src="'+data_uri+'">'
    });
}
console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mcXpXdkGl/model.json',modelloaded);
function modelloaded(){
    console.log('modellloaded');

}
prediction1="";
prediction2="";
function speak(){
    var synth=window.speechSynthesis;
    speak1="the first prediction is"+prediction1;
    speak2="and the sencond prediciton is"+prediction2;
    var utterthis=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterthis);
}
function check(){
img=document.getElementById('id');
classifier.classify(img,gotresult);

}
function gotresult(error,results){
    if (error){
        console.error(error);

    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;";

        }
        if(results[0].label=="sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
            
        }
        if(results[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
            
        }
        if(results[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";

        }
        if(results[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
            
        }
        if(results[1].label=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
            
        }
    }

}